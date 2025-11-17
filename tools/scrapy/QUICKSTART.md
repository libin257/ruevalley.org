# 快速参考指南

## 最常用命令

```bash
# 进入爬虫目录
cd tools/scrapy

# 爬取 action 类别（2页，约100个游戏）
python main.py --category action --pages 2

# 爬取多个类别
python main.py --category action,racing,shooting --pages 2

# 快速爬取（不包含 iframe）
python main.py --category action --pages 2 --no-iframes
```

## 输出文件位置

- **数据文件**: `tools/scrapy/data/action_games.json`
- **日志文件**: `tools/scrapy/logs/scraper_YYYYMMDD_HHMMSS.log`

## JSON 数据格式

```json
{
  "games": [
    {
      "id": "游戏ID",
      "name": "游戏名称",
      "url": "游戏详情页链接",
      "thumbnail": "缩略图URL",
      "rating": 9.3,
      "status": "UPDATED",
      "iframe_src": "https://1games.io/game/游戏ID/",
      "iframe_html": "<iframe src='...' width='1280' height='720'></iframe>"
    }
  ]
}
```

## 可用类别

- action - 动作
- racing - 赛车
- shooting - 射击
- adventure - 冒险
- puzzle - 益智
- sports - 体育
- strategy - 策略

## 性能参考

- 爬取100个游戏列表：~10秒
- 爬取100个游戏iframe：~150秒
- **总计**：约3-4分钟

## 配置调整

编辑 `config.json`:

```json
{
  "max_pages": 2,              // 每个类别爬取的页数
  "rate_limit_seconds": 1.5,   // 请求间隔时间（秒）
  "scrape_iframes": true       // 是否爬取iframe
}
```

## Python 脚本使用

```python
from scraper import GamesScraper
import json

with open('config.json', 'r') as f:
    config = json.load(f)

scraper = GamesScraper(config)
games = scraper.scrape_category('action', max_pages=2)
scraper.save_to_json(games, 'action')
```

## 故障排除

**问题：请求被拒绝**
- 增加 `rate_limit_seconds` 到 2-3 秒

**问题：某些游戏没有iframe**
- 正常情况，部分游戏可能不提供iframe嵌入

**问题：解析错误**
- 检查网站是否更新了HTML结构
- 查看日志文件获取详细错误信息
