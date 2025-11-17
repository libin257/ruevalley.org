帮我编写爬虫软件（放到tools/scrapy
目录）,爬取1games.com某一类别下的小
游戏名称\图片\iframe.
链接如下: 
1. https://1games.io/action.games 
动作类别下所有的游戏[Image #1]  
2. 某个具体游戏对应的 
iframe链接（有的游戏有有的没有）. 
[Image #2].


 😅55555555555555

需求确认
    - 目标网站: https://1games.io
    - 爬取范围: 
    前2页（约100个游戏）
    - 包含iframe: 是，访问每个游戏
    详情页获取iframe嵌入代码
    - 输出格式: JSON文件
    - 类别支持: 
    支持配置多个类别（action, racing, shooting等）

    项目结构（在 tools/scrapy/目录下）

    tools/scrapy/
    ├── __init__.py           # 
    包初始化文件
    ├── config.json           # 配
    置文件（类别、页数、速率限制等
    ）
    ├── scraper.py            # 
    核心爬虫类
    ├── main.py               # 
    命令行入口
    ├── requirements.txt      # 
    依赖包列表
    ├── data/                 # 
    输出数据目录
    │   └── action_games.json # 
    示例输出文件
    └── README.md             # 
    使用说明

    核心功能模块

    1. GamesScraper类 (scraper.py)

    - 
    scrape_category_page(category, 
    page) - 爬取类别页面
      - 提取游戏名称、图片URL、详情
    链接、评分、状态标签
      - 使用BeautifulSoup解析HTML
    - scrape_game_iframe(game_url) 
    - 爬取游戏详情页
      - 查找iframe标签
      - 提取embed代码和src属性
    - scrape_category(category, 
    max_pages) - 完整爬取流程
      - 自动分页处理
      - 进度显示
      - 错误重试机制
    - 速率限制：请求间隔1-2秒，避免
    服务器负载

    2. 配置文件 (config.json)

    {
      "categories": ["action", 
    "racing", "shooting"],
      "max_pages": 2,
      "rate_limit_seconds": 1.5,
      "output_dir": "data",
      "user_agent": "Mozilla/5.0 
    ...",
      "retry_attempts": 3
    }

    3. 命令行工具 (main.py)

    # 爬取指定类别
    python main.py --category 
    action --pages 2

    # 爬取多个类别
    python main.py --category 
    action,racing

    # 使用配置文件
    python main.py --config 
    config.json

    数据输出格式（JSON）

    {
      "category": "action",
      "total_games": 100,
      "scraped_at": 
    "2025-11-03T15:30:00Z",
      "games": [
        {
          "id": 
    "escape-road-city-2",
          "name": "Escape Road City
     2",
          "url": "https://1games.io
    /escape-road-city-2",
          "thumbnail": "https://ima
    ges2.1games.io/...",
          "rating": 9.3,
          "status": "UPDATED",
          "iframe_src": 
    "https://...",
          "iframe_html": "<iframe 
    src='...'></iframe>"
        }
      ]
    }

    技术栈

    - Python 3.8+
    - requests - HTTP请求
    - beautifulsoup4 - HTML解析
    - lxml - 更快的解析器
    - tqdm (可选) - 进度条显示

    错误处理

    - 网络超时重试（最多3次）
    - 缺失HTML元素优雅降级
    - 
    详细日志记录（保存到logs目录）
    - 失败的URL单独记录以便后续补爬

    预计执行时间

    - 爬取100个游戏列表：~10秒
    - 访问100个详情页获取iframe：~1
    50秒（带1.5秒间隔）
    - 总计：约3-4分钟