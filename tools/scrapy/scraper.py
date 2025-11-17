"""
1games.io Web Scraper
Scrapes game information including names, images, URLs, and iframe embed codes.
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import logging
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Optional
from urllib.parse import urljoin


class GamesScraper:
    """
    Scraper for 1games.io website to extract game information.
    """

    def __init__(self, config: Dict):
        """
        Initialize the scraper with configuration.

        Args:
            config: Configuration dictionary with scraper settings
        """
        self.base_url = "https://1games.io"
        self.config = config
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': config.get('user_agent', 'Mozilla/5.0'),
            'Accept': 'text/html,application/xhtml+xml,application/xml',
            'Accept-Language': 'en-US,en;q=0.9',
        })

        # Setup logging
        self._setup_logging()

    def _setup_logging(self):
        """Setup logging configuration."""
        log_dir = Path(self.config.get('log_dir', 'logs'))
        log_dir.mkdir(exist_ok=True)

        log_file = log_dir / f"scraper_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def _make_request(self, url: str) -> Optional[requests.Response]:
        """
        Make HTTP request with retry logic.

        Args:
            url: URL to request

        Returns:
            Response object or None if failed
        """
        retry_attempts = self.config.get('retry_attempts', 3)
        timeout = self.config.get('timeout_seconds', 30)

        for attempt in range(retry_attempts):
            try:
                response = self.session.get(url, timeout=timeout)
                response.raise_for_status()
                return response
            except requests.exceptions.RequestException as e:
                self.logger.warning(f"Attempt {attempt + 1} failed for {url}: {e}")
                if attempt < retry_attempts - 1:
                    time.sleep(2 ** attempt)  # Exponential backoff
                else:
                    self.logger.error(f"Failed to fetch {url} after {retry_attempts} attempts")
                    return None

    def scrape_category_page(self, category: str, page: int = 1) -> List[Dict]:
        """
        Scrape a single category page for game listings.

        Args:
            category: Game category (e.g., 'action', 'racing')
            page: Page number (default: 1)

        Returns:
            List of game dictionaries with basic information
        """
        games_per_page = self.config.get('games_per_page', 50)
        url = f"{self.base_url}/{category}.games?page={page}&limit={games_per_page}"

        self.logger.info(f"Scraping category page: {url}")
        response = self._make_request(url)

        if not response:
            return []

        soup = BeautifulSoup(response.content, 'html.parser')
        games = []

        # Find all game cards
        game_cards = soup.find_all('div', class_='card card_topic')
        self.logger.info(f"Found {len(game_cards)} games on page {page}")

        for card in game_cards:
            try:
                game_data = self._extract_game_from_card(card)
                if game_data:
                    games.append(game_data)
            except Exception as e:
                self.logger.error(f"Error extracting game data: {e}")
                continue

        return games

    def _extract_game_from_card(self, card) -> Optional[Dict]:
        """
        Extract game information from a game card element.

        Args:
            card: BeautifulSoup element representing a game card

        Returns:
            Dictionary with game information or None if extraction fails
        """
        try:
            # Extract game link and title
            link = card.find('a', class_='card__inner')
            if not link:
                return None

            game_url = link.get('href', '')
            game_title = link.get('aria-label', '')

            # Alternative title extraction
            if not game_title:
                title_elem = card.find('span', class_='card__title')
                game_title = title_elem.text.strip() if title_elem else ''

            # Extract game ID from URL
            game_id = game_url.split('/')[-1] if game_url else ''

            # Extract image (prefer data-src over src to get real URL instead of base64 placeholder)
            img = card.find('img', loading='lazy')
            image_url = ''
            if img:
                # Try data-src first (real URL for lazy loading)
                image_url = img.get('data-src', '')
                # Fallback to src if data-src not available
                if not image_url or image_url.startswith('data:image'):
                    image_url = img.get('src', '')

            # Also try to get background image from card__thumb div as backup
            if not image_url or image_url.startswith('data:image'):
                thumb_div = card.find('div', class_='card__thumb')
                if thumb_div:
                    style = thumb_div.get('style', '')
                    # Extract URL from background-image:url('...')
                    import re
                    bg_match = re.search(r'background-image:\s*url\([\'"]?(.*?)[\'"]?\)', style)
                    if bg_match:
                        image_url = bg_match.group(1)

            # Extract rating
            rating = None
            rating_elem = card.find('div', class_='card__rating')
            if rating_elem:
                rating_spans = rating_elem.find_all('span')
                if rating_spans:
                    try:
                        rating = float(rating_spans[-1].text.strip())
                    except (ValueError, AttributeError):
                        pass

            # Extract status label (HOT, NEW, TRENDING, UPDATED)
            status = ''
            status_elem = card.find('div', class_='GameLabel_container')
            if status_elem:
                status = status_elem.text.strip()

            return {
                'id': game_id,
                'name': game_title,
                'url': game_url if game_url.startswith('http') else urljoin(self.base_url, game_url),
                'thumbnail': image_url if image_url.startswith('http') else urljoin(self.base_url, image_url),
                'rating': rating,
                'status': status,
                'iframe_src': None,
                'iframe_html': None
            }
        except Exception as e:
            self.logger.error(f"Error in _extract_game_from_card: {e}")
            return None

    def scrape_game_details(self, game_url: str) -> Dict:
        """
        Scrape comprehensive game details including description, features, controls, and reviews.

        Args:
            game_url: URL of the game page

        Returns:
            Dictionary with all game details including embed info
        """
        self.logger.info(f"Scraping game details: {game_url}")

        game_slug = game_url.rstrip('/').split('/')[-1]
        embed_url = f"https://1games.io/game/{game_slug}/"

        result = {
            'iframe_src': None,
            'iframe_html': None,
            'is_embeddable': False,
            'description': '',
            'features': [],
            'controls': '',
            'tags': [],
            'category': '',
            'play_count': 0,
            'reviews': [],
            'review_count': 0,
            'average_rating': None
        }

        # Fetch main game page for details
        response = self._make_request(game_url)
        if not response:
            return result

        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract description - try multiple selectors
        description = ''
        desc_selectors = [
            {'name': 'div', 'class_': 'game-description'},
            {'name': 'div', 'class_': 'description'},
            {'name': 'section', 'class_': 'game-info'},
            {'name': 'div', 'class_': 'game__description'},
            {'name': 'div', 'attrs': {'itemprop': 'description'}},
            {'name': 'meta', 'attrs': {'name': 'description'}}
        ]

        for selector in desc_selectors:
            elem = None
            if 'attrs' in selector:
                elem = soup.find(selector['name'], attrs=selector['attrs'])
            else:
                elem = soup.find(selector['name'], class_=selector.get('class_'))

            if elem:
                if elem.name == 'meta':
                    description = elem.get('content', '')
                else:
                    # Get text from paragraphs or direct text
                    paragraphs = elem.find_all('p')
                    if paragraphs:
                        description = ' '.join([p.get_text(strip=True) for p in paragraphs[:2]])
                    else:
                        description = elem.get_text(strip=True)

                if description:
                    result['description'] = description[:400]  # Limit to 400 chars
                    break

        # Extract features/highlights
        features = []
        # Look for feature sections
        feature_keywords = ['feature', 'highlight', 'gameplay', 'key point']
        for keyword in feature_keywords:
            feature_section = soup.find(['div', 'section'], class_=lambda x: x and keyword in x.lower() if x else False)
            if feature_section:
                feature_lists = feature_section.find_all(['ul', 'ol'])
                for ul in feature_lists:
                    items = ul.find_all('li')
                    features.extend([item.get_text(strip=True) for item in items[:6]])
                break

        # If no dedicated feature section, look for any lists in game info
        if not features:
            info_section = soup.find(['div', 'section'], class_=lambda x: x and 'info' in x.lower() if x else False)
            if info_section:
                for ul in info_section.find_all(['ul', 'ol'], limit=2):
                    items = ul.find_all('li')
                    if 2 <= len(items) <= 12:  # Reasonable feature list
                        features.extend([item.get_text(strip=True) for item in items[:6]])

        result['features'] = features[:6]  # Keep top 6

        # Extract controls/how to play
        controls = ''
        control_keywords = ['control', 'how to play', 'instruction', 'keyboard', 'mouse']
        for keyword in control_keywords:
            controls_elem = soup.find(string=lambda text: text and keyword in text.lower())
            if controls_elem:
                parent = controls_elem.find_parent(['div', 'section', 'article', 'p', 'h2', 'h3'])
                if parent:
                    # Get the next sibling or content
                    next_content = parent.find_next(['p', 'div', 'ul'])
                    if next_content:
                        if next_content.name == 'ul':
                            items = next_content.find_all('li')
                            controls = ' | '.join([item.get_text(strip=True) for item in items])
                        else:
                            controls = next_content.get_text(strip=True)
                    else:
                        controls = parent.get_text(strip=True)

                    if controls and len(controls) > 20:
                        result['controls'] = controls[:300]
                        break

        # Extract tags/categories
        tags = []
        tag_selectors = [
            soup.find_all('a', class_=lambda x: x and 'tag' in x.lower() if x else False),
            soup.find_all('span', class_=lambda x: x and 'tag' in x.lower() if x else False),
            soup.find_all(['a', 'span'], attrs={'rel': 'tag'})
        ]
        for tag_list in tag_selectors:
            if tag_list:
                tags.extend([tag.get_text(strip=True) for tag in tag_list[:8]])
                break
        result['tags'] = list(set(tags))[:8]  # Unique tags, max 8

        # Extract category
        category_elem = soup.find('span', class_=lambda x: x and 'category' in x.lower() if x else False)
        if not category_elem:
            category_elem = soup.find('a', class_=lambda x: x and 'category' in x.lower() if x else False)
        if category_elem:
            result['category'] = category_elem.get_text(strip=True)

        # Extract play count
        play_count_elem = soup.find(string=lambda text: text and 'play' in text.lower() and any(c.isdigit() for c in text))
        if play_count_elem:
            import re
            numbers = re.findall(r'[\d,]+', play_count_elem)
            if numbers:
                try:
                    result['play_count'] = int(numbers[0].replace(',', ''))
                except (ValueError, IndexError):
                    pass

        # Extract reviews and ratings
        reviews = []
        review_count = 0
        average_rating = None

        # Look for review sections
        review_section = soup.find(['div', 'section'], class_=lambda x: x and 'review' in x.lower() if x else False)
        if review_section:
            # Extract average rating
            rating_elem = review_section.find(['span', 'div'], class_=lambda x: x and 'rating' in x.lower() if x else False)
            if rating_elem:
                rating_text = rating_elem.get_text(strip=True)
                import re
                rating_match = re.search(r'(\d+\.?\d*)', rating_text)
                if rating_match:
                    try:
                        average_rating = float(rating_match.group(1))
                    except ValueError:
                        pass

            # Extract individual reviews
            review_elements = review_section.find_all(['div', 'article', 'li'], class_=lambda x: x and ('comment' in x.lower() or 'review-item' in x.lower()) if x else False, limit=5)

            for review_elem in review_elements:
                author_elem = review_elem.find(['span', 'div', 'a'], class_=lambda x: x and ('author' in x.lower() or 'user' in x.lower()) if x else False)
                comment_elem = review_elem.find(['p', 'div', 'span'], class_=lambda x: x and ('text' in x.lower() or 'comment' in x.lower() or 'content' in x.lower()) if x else False)
                rating_elem = review_elem.find(['span', 'div'], class_=lambda x: x and 'rating' in x.lower() if x else False)

                # If no specific comment element, try to get the main text
                if not comment_elem:
                    paragraphs = review_elem.find_all('p')
                    comment_elem = paragraphs[0] if paragraphs else review_elem

                if comment_elem:
                    comment_text = comment_elem.get_text(strip=True)
                    if len(comment_text) > 15:  # Filter out too short texts
                        review_data = {
                            'author': author_elem.get_text(strip=True) if author_elem else 'Anonymous',
                            'comment': comment_text[:250]  # Limit comment length
                        }

                        # Add rating if available
                        if rating_elem:
                            rating_text = rating_elem.get_text(strip=True)
                            import re
                            rating_match = re.search(r'(\d+\.?\d*)', rating_text)
                            if rating_match:
                                try:
                                    review_data['rating'] = float(rating_match.group(1))
                                except ValueError:
                                    pass

                        reviews.append(review_data)

            review_count = len(review_elements)

        result['reviews'] = reviews[:5]  # Keep top 5 reviews
        result['review_count'] = review_count
        result['average_rating'] = average_rating

        # Now check if embeddable
        embed_response = self._make_request(embed_url)
        if embed_response:
            embed_soup = BeautifulSoup(embed_response.content, 'html.parser')
            page_text = str(embed_soup).lower()

            # Check for local game indicators
            has_canvas = embed_soup.find('canvas') is not None
            has_unity = 'unity' in page_text or 'unityloader' in page_text
            has_webgl = 'webgl' in page_text
            has_phaser = 'phaser' in page_text

            # Check for third-party iframes
            import re
            third_party_iframe = embed_soup.find('iframe', src=re.compile(r'https?://(?!1games\.io)'))
            has_third_party = third_party_iframe is not None

            # Determine if embeddable
            is_local_game = (has_canvas or has_unity or has_webgl or has_phaser)
            is_embeddable = is_local_game and not has_third_party

            if is_embeddable:
                result['iframe_src'] = embed_url
                result['iframe_html'] = f'<iframe src="{embed_url}" width="1280" height="720" scrolling="none" frameborder="0"></iframe>'
                result['is_embeddable'] = True
                self.logger.info(f"✓ Embeddable with details: {game_slug} (desc: {len(result['description'])} chars, features: {len(result['features'])}, reviews: {len(result['reviews'])})")
            else:
                self.logger.warning(f"✗ Not embeddable: {game_slug}")

        return result

    def scrape_game_iframe(self, game_url: str) -> Dict[str, Optional[str]]:
        """Backward compatibility wrapper - calls scrape_game_details"""
        return self.scrape_game_details(game_url)

    def scrape_category(self, category: str, max_pages: Optional[int] = None) -> List[Dict]:
        """
        Scrape all games from a category across multiple pages.

        Args:
            category: Game category to scrape
            max_pages: Maximum number of pages to scrape (None for config default)

        Returns:
            List of all scraped games
        """
        if max_pages is None:
            max_pages = self.config.get('max_pages', 2)

        rate_limit = self.config.get('rate_limit_seconds', 1.5)
        scrape_iframes = self.config.get('scrape_iframes', True)

        all_games = []

        self.logger.info(f"Starting scrape of '{category}' category, {max_pages} page(s)")

        # Scrape category pages
        for page in range(1, max_pages + 1):
            self.logger.info(f"Processing page {page}/{max_pages}")
            games = self.scrape_category_page(category, page)
            all_games.extend(games)

            # Rate limiting between page requests
            if page < max_pages:
                time.sleep(rate_limit)

        self.logger.info(f"Found {len(all_games)} total games")

        # Scrape iframes if enabled
        if scrape_iframes and all_games:
            self.logger.info("Validating games and filtering embeddable ones...")
            embeddable_games = []

            for idx, game in enumerate(all_games, 1):
                self.logger.info(f"Validating game {idx}/{len(all_games)}: {game['name']}")

                iframe_data = self.scrape_game_iframe(game['url'])
                game.update(iframe_data)

                # Only keep embeddable games
                if iframe_data.get('is_embeddable', False):
                    embeddable_games.append(game)
                    self.logger.info(f"  ✓ Added to results")
                else:
                    self.logger.info(f"  ✗ Skipped (not embeddable)")

                # Rate limiting between iframe requests
                if idx < len(all_games):
                    time.sleep(rate_limit)

            self.logger.info(f"Filtered: {len(embeddable_games)}/{len(all_games)} embeddable games")
            return embeddable_games

        return all_games

    def save_to_json(self, games: List[Dict], category: str, output_path: Optional[str] = None):
        """
        Save scraped games to JSON file.

        Args:
            games: List of game dictionaries
            category: Category name
            output_path: Custom output path (optional)
        """
        if output_path is None:
            output_dir = Path(self.config.get('output_dir', 'data'))
            output_dir.mkdir(exist_ok=True)
            output_path = output_dir / f"{category}_games.json"

        data = {
            'category': category,
            'total_games': len(games),
            'scraped_at': datetime.now().isoformat(),
            'games': games
        }

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        self.logger.info(f"Saved {len(games)} games to {output_path}")
        return output_path

    def scrape_multiple_categories(self, categories: List[str]) -> Dict[str, List[Dict]]:
        """
        Scrape multiple categories.

        Args:
            categories: List of category names

        Returns:
            Dictionary mapping category names to game lists
        """
        results = {}

        for category in categories:
            self.logger.info(f"Starting scrape for category: {category}")
            games = self.scrape_category(category)
            results[category] = games

            # Save to JSON
            self.save_to_json(games, category)

            # Rate limiting between categories
            if category != categories[-1]:
                time.sleep(self.config.get('rate_limit_seconds', 1.5))

        return results
