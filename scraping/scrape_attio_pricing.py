"""
Scrape plan names/prices from attio.com/pricing.

Usage:
    .venv/bin/python scrape_attio_pricing.py

Notes:
    - Fetches the live page HTML (Scrapling's StealthyFetcher handles JS-rendered
      content via a headless browser). If the page is mostly static, swap to
      scrapling.Fetcher for a faster plain HTTP request.
    - Selectors below are a starting point — inspect the page's actual DOM
      (browser devtools) and adjust them, since pricing pages change often
      and class names are not guaranteed stable.
"""

import json

from scrapling.fetchers import StealthyFetcher


def scrape_pricing(url: str = "https://attio.com/pricing"):
    page = StealthyFetcher.fetch(url, headless=True)

    plans = []
    # Adjust this selector once you've inspected the real page structure.
    for card in page.css("[class*='pricing'] [class*='plan'], [class*='tier']"):
        name = card.css_first("h2, h3, [class*='title']")
        price = card.css_first("[class*='price']")
        features = card.css("li")

        plans.append(
            {
                "name": name.text.strip() if name else None,
                "price": price.text.strip() if price else None,
                "features": [f.text.strip() for f in features],
            }
        )

    return plans


if __name__ == "__main__":
    result = scrape_pricing()
    print(json.dumps(result, indent=2))
