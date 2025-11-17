# 1games.io 爬虫项目总结

## 项目信息

- **创建日期**: 2025-11-03
- **位置**: `tools/scrapy/`
- **状态**: ✅ 已完成并测试

## 已实现功能

✅ 爬取 1games.io 网站游戏信息
✅ 自动抓取游戏名称、图片、链接、评分、状态
✅ 自动获取 iframe 嵌入代码
✅ 支持多页面分页抓取
✅ 支持多个游戏类别（action, racing, shooting, adventure, puzzle 等）
✅ 内置速率限制和请求重试机制
✅ 详细的日志记录
✅ JSON 格式输出
✅ 命令行工具
✅ Python API

## 文件结构

```
tools/scrapy/
├── scraper.py           - 核心爬虫类（GamesScraper）
├── main.py              - 命令行入口
├── config.json          - 配置文件
├── requirements.txt     - 依赖列表
├── README.md            - 完整文档
├── QUICKSTART.md        - 快速参考指南
├── PROJECT_SUMMARY.md   - 本文件
├── example.py           - 使用示例
├── __init__.py          - 包初始化
├── .gitignore          - Git 忽略规则
├── data/               - 输出数据目录
│   ├── .gitkeep
│   └── action_games.json (已生成，包含97个游戏)
└── logs/               - 日志目录
    └── .gitkeep
```

## 核心技术

- **Python 3.8+**
- **requests** - HTTP 请求
- **BeautifulSoup4** - HTML 解析
- **lxml** - 高性能解析器

## 使用方法

### 命令行

```bash
# 基本用法
python main.py --category action --pages 2

# 多个类别
python main.py --category action,racing,shooting --pages 2

# 快速模式（不抓取iframe）
python main.py --category action --no-iframes
```

### Python API

```python
from scraper import GamesScraper
import json

with open('config.json', 'r') as f:
    config = json.load(f)

scraper = GamesScraper(config)
games = scraper.scrape_category('action', max_pages=2)
scraper.save_to_json(games, 'action')
```

## 测试结果

✅ **测试类别**: action
✅ **爬取页数**: 2页
✅ **游戏数量**: 97个
✅ **iframe成功率**: 100%
✅ **执行时间**: ~4分钟
✅ **输出文件**: `data/action_games.json`

## iframe URL 模式

1games.io 使用统一的 iframe 嵌入模式：

```
游戏页面: https://1games.io/{game-slug}
iframe URL: https://1games.io/game/{game-slug}/
```

示例：
```html
<iframe src="https://1games.io/game/escape-road-city-2/" 
        width="1280" 
        height="720" 
        scrolling="none" 
        frameborder="0">
</iframe>
```

## 输出数据格式

```json
{
  "category": "action",
  "total_games": 97,
  "scraped_at": "2025-11-03T21:56:45.730930",
  "games": [
    {
      "id": "escape-road-city-2",
      "name": "Escape Road City 2",
      "url": "https://1games.io/escape-road-city-2",
      "thumbnail": "https://images2.1games.io/...",
      "rating": 9.3,
      "status": "UPDATED",
      "iframe_src": "https://1games.io/game/escape-road-city-2/",
      "iframe_html": "<iframe src='...' width='1280' height='720'></iframe>"
    }
  ]
}
```

## 配置选项

```json
{
  "categories": ["action", "racing", "shooting", "adventure", "puzzle"],
  "max_pages": 2,
  "games_per_page": 50,
  "rate_limit_seconds": 1.5,
  "scrape_iframes": true,
  "retry_attempts": 3,
  "timeout_seconds": 30
}
```

## 性能指标

| 操作 | 数量 | 时间 |
|------|------|------|
| 爬取游戏列表 | 100个游戏 | ~10秒 |
| 爬取iframe | 100个详情页 | ~150秒 |
| **总计** | 100个完整数据 | **约3-4分钟** |

## 注意事项

1. **速率限制**: 默认1.5秒间隔，避免服务器负载
2. **错误处理**: 自动重试3次，失败则跳过
3. **日志记录**: 所有操作记录在 `logs/` 目录
4. **数据更新**: 网站结构可能变化，需要维护

## 下一步建议

### 可能的扩展功能

- [ ] 增量更新（只爬取新游戏）
- [ ] 数据库存储（SQLite/PostgreSQL）
- [ ] 定时任务支持（cron/schedule）
- [ ] Web UI 界面
- [ ] 多线程/异步爬取（提升速度）
- [ ] 代理池支持
- [ ] 更多输出格式（CSV、Excel）

### 集成建议

可以将爬取的数据集成到您的项目中：

1. **Next.js 应用**: 在 `/calculator` 页面添加游戏嵌入功能
2. **动态加载**: 从 JSON 文件读取游戏数据
3. **iframe 嵌入**: 使用 `iframe_src` 或 `iframe_html` 嵌入游戏
4. **搜索功能**: 添加游戏搜索和过滤
5. **类别导航**: 按类别展示游戏

示例代码：
```typescript
// src/app/games/page.tsx
'use client'

import games from '@/data/action_games.json'

export default function GamesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {games.games.map(game => (
        <div key={game.id} className="card">
          <img src={game.thumbnail} alt={game.name} />
          <h3>{game.name}</h3>
          <p>Rating: {game.rating}</p>
          <iframe src={game.iframe_src} />
        </div>
      ))}
    </div>
  )
}
```

## 联系与支持

如有问题或需要帮助：
- 查看 `README.md` 获取完整文档
- 查看 `QUICKSTART.md` 获取快速指南
- 查看 `logs/` 目录中的日志文件
- 参考 `example.py` 获取使用示例

---

**项目状态**: ✅ Production Ready
**最后更新**: 2025-11-03
