"""
Command-line interface for 1games.io scraper.

Usage:
    python main.py --category action --pages 2
    python main.py --category action,racing --pages 3
    python main.py --config config.json
"""

import argparse
import json
import sys
from pathlib import Path
from scraper import GamesScraper


def load_config(config_path: str = 'config.json') -> dict:
    """Load configuration from JSON file."""
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Config file '{config_path}' not found.")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in config file '{config_path}'.")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description='Scrape game information from 1games.io',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Scrape action category (2 pages)
  python main.py --category action --pages 2

  # Scrape multiple categories
  python main.py --category action,racing,shooting --pages 3

  # Use custom config file
  python main.py --config my_config.json

  # Disable iframe scraping (faster)
  python main.py --category action --no-iframes

  # Specify custom output file
  python main.py --category action --output my_games.json
        """
    )

    parser.add_argument(
        '--category',
        type=str,
        help='Game category to scrape (e.g., action, racing, shooting). Comma-separated for multiple.'
    )

    parser.add_argument(
        '--pages',
        type=int,
        help='Maximum number of pages to scrape per category'
    )

    parser.add_argument(
        '--config',
        type=str,
        default='config.json',
        help='Path to configuration file (default: config.json)'
    )

    parser.add_argument(
        '--output',
        type=str,
        help='Custom output file path (only for single category)'
    )

    parser.add_argument(
        '--no-iframes',
        action='store_true',
        help='Skip iframe scraping (faster, but no embed codes)'
    )

    parser.add_argument(
        '--list-categories',
        action='store_true',
        help='List available categories from config'
    )

    args = parser.parse_args()

    # Load configuration
    config = load_config(args.config)

    # List categories if requested
    if args.list_categories:
        print("Available categories in config:")
        for cat in config.get('categories', []):
            print(f"  - {cat}")
        sys.exit(0)

    # Override config with command-line arguments
    if args.pages:
        config['max_pages'] = args.pages

    if args.no_iframes:
        config['scrape_iframes'] = False

    # Determine categories to scrape
    if args.category:
        categories = [cat.strip() for cat in args.category.split(',')]
    else:
        categories = config.get('categories', ['action'])
        print(f"No category specified. Using default from config: {categories}")

    # Validate single category for custom output
    if args.output and len(categories) > 1:
        print("Error: --output can only be used with a single category")
        sys.exit(1)

    # Initialize scraper
    print(f"\n{'='*60}")
    print(f"1games.io Scraper")
    print(f"{'='*60}")
    print(f"Categories: {', '.join(categories)}")
    print(f"Pages per category: {config['max_pages']}")
    print(f"Scrape iframes: {config['scrape_iframes']}")
    print(f"Rate limit: {config['rate_limit_seconds']}s between requests")
    print(f"{'='*60}\n")

    scraper = GamesScraper(config)

    # Scrape categories
    try:
        if len(categories) == 1:
            category = categories[0]
            print(f"Scraping category: {category}")
            games = scraper.scrape_category(category)

            # Save results
            output_path = args.output if args.output else None
            saved_path = scraper.save_to_json(games, category, output_path)

            print(f"\n{'='*60}")
            print(f"Scraping completed successfully!")
            print(f"{'='*60}")
            print(f"Total games scraped: {len(games)}")
            print(f"Output saved to: {saved_path}")
            print(f"{'='*60}\n")

        else:
            print(f"Scraping {len(categories)} categories...")
            results = scraper.scrape_multiple_categories(categories)

            print(f"\n{'='*60}")
            print(f"All categories scraped successfully!")
            print(f"{'='*60}")
            for category, games in results.items():
                print(f"{category}: {len(games)} games")
            print(f"Total: {sum(len(g) for g in results.values())} games")
            print(f"Output directory: {config['output_dir']}")
            print(f"{'='*60}\n")

    except KeyboardInterrupt:
        print("\n\nScraping interrupted by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n\nError during scraping: {e}")
        sys.exit(1)


if __name__ == '__main__':
    main()
