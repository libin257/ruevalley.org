# 1games.io 游戏爬虫

一个用于抓取 [1games.io](https://1games.io) 网站游戏信息的 Python 爬虫工具。

## 功能特性

- 抓取指定类别的游戏信息（名称、图片、链接、评分、状态）
- 自动访问游戏详情页获取 iframe 嵌入代码
- 支持多页面自动分页抓取
- 支持多个游戏类别同时抓取
- 内置请求速率限制，避免服务器负载
- 自动重试机制和错误处理
- 详细的日志记录
- 输出 JSON 格式数据

## 项目结构

```
tools/scrapy/
├── __init__.py           # 包初始化
├── config.json           # 配置文件
├── scraper.py            # 核心爬虫类
├── main.py               # 命令行入口
├── requirements.txt      # 依赖包
├── README.md             # 本文档
├── data/                 # 输出数据目录
│   └── action_games.json # 示例输出
└── logs/                 # 日志目录
    └── scraper_*.log     # 运行日志
```

## 安装

### 1. 安装依赖

使用 pip 安装所需的 Python 包：

```bash
cd tools/scrapy
pip install -r requirements.txt
```

或使用 bun（如果项目使用 bun）：

```bash
cd tools/scrapy
bun install
```

### 2. 配置文件

编辑 `config.json` 自定义爬虫设置：

```json
{
  "categories": ["action", "racing", "shooting", "adventure", "puzzle"],
  "max_pages": 2,
  "games_per_page": 50,
  "rate_limit_seconds": 1.5,
  "output_dir": "data",
  "log_dir": "logs",
  "user_agent": "Mozilla/5.0 ...",
  "retry_attempts": 3,
  "timeout_seconds": 30,
  "scrape_iframes": true
}
```

**配置说明：**
- `categories`: 可用的游戏类别列表
- `max_pages`: 每个类别抓取的最大页数（每页约50个游戏）
- `rate_limit_seconds`: 请求之间的延迟时间（秒）
- `scrape_iframes`: 是否抓取游戏详情页的 iframe 代码
- `retry_attempts`: 请求失败重试次数
- `timeout_seconds`: 请求超时时间

## 使用方法

### 基本用法

```bash
cd tools/scrapy

# 抓取 action 类别的游戏（使用配置文件的默认页数）
python main.py --category action

# 抓取指定页数
python main.py --category action --pages 2

# 抓取多个类别
python main.py --category action,racing,shooting --pages 2

# 查看配置文件中可用的类别
python main.py --list-categories
```

### 高级选项

```bash
# 不抓取 iframe（速度更快）
python main.py --category action --no-iframes

# 使用自定义配置文件
python main.py --config my_config.json

# 指定输出文件（仅单个类别）
python main.py --category action --output my_games.json
```

### 命令行参数

- `--category <name>`: 要抓取的类别（逗号分隔多个）
- `--pages <num>`: 每个类别抓取的页数
- `--config <path>`: 配置文件路径（默认：config.json）
- `--output <path>`: 自定义输出文件（仅单类别）
- `--no-iframes`: 跳过 iframe 抓取（更快）
- `--list-categories`: 列出配置中的可用类别

## 输出格式

### JSON 输出示例

爬虫会将结果保存到 `data/` 目录下的 JSON 文件中：

```json
{
  "category": "action",
  "total_games": 100,
  "scraped_at": "2025-11-03T15:30:00Z",
  "games": [
    {
      "id": "escape-road-city-2",
      "name": "Escape Road City 2",
      "url": "https://1games.io/escape-road-city-2",
      "thumbnail": "https://images2.1games.io/cache/game/escape-road-city-2/escape-road-city-2-m200x130.webp",
      "rating": 9.3,
      "status": "UPDATED",
      "iframe_src": "https://1games.io/game/escape-road-city-2/",
      "iframe_html": "<iframe src='...' width='1280' height='720'></iframe>"
    },
    {
      "id": "mad-racers",
      "name": "Mad Racers",
      "url": "https://1games.io/mad-racers",
      "thumbnail": "https://images2.1games.io/cache/game/mad-racers/mad-racers-m200x130.webp",
      "rating": 8.4,
      "status": "NEW",
      "iframe_src": null,
      "iframe_html": null
    }
  ]
}
```

**字段说明：**
- `id`: 游戏唯一标识符（从 URL 提取）
- `name`: 游戏名称
- `url`: 游戏详情页链接
- `thumbnail`: 游戏缩略图 URL
- `rating`: 游戏评分（1-10）
- `status`: 游戏状态标签（HOT、NEW、TRENDING、UPDATED 等）
- `iframe_src`: iframe 的 src 属性（嵌入链接）
- `iframe_html`: 完整的 iframe HTML 代码

### 日志输出

运行日志保存在 `logs/` 目录下：

```
logs/scraper_20251103_153000.log
```

日志内容包括：
- 抓取进度
- 请求成功/失败信息
- 发现的游戏数量
- 错误和警告信息

## 代码示例

### Python 脚本中使用

```python
from scraper import GamesScraper
import json

# 加载配置
with open('config.json', 'r') as f:
    config = json.load(f)

# 初始化爬虫
scraper = GamesScraper(config)

# 抓取单个类别
games = scraper.scrape_category('action', max_pages=2)
print(f"找到 {len(games)} 个游戏")

# 保存到 JSON
scraper.save_to_json(games, 'action')

# 抓取多个类别
categories = ['action', 'racing', 'puzzle']
results = scraper.scrape_multiple_categories(categories)

for category, games in results.items():
    print(f"{category}: {len(games)} 个游戏")
```

### 仅抓取列表（不抓取 iframe）

```python
config['scrape_iframes'] = False
scraper = GamesScraper(config)
games = scraper.scrape_category('action', max_pages=1)
```

## 性能说明

### 预计执行时间

| 操作 | 数量 | 时间 |
|------|------|------|
| 抓取游戏列表 | 100个游戏（2页） | ~10秒 |
| 抓取 iframe | 100个详情页 | ~150秒 |
| **总计** | 100个完整数据 | **约3-4分钟** |

### 速率限制

- 默认请求间隔：1.5秒
- 可在 `config.json` 中调整 `rate_limit_seconds`
- 建议不要低于1秒，避免服务器限制

## 可用游戏类别

常见类别（可能更新）：
- `action` - 动作游戏
- `racing` - 赛车游戏
- `shooting` - 射击游戏
- `adventure` - 冒险游戏
- `puzzle` - 益智游戏
- `sports` - 体育游戏
- `strategy` - 策略游戏

使用以下命令查看配置中的完整列表：

```bash
python main.py --list-categories
```

## 错误处理

爬虫内置以下错误处理机制：

1. **网络错误**：自动重试3次（可配置）
2. **超时**：默认30秒超时
3. **HTML 解析错误**：跳过该游戏，继续处理其他游戏
4. **缺失元素**：优雅降级，字段设为 null
5. **键盘中断**：Ctrl+C 可随时安全退出

## 注意事项

1. **遵守网站使用条款**：请合理使用，不要过度抓取
2. **速率限制**：保持合理的请求间隔，避免被封禁
3. **数据准确性**：网站结构可能变化，导致解析失败
4. **网络稳定**：建议在稳定的网络环境下运行
5. **磁盘空间**：100个游戏约占用50-100KB JSON 文件

## 故障排除

### 问题：请求被拒绝（403/429 错误）

**解决方案：**
- 增加 `rate_limit_seconds` 到 2-3 秒
- 检查 `user_agent` 设置
- 减少 `max_pages` 数量

### 问题：找不到 iframe

**可能原因：**
- 该游戏确实没有 iframe（部分游戏使用其他嵌入方式）
- 网站 HTML 结构已更改
- 需要 JavaScript 渲染（目前不支持）

**解决方案：**
- 检查日志中的警告信息
- 手动访问游戏页面确认是否有 iframe
- 如果需要 JS 渲染，考虑使用 Playwright/Selenium

### 问题：解析错误

**解决方案：**
- 查看日志文件了解详细错误
- 网站可能更新了 HTML 结构，需要更新选择器
- 在 `scraper.py` 中更新相应的 CSS 选择器

## 技术栈

- **Python 3.8+**
- **requests** - HTTP 请求库
- **BeautifulSoup4** - HTML 解析库
- **lxml** - 高性能 XML/HTML 解析器

## 许可证

本工具仅供学习和研究使用。请遵守 1games.io 网站的使用条款和 robots.txt 规则。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### v1.0.0 (2025-11-03)
- 初始版本发布
- 支持游戏列表抓取
- 支持 iframe 嵌入代码获取
- 多类别抓取支持
- 配置文件管理
- 日志和错误处理

## 联系方式

如有问题或建议，请提交 GitHub Issue。
