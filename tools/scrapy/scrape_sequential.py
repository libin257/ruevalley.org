#!/usr/bin/env python3
"""
按顺序爬取每个类别，保存为单独的 JSON 文件
每个类别至少30个可嵌入的游戏，包含详细信息和评价
"""

from scraper import GamesScraper
import json
from datetime import datetime
import os

# 类别列表 - 爬取所有类别
categories = ['action', 'racing', 'shooting', 'adventure', 'puzzle']

# 加载配置
with open('config.json', 'r') as f:
    config = json.load(f)

config['rate_limit_seconds'] = 1.0  # 加快速度
scraper = GamesScraper(config)

print("="*70)
print("按顺序爬取每个类别 (包含详细信息和评价)")
print("="*70)
print()

for idx, category in enumerate(categories, 1):
    print(f"\n[{idx}/{len(categories)}] 类别: {category.upper()}")
    print("-"*70)

    # 爬取4页
    print(f"  爬取中...", end=" ", flush=True)
    games = scraper.scrape_category(category, max_pages=4)

    # 保留前30个评分最高的
    if len(games) > 30:
        games = sorted(games, key=lambda x: x['rating'] if x['rating'] else 0, reverse=True)[:30]

    print(f"完成！")
    print(f"  可嵌入游戏: {len(games)} 个")

    # 统计详情信息
    with_desc = sum(1 for g in games if g.get('description'))
    with_features = sum(1 for g in games if g.get('features'))
    with_reviews = sum(1 for g in games if g.get('reviews'))
    total_reviews = sum(len(g.get('reviews', [])) for g in games)

    print(f"  详情统计:")
    print(f"    - 有描述: {with_desc}/{len(games)}")
    print(f"    - 有特性列表: {with_features}/{len(games)}")
    print(f"    - 有评价: {with_reviews}/{len(games)} (共 {total_reviews} 条评价)")

    # 保存到文件
    output = {
        'category': category,
        'total_games': len(games),
        'scraped_at': datetime.now().isoformat(),
        'statistics': {
            'with_description': with_desc,
            'with_features': with_features,
            'with_reviews': with_reviews,
            'total_reviews': total_reviews
        },
        'games': games
    }

    filename = f'data/{category}_games.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"  ✓ 已保存到: {filename}")

print(f"\n{'='*70}")
print("✓ 所有类别爬取完成！")
print("="*70)

# 列出所有文件并显示详细统计
print("\n文件统计:")
for cat in categories:
    filename = f'data/{cat}_games.json'
    if os.path.exists(filename):
        size = os.path.getsize(filename) / 1024

        # 读取并统计
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
            game_count = data.get('total_games', 0)
            stats = data.get('statistics', {})

            print(f"\n  ✓ {cat.upper()}: {game_count} 个游戏 ({size:.1f} KB)")
            if stats:
                print(f"      描述: {stats.get('with_description', 0)}/{game_count}")
                print(f"      特性: {stats.get('with_features', 0)}/{game_count}")
                print(f"      评价: {stats.get('with_reviews', 0)}/{game_count} ({stats.get('total_reviews', 0)} 条)")
    else:
        print(f"  ✗ {cat.upper()}: 文件不存在")
