"""
Example: Simple usage of the 1games.io scraper
"""

from scraper import GamesScraper
import json

# Load configuration
with open('config.json', 'r') as f:
    config = json.load(f)

# Example 1: Scrape action games (2 pages)
print("Example 1: Scraping action games...")
scraper = GamesScraper(config)
games = scraper.scrape_category('action', max_pages=2)
scraper.save_to_json(games, 'action')
print(f"✓ Scraped {len(games)} action games\n")

# Example 2: Scrape without iframes (faster)
print("Example 2: Quick scrape without iframes...")
config['scrape_iframes'] = False
scraper = GamesScraper(config)
games = scraper.scrape_category('racing', max_pages=1)
print(f"✓ Scraped {len(games)} racing games (no iframes)\n")

# Example 3: Scrape multiple categories
print("Example 3: Scraping multiple categories...")
config['scrape_iframes'] = True
config['max_pages'] = 1
scraper = GamesScraper(config)
results = scraper.scrape_multiple_categories(['puzzle', 'adventure'])
print(f"✓ Scraped {sum(len(g) for g in results.values())} total games\n")

print("All examples completed successfully!")
