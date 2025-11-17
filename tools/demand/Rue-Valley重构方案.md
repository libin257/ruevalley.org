# Rue Valley 重构方案

> **项目目标**: 将现有 Brother Hai Restaurant 游戏站改造为 Rue Valley 游戏站
>
> **核心约束**:
> - ✅ 保留所有现有UI设计和组件结构
> - ✅ 只修改文案内容和功能逻辑
> - ✅ 新增功能作为独立模块添加
> - ❌ 禁止修改/删除任何现有前端设计

---

## 📚 需求文档总览

本重构方案基于以下需求文档编写：

| 文档名称 | 核心内容 |
|---------|---------|
| `0_需求.md` | 项目背景、域名(ruevalley.org)、代码规范、多语言规范 |
| `前置准备.md` | 数据获取清单、API配置、资源准备、脚本实现 |
| `需求总览.md` | 首页功能设计、Steam热度仪表盘、意向树查询器 |
| `功能实现.md` | SteamSpy API技术方案、意向树数据结构 |
| `内页url和项目目录设计.md` | 160条SEO内页结构、批量生成方案 |
| `首页header设计实现.md` | Hero区视觉设计、背景图链接、CTA按钮 |
| `首页其余部分的实现.md` | YouTube视频ID、Reddit讨论链接 |
| `UI设计.md` | 色彩方案(紫蓝暗夜)、背景图推荐 |
| `rue_valley_seo_matrix.csv` | 160条关键词矩阵及参考文章 |
| `内容生成完成报告.md` | 内容生成状态参考 |
| `全站背景图.jpg` | 项目自带背景图资源 |
| `官方横幅.png` | Steam官方横幅素材 |

---

## 🎯 改造策略总览

### UI设计保留策略（严格禁止修改）

**完全保留的内容**：
1. **布局结构**: Header(sticky)、Hero(grid)、卡片式展示、FAQ、Footer(4列)
2. **组件样式**: 按钮hover、卡片阴影、backdrop-blur、transition动画
3. **色彩系统**: Tailwind配置、dark mode、HSL变量
4. **响应式**: container、breakpoints、栅格系统

**唯一允许的颜色调整**:
- 主题色从红色改为紫绿搭配
- `bg-red-800` → `bg-[#25AB2B]` (绿色CTA)
- `bg-red-700` → `bg-[#1E8923]` (hover)
- `border-red-900` → `border-[#7D12FF]` (霓虹紫强调)

### 文案替换策略

保留组件结构，仅替换文本内容：
- 品牌名：Brother Hai Restaurant → Rue Valley
- 副标题：越南恐怖游戏 → 47分钟时间循环RPG
- 按钮文案：Download Game → Get on Steam
- 所有FAQ问答内容更新为Rue Valley相关

### 新增功能策略

作为独立组件插入现有布局：
1. Steam热度仪表盘（插入Hero下方）
2. 意向树查询器（独立section）
3. YouTube视频区（栅格布局）
4. Reddit讨论区（列表布局）

---

## 📋 TODO任务清单

### TODO-1: 基础配置和数据准备
### TODO-2: 首页文案和链接替换
### TODO-3: 新增Steam热度仪表盘组件
### TODO-4: 新增意向树查询器组件
### TODO-5: 新增YouTube视频和Reddit讨论区
### TODO-6: 批量生成160条SEO内页
### TODO-7: 测试和部署准备

---

# TODO-1: 基础配置和数据准备

## 📋 借鉴文档和资源

- **`0_需求.md`** - Google Analytics配置、域名信息、环境变量
- **`前置准备.md`** - 完整数据获取清单、API配置、脚本实现示例
- **`功能实现.md`** - SteamSpy API详细说明
- **`UI设计.md`** - 背景图下载链接(3个Unsplash URL)
- **`首页header设计实现.md`** - Steam CDN横幅链接
- **`首页其余部分的实现.md`** - YouTube视频ID、Reddit链接列表
- **`tools/demand/全站背景图.jpg`** - 本地背景图文件
- **`tools/demand/官方横幅.png`** - 本地横幅文件

---

## 任务目标

完成项目基础配置、依赖安装、数据文件准备、图片资源下载，为后续开发做好准备。

---

## 步骤1: 环境变量配置

**操作内容**:
1. 创建 `.env.local` 文件
2. 添加以下配置项：
   - Google Analytics ID: `G-K48QCTT1WD`
   - Microsoft Clarity ID: `u6z6k49ztk`
   - 站点URL: `https://ruevalley.org`
   - 站点名称: `Rue Valley Portal`
   - Steam App ID: `2126190`
3. 确认 `.gitignore` 包含 `.env.local`

**验收标准**:
- `.env.local` 文件包含所有5个环境变量
- `.gitignore` 已配置正确

---

## 步骤2: 安装项目依赖

**新增依赖包**:

生产依赖：
- `fuse.js` - 轻量级模糊搜索库（用于意向树查询器）
- `recharts` - 图表库（用于Steam热度仪表盘）
- `lite-youtube-embed` - YouTube轻量级嵌入组件

开发依赖：
- `csv-parser` - CSV文件解析（用于SEO矩阵处理）

**操作方式**: 更新 `package.json` 并执行安装命令

**验收标准**:
- 所有依赖安装成功
- `node_modules/` 包含新包
- 无依赖冲突错误

---

## 步骤3: 创建目录结构

**需要创建的目录**:
```
public/data/                # JSON数据文件
public/data/references/     # 参考文章数据
public/images/backgrounds/  # 背景图片(5张)
public/images/steam/        # Steam官方素材(2张)
public/images/youtube/      # YouTube缩略图(可选)
src/data/                   # TypeScript数据配置
src/components/rue-valley/  # Rue Valley专用组件
scripts/                    # 构建脚本(3个)
templates/                  # MDX模板文件
```

**验收标准**:
- 所有目录创建成功
- 目录权限正确

---

## 步骤4: 下载背景图片资源

**资源清单**（来源: `UI设计.md`、`首页header设计实现.md`）:

| 图片 | Unsplash URL | 用途 | 保存路径 |
|------|-------------|------|---------|
| 主背景 | `photo-1535223289827-42f1e9919769` (紫蓝渐变) | Hero区主背景 | `public/images/backgrounds/hero-bg.jpg` |
| 备用1 | `photo-1542751110-97427bbecf20` (深灰靛蓝) | 备用背景 | `public/images/backgrounds/alt-bg-1.jpg` |
| 备用2 | `photo-1542273917363-3b1817f69a2d` (霓虹光源) | 备用背景 | `public/images/backgrounds/alt-bg-2.jpg` |

**下载方式**: 使用 `curl -L "{URL}?auto=format&fit=crop&w=2880&q=80" -o {路径}`

**复制本地图片**:
- 复制 `tools/demand/全站背景图.jpg` 到 `public/images/backgrounds/backup-bg.jpg`

**验收标准**:
- 3张Unsplash图片下载成功
- 1张本地图片复制成功
- 文件大小合理(100-300KB/张)

---

## 步骤5: 下载Steam官方素材

**资源清单**（来源: `首页header设计实现.md`）:

| 素材 | CDN URL | 保存路径 |
|------|---------|---------|
| Steam横幅 | `cdn.akamai.steamstatic.com/steam/apps/2126190/header.jpg` | `public/images/steam/header.jpg` |

**复制本地素材**:
- 复制 `tools/demand/官方横幅.png` 到 `public/images/steam/official-banner.png`

**验收标准**:
- Steam横幅下载成功(约80KB)
- 本地横幅复制成功

---

## 步骤6: 创建TypeScript数据配置文件

### 6.1 YouTube视频配置

**文件路径**: `src/data/videos.ts`

**数据来源**: `首页其余部分的实现.md` (视频ID列表)

**内容结构**:
```typescript
export interface Video {
  id: string              // YouTube视频ID
  title: string           // 视频标题
  description: string     // 描述
  thumbnail: string       // 缩略图URL
}

export const featuredVideos: Video[] = [
  // 3个视频数据
  // ID: ydirmet86Uk, IHOpJyGxSDc, kYxxTWN5N1c
]
```

### 6.2 Reddit讨论配置

**文件路径**: `src/data/reddit.ts`

**数据来源**: `首页其余部分的实现.md` (Reddit链接列表)

**内容结构**:
```typescript
export interface RedditPost {
  title: string
  stats: string
  url: string
  category: 'technical' | 'review' | 'discussion'
}

export const redditPosts: RedditPost[] = [
  // 4个Reddit帖子链接
]
```

**验收标准**:
- 两个TS文件创建成功
- 类型定义完整
- 数据符合接口规范

---

## 步骤7: 创建SteamSpy数据拉取脚本

**文件路径**: `scripts/fetch-steam.js`

**数据来源**: `功能实现.md`、`前置准备.md` (SteamSpy API说明)

**脚本功能**:
1. 请求 `https://steamspy.com/api.php?request=appdetails&appid=2126190`
2. 提取字段: positive, negative, owners, price, score_rank
3. 计算好评率: `positive / (positive + negative) * 100`
4. 保存到 `public/data/steamspy.json`

**package.json配置**:
- 添加脚本: `"fetch:steam": "node scripts/fetch-steam.js"`
- 添加预构建钩子: `"prebuild": "npm run fetch:steam"`

**验收标准**:
- 脚本执行无错误
- JSON文件生成成功
- 数据格式正确(包含6个字段)

---

## 步骤8: 创建CSV转JSON脚本

**文件路径**: `scripts/csv-to-json.js`

**数据来源**: `rue_valley_seo_matrix.csv` (160条关键词矩阵)

**脚本功能**:
1. 读取 `tools/demand/rue_valley_seo_matrix.csv`
2. 按URL第一级路径分类(review, buy, guide等)
3. 生成两个文件:
   - `public/data/seo-matrix.json` (分类数据)
   - `public/data/seo-matrix-full.json` (完整数据)

**package.json配置**:
- 添加脚本: `"csv:json": "node scripts/csv-to-json.js"`

**验收标准**:
- CSV解析成功
- 两个JSON文件生成
- 分类数据结构合理(约7-8个类别)

---

## 步骤9: 准备意向树数据

**文件路径**: `public/data/intentions.json`

**数据来源**:
- **主要参考**: `功能实现.md` (数据结构说明)
- **攻略来源**: 需从外部攻略网站提取或手动整理
  - https://intoindiegames.com/walkthrough-hub/rue-valley-complete-walkthrough-all-tasks-and-intentions/
  - https://www.thegamer.com/rue-valley-walkthrough-puzzle-solution-intention-complete-guide/

**数据结构**:
```json
[
  {
    "intention": "意向名称",
    "loop": 循环编号(数字),
    "npc": "NPC名称",
    "prerequisite": "前置条件",
    "reward": "奖励"
  }
]
```

**初期方案**:
- 先创建6条示例数据用于开发测试
- 后续补充完整数据(预计200+条)

**验收标准**:
- JSON文件存在
- 包含至少6条测试数据
- 数据结构完整

---

## 步骤10: 最终验证

**验证检查清单**:
- [ ] `.env.local` 包含所有环境变量
- [ ] 所有依赖安装成功
- [ ] 目录结构完整
- [ ] 5张背景图片就绪
- [ ] 2张Steam素材就绪
- [ ] `videos.ts` 和 `reddit.ts` 创建完成
- [ ] `fetch-steam.js` 脚本可用
- [ ] `csv-to-json.js` 脚本可用
- [ ] `steamspy.json` 生成成功
- [ ] `intentions.json` 存在
- [ ] `seo-matrix.json` 生成成功

**构建测试**:
```bash
npm run lint          # 类型检查
npm run fetch:steam   # 测试数据拉取
npm run csv:json      # 测试CSV转换
npm run build         # 完整构建测试
```

**验收标准**:
- 所有脚本执行无错误
- 构建成功
- 数据文件齐全

---

# TODO-2: 首页文案和链接替换

## 📋 借鉴文档和资源

- **`需求总览.md`** - 首页功能设计、信息导航区、FAQ内容
- **`首页header设计实现.md`** - Hero区文案设计、CTA按钮文案
- **`首页其余部分的实现.md`** - 导航栏、页脚、视频区文案

---

## 任务目标

在**保留所有UI结构和样式**的前提下，替换所有文案内容，将Brother Hai Restaurant改为Rue Valley主题。

**核心约束**:
- ✅ 保留组件JSX结构
- ✅ 保留所有className
- ✅ 仅修改文本内容、图片URL、链接URL
- ❌ 不修改布局、样式、动画

---

## 步骤1: Header导航栏文案替换

**文件路径**: `src/components/Header.tsx`

**需要替换的内容**:

| 原文案 | 新文案 | 位置 |
|--------|--------|------|
| "Brother Hai Restaurant" | "Rue Valley" | Logo文本 |
| href="官方itch.io链接" | href="https://store.steampowered.com/app/2126190" | 导航链接 |
| "Official itch.io" | "Steam Store" | 导航文本 |

**保留内容**:
- sticky定位、backdrop-blur样式
- 导航结构(Home, Steam Store, Articles, News)
- 主题切换按钮、语言切换按钮

**验收标准**:
- 品牌名更新为Rue Valley
- 链接指向Steam商店
- UI样式完全不变

---

## 步骤2: Footer页脚文案替换

**文件路径**: `src/components/Footer.tsx`

**需要替换的内容**:

| 原文案 | 新文案 |
|--------|--------|
| "Brother Hai Restaurant" | "Rue Valley" |
| "Your ultimate Brother Hai Restaurant resource - the viral Vietnamese indie horror game." | "Your complete Rue Valley guide - walkthroughs, intention tree search, Steam stats, and community discussions." |
| "brotherhairestaurant.com" | "ruevalley.org" |
| "Game developed by marisa0704" | "Game developed by Emotigo Studios" |

**更新导航链接**:
- Quick Links: 保留Home, Articles, News，将Download Game改为Steam Store
- Legal: 保留Privacy Policy, Terms of Service
- Connect: 更新邮箱为 `support@ruevalley.org`

**保留内容**:
- 4列栅格布局
- 暗色背景样式
- 所有spacing和padding

**验收标准**:
- 所有品牌信息更新
- 链接指向正确
- 布局样式不变

---

## 步骤3: 首页Hero区文案替换

**文件路径**: `src/app/page.tsx`

**Hero Section需要替换**:

| 元素 | 原文案 | 新文案 |
|------|--------|--------|
| H1 | "Brother Hai Restaurant" | "Rue Valley" |
| H2 | "The Vietnamese Horror Game Everyone's Searching For" | "47-Minute Time Loop RPG – Master the Cycle" |
| 描述 | "Step into Brother Hai's Pho Restaurant, where authentic Vietnamese culture meets psychological horror. Uncover the truth behind the viral sensation that sparked a Google Maps phenomenon." | "Trapped in a 47-minute time loop, you must solve puzzles, build relationships, and unlock intentions to escape Rue Valley's mysterious cycle. Every choice matters, every loop reveals new secrets." |
| 主按钮 | "Download Game" | "Get on Steam" |
| 次按钮 | "Share" | "Share" (保留) |

**Hero右侧图片**:
- 替换 `src` 为Steam横幅: `"/images/steam/header.jpg"`
- 更新 `alt` 为 "Rue Valley Game"

**保留内容**:
- grid grid-cols-1 lg:grid-cols-2布局
- 按钮样式和hover效果
- Share按钮图标和功能

**验收标准**:
- 文案完全更新
- 图片更新为Steam横幅
- 样式和动画保持不变

---

## 步骤4: "Safe Download Guide"区块改造

**原区块名称**: "Safe Download Guide"
**新区块名称**: "Where to Buy & Platform Availability"

**文案替换**:

| 原内容 | 新内容 |
|--------|--------|
| 区块标题 | "Where to Buy & Platform Availability" |
| 副标题 | "Available on Steam and Nintendo Switch - Choose your platform" |
| 主按钮 | "Get on Steam" → 链接到Steam商店 |
| 次按钮 | "View Switch Version" → 链接到Nintendo商店 |

**安装说明改为平台对比**:
```
平台对比列表:
1. Steam (PC) - 价格、配置要求、支持信息
2. Nintendo Switch - 价格、便携性优势
3. 价格历史追踪链接(SteamDB)
```

**保留内容**:
- bg-white/gray-900卡片样式
- rounded-lg和padding结构
- 按钮组布局

**验收标准**:
- 区块主题从下载指南变为购买指南
- 保留卡片样式
- 链接指向Steam和Switch商店

---

## 步骤5: "Cultural Easter Eggs"区块改造

**原区块名称**: "Vietnamese Cultural Easter Eggs"
**新区块名称**: "Core Intentions Reference"

**用途变化**:
- 原用途: 展示6个越南文化梗
- 新用途: 展示6个核心意向示例

**数据来源**: `public/data/intentions.json` (前6条)

**数据结构调整**:
```typescript
// 原数据结构
{ title: string, description: string }

// 新数据结构(从intentions.json提取)
{
  title: intention名称,
  description: "Loop #{loop} · NPC: {npc} · 奖励: {reward}"
}
```

**保留内容**:
- grid grid-cols-1 md:grid-cols-2布局
- 卡片样式(bg-gray-800/50, backdrop-blur)
- 编号圆圈图标(bg-red-900改为bg-[#7D12FF])

**验收标准**:
- 区块标题更新
- 数据从intentions.json读取
- 卡片样式保留，仅颜色微调

---

## 步骤6: "Key Features"区块文案替换

**原区块标题**: "Key Features of Brother Hai Restaurant"
**新区块标题**: "Why Rue Valley Stands Out"

**三个特色替换**:

| 原特色 | 新特色 |
|--------|--------|
| **Story-Driven Gameplay**<br/>Brother Hai Restaurant offers a narrative-rich experience where your choices matter and every interaction reveals more about the haunting village. | **Time Loop Mastery**<br/>Every 47-minute cycle offers new paths. Master the loop by learning patterns, unlocking intentions, and making strategic choices to break free. |
| **Atmospheric Design**<br/>Experience Brother Hai Restaurant's retro visuals and cinematic cutscenes that perfectly capture 90s Vietnamese village aesthetics. | **Relationship System**<br/>Build connections with NPCs across loops. Each character remembers past interactions, opening new dialogue branches and secret intentions. |
| **Cultural Authenticity**<br/>Brother Hai Restaurant showcases Vietnamese daily life through meticulous details - from pho preparation to local dialogue patterns. | **Multiple Endings**<br/>Four distinct endings based on your choices. Discover hidden paths, unlock secret intentions, and piece together the mystery of Rue Valley. |

**保留内容**:
- grid grid-cols-1 md:grid-cols-3布局
- 卡片背景和边框样式
- 文字大小和spacing

**验收标准**:
- 三个特色完全重写为Rue Valley相关
- 布局和样式完全保留

---

## 步骤7: "Latest Articles"区块数据替换

**区块标题**: 保留 "Latest Articles"

**三篇文章数据替换**:

| 字段 | 文章1 | 文章2 | 文章3 |
|------|-------|-------|-------|
| title | "Rue Valley Loop Guide: Master the 47-Minute Cycle" | "All Intentions Walkthrough: Complete NPC Guide" | "Rue Valley Endings Explained: How to Unlock All Routes" |
| description | "Complete guide to understanding time loops, cycle mechanics, and efficient loop planning in Rue Valley." | "Full list of all intentions, prerequisites, NPC locations, and rewards for each loop cycle." | "Step-by-step guide to unlocking all four endings with detailed choice trees and hidden paths." |
| image | Steam截图URL或自定义图片 | Steam截图URL或自定义图片 | Steam截图URL或自定义图片 |
| href | "/article/loop-guide" | "/article/intentions-walkthrough" | "/article/all-endings" |

**保留内容**:
- grid grid-cols-1 md:grid-cols-3布局
- 卡片hover效果(border-red-900改为border-[#7D12FF])
- 图片高度和对象适配

**验收标准**:
- 三篇文章数据完全更新
- 卡片样式保留
- hover效果正常

---

## 步骤8: FAQ区块内容替换

**区块标题**: 保留 "Frequently Asked Questions"

**四个FAQ替换**:

### FAQ 1
**问题**: "What is Rue Valley about?"
**回答**: "Rue Valley is a narrative RPG where you're trapped in a 47-minute time loop. You play as a character who must solve puzzles, build relationships, and unlock 'intentions' to gradually piece together the mystery and find a way to escape the cycle."

### FAQ 2
**问题**: "How long does it take to complete Rue Valley?"
**回答**: "A single playthrough takes approximately 8-12 hours depending on your exploration style. Unlocking all four endings and discovering every intention can extend playtime to 15-20 hours."

### FAQ 3
**问题**: "What are 'intentions' in Rue Valley?"
**回答**: "Intentions are objectives you can complete in each loop cycle. They range from helping NPCs to solving environmental puzzles. Each intention unlocks new story fragments and progresses your understanding of the mystery. There are 20+ intentions to discover across different loops."

### FAQ 4
**问题**: "Is Rue Valley available on consoles?"
**回答**: "Yes, Rue Valley is available on PC (Steam) and Nintendo Switch. The Steam version offers higher graphical settings and Steam Deck compatibility, while the Switch version provides portable play with optimized performance."

**保留内容**:
- max-w-3xl容器宽度
- 卡片样式和spacing
- 手风琴展开动画(如有)

**验收标准**:
- 四个FAQ完全重写
- 样式和布局保留

---

## 步骤9: CTA Section文案替换

**区块位于**: 首页底部(FAQ下方)

**文案替换**:

| 原文案 | 新文案 |
|--------|--------|
| 标题 | "Ready to Break the Time Loop?" |
| 描述 | "Join thousands of players experiencing Rue Valley's unique time loop mystery. Available now on Steam and Nintendo Switch." |
| 按钮 | "Get on Steam" |

**保留内容**:
- bg-gray-800/50 backdrop-blur背景
- 居中对齐
- 按钮样式(颜色改为绿色)

**验收标准**:
- CTA文案更新
- 样式保留

---

## 步骤10: 颜色微调配置

**文件路径**: `src/app/globals.css` 或内联样式

**颜色替换规则**:

| 原颜色类 | 新颜色类 | 用途 |
|---------|---------|------|
| `bg-red-800` | `bg-[#25AB2B]` | 主CTA按钮背景 |
| `bg-red-700` | `bg-[#1E8923]` | 按钮hover背景 |
| `hover:bg-red-700` | `hover:bg-[#1E8923]` | hover状态 |
| `border-red-900` | `border-[#7D12FF]` | 强调边框 |
| `text-red-400` | `text-[#25AB2B]` | 强调文本 |
| `shadow-red-900/20` | `shadow-[#7D12FF]/20` | 卡片阴影 |

**操作方式**:
- 全局搜索替换上述颜色类
- 保留所有其他样式类不变

**验收标准**:
- 主题色从红色变为紫绿搭配
- 布局、间距、字体完全不变

---

## 步骤11: 最终验证

**验证检查清单**:
- [ ] Header品牌名和链接更新
- [ ] Footer所有文案更新
- [ ] Hero区标题、描述、按钮更新
- [ ] 购买指南区块更新
- [ ] 核心意向展示更新
- [ ] 游戏特色文案更新
- [ ] 最新文章数据更新
- [ ] FAQ内容更新
- [ ] CTA区块更新
- [ ] 颜色主题调整完成
- [ ] 所有UI结构保留
- [ ] 响应式布局正常

**测试步骤**:
1. 本地启动: `npm run dev`
2. 浏览器测试所有文案显示
3. 点击测试所有链接
4. 响应式测试(mobile/tablet/desktop)

**验收标准**:
- 所有文案符合Rue Valley主题
- 所有链接指向正确
- UI样式完全保留
- 无控制台错误

---

# TODO-3: 新增Steam热度仪表盘组件

## 📋 借鉴文档和资源

- **`需求总览.md`** - Steam热度仪表盘功能设计、数据展示需求
- **`功能实现.md`** - SteamSpy API技术方案、数据处理逻辑、图表库选型
- **`前置准备.md`** - SteamSpy API接口说明、数据结构示例

---

## 任务目标

创建独立的Steam热度仪表盘组件，在首页展示实时Steam数据(好评率、销量、价格)，使用Recharts图表库实现可视化。

**插入位置**: Hero Section和"Where to Buy"区块之间

---

## 步骤1: 创建组件文件

**文件路径**: `src/components/rue-valley/SteamGauge.tsx`

**组件功能**:
1. 读取 `public/data/steamspy.json` 数据
2. 计算好评率: `(positive / (positive + negative)) * 100`
3. 使用Recharts绘制圆环仪表盘
4. 显示关键指标: 好评率、预估销量、价格

**组件结构**:
```typescript
import { RadialBarChart } from 'recharts'

export function SteamGauge() {
  // 1. 加载steamspy.json数据
  // 2. 计算好评率
  // 3. 准备图表数据
  // 4. 渲染仪表盘 + 文字指标
  return (...)
}
```

---

## 步骤2: 数据加载逻辑

**数据源**: `public/data/steamspy.json` (由fetch-steam.js生成)

**数据结构**:
```json
{
  "fetchedAt": 时间戳,
  "name": "Rue Valley",
  "positive": 299,
  "negative": 161,
  "owners": "20,000 .. 50,000",
  "price": "26.99",
  "scoreRank": 65
}
```

**加载方式**:
- 服务端组件: 直接import JSON文件
- 客户端组件: 使用fetch或动态import

**计算逻辑**:
```
好评率 = (positive / (positive + negative)) * 100
好评数 = positive
差评数 = negative
销量区间 = owners
当前价格 = price
```

---

## 步骤3: 图表可视化设计

**图表库**: Recharts (已在TODO-1安装)

**图表类型**: `RadialBarChart` (圆环仪表盘)

**视觉设计**:
1. **圆环仪表盘**:
   - 内径: 60
   - 外径: 100
   - 起始角: 90°
   - 结束角: -270°
   - 颜色渐变: 根据好评率动态调整
     - >80%: 翠绿 (#25AB2B)
     - 60-80%: 黄绿渐变
     - <60%: 橙红渐变

2. **文字指标**:
   - 中心显示: 好评率百分比(大号字体)
   - 下方显示: 好评数/差评数
   - 右侧显示: 预估销量、价格

---

## 步骤4: 组件样式设计

**容器样式**:
- 复用现有卡片样式: `bg-gray-800/50 backdrop-blur-sm`
- 边框: `border border-gray-700`
- 圆角: `rounded-lg`
- 内边距: `p-6`

**布局结构**:
```
<section className="mb-16">
  <h2>Steam 玩家热度</h2>
  <div className="grid md:grid-cols-2 gap-6">
    <div>// 左侧: 圆环仪表盘</div>
    <div>// 右侧: 文字指标</div>
  </div>
</section>
```

**文字样式**:
- 标题: `text-3xl font-bold text-white`
- 百分比: `text-5xl font-bold text-[#25AB2B]`
- 指标标签: `text-sm text-gray-400`
- 指标数值: `text-xl text-white`

---

## 步骤5: 响应式适配

**断点适配**:
- Mobile (<768px): 单列布局，仪表盘居中
- Tablet (768-1024px): 双列布局，仪表盘左对齐
- Desktop (>1024px): 双列布局，间距加大

**图表尺寸**:
- Mobile: 200×200px
- Tablet/Desktop: 260×260px

---

## 步骤6: 性能优化

**优化策略**:
1. **静态数据**: steamspy.json在构建时生成，无需客户端请求
2. **懒加载**: 使用React.lazy延迟加载图表库
3. **缓存**: 数据24小时更新一次(通过prebuild钩子)
4. **轻量化**: Recharts仅导入需要的组件

**加载状态**:
- 显示骨架屏(skeleton)
- 数据加载失败时显示降级UI

---

## 步骤7: 插入到首页

**文件路径**: `src/app/page.tsx`

**插入位置**: Hero Section后、"Where to Buy"区块前

**插入代码结构**:
```tsx
{/* Hero Section */}
<section>...</section>

{/* 新增: Steam热度仪表盘 */}
<SteamGauge />

{/* Where to Buy */}
<section>...</section>
```

**间距调整**:
- 上边距: `mb-16` (与其他section一致)
- 容器: 复用现有container

---

## 步骤8: 数据更新说明

**更新时机**: 每次 `npm run build` 时自动更新

**更新流程**:
1. `package.json` 的 `prebuild` 钩子触发
2. 执行 `fetch-steam.js` 脚本
3. 请求SteamSpy API
4. 保存最新数据到 `steamspy.json`
5. Next.js构建读取最新数据

**手动更新**:
```bash
npm run fetch:steam
```

---

## 步骤9: 验收标准

**功能验收**:
- [ ] 组件成功读取steamspy.json数据
- [ ] 好评率计算正确
- [ ] 圆环仪表盘正常显示
- [ ] 文字指标显示完整
- [ ] 颜色根据好评率动态调整

**样式验收**:
- [ ] 卡片样式与现有组件一致
- [ ] 响应式布局正常
- [ ] 暗色主题适配
- [ ] 字体大小合理

**性能验收**:
- [ ] 组件加载速度快(<500ms)
- [ ] 无控制台警告/错误
- [ ] 图表渲染流畅

---

# TODO-4: 新增意向树查询器组件

## 📋 借鉴文档和资源

- **`需求总览.md`** - 意向树快速查询器功能设计、用户场景
- **`功能实现.md`** - 数据结构、Fuse.js配置、搜索逻辑
- **`前置准备.md`** - intentions.json数据格式、数据获取方式

---

## 任务目标

创建独立的意向树查询器组件，支持模糊搜索、NPC筛选、Loop筛选，帮助玩家快速查找任务攻略。

**插入位置**: "Core Intentions Reference"区块后

---

## 步骤1: 创建组件文件

**文件路径**: `src/components/rue-valley/IntentionSearch.tsx`

**组件功能**:
1. 加载 `public/data/intentions.json` 数据
2. 使用Fuse.js实现模糊搜索
3. 提供筛选器(NPC、Loop编号)
4. 显示搜索结果列表
5. 支持复制攻略文本

**组件结构**:
```typescript
'use client'
import Fuse from 'fuse.js'

export function IntentionSearch() {
  // 1. 加载intentions数据
  // 2. 初始化Fuse实例
  // 3. 处理搜索/筛选逻辑
  // 4. 渲染搜索框、筛选器、结果列表
  return (...)
}
```

---

## 步骤2: 数据加载和Fuse配置

**数据源**: `public/data/intentions.json`

**数据结构**:
```json
[
  {
    "intention": "Fix Vending Machine",
    "loop": 3,
    "npc": "Robin",
    "prerequisite": "Get Screwdriver from Ben",
    "reward": "+1 Inspiration"
  }
]
```

**Fuse.js配置**:
```typescript
const fuse = new Fuse(intentions, {
  keys: ['intention', 'npc', 'prerequisite'],
  threshold: 0.3,  // 模糊匹配度(0-1)
  minMatchCharLength: 2,
  ignoreLocation: true
})
```

**搜索字段**:
- `intention`: 意向名称(主要)
- `npc`: NPC名称
- `prerequisite`: 前置条件

---

## 步骤3: 搜索和筛选逻辑

**搜索功能**:
```typescript
function onSearch(text: string) {
  if (text.length < 2) {
    setResults(intentions) // 显示全部
    return
  }
  const searchResults = fuse.search(text)
  setResults(searchResults.map(r => r.item))
}
```

**NPC筛选**:
```typescript
// 提取所有唯一NPC
const npcs = [...new Set(intentions.map(i => i.npc))]

// 筛选逻辑
function filterByNPC(npc: string) {
  setResults(intentions.filter(i => i.npc === npc))
}
```

**Loop筛选**:
```typescript
// 提取所有Loop编号(1-20)
const loops = [...new Set(intentions.map(i => i.loop))].sort()

// 筛选逻辑
function filterByLoop(loop: number) {
  setResults(intentions.filter(i => i.loop === loop))
}
```

---

## 步骤4: UI组件设计

**整体布局**:
```
┌─────────────────────────────────────┐
│ 标题: "意向树快速查询器"                │
├─────────────────────────────────────┤
│ [搜索框]  [NPC筛选] [Loop筛选] [重置]  │
├─────────────────────────────────────┤
│ 搜索结果: 共X条                       │
│                                     │
│ ┌─────────────────────────────┐    │
│ │ Intention名称                │    │
│ │ Loop #X · NPC: XXX          │    │
│ │ 前置: XXX                    │    │
│ │ 奖励: XXX          [复制]    │    │
│ └─────────────────────────────┘    │
│ ...更多结果                         │
└─────────────────────────────────────┘
```

**搜索框样式**:
- 输入框: `border border-gray-600 rounded-md px-4 py-2`
- 占位符: "搜索意向、NPC或前置条件..."
- 实时搜索(onChange)

**筛选器样式**:
- 下拉选择器: `<select>` 或自定义dropdown
- NPC筛选: 列出所有NPC名称
- Loop筛选: 1-20循环编号

**结果卡片样式**:
- 复用现有卡片: `bg-gray-800/50 border border-gray-700 rounded-lg p-4`
- 意向名称: `text-lg font-semibold text-white`
- 元数据: `text-sm text-gray-400`
- 复制按钮: `text-[#25AB2B] hover:text-[#1E8923]`

---

## 步骤5: 复制功能实现

**复制内容格式**:
```
【意向】Fix Vending Machine
【Loop】3
【NPC】Robin
【前置】Get Screwdriver from Ben
【奖励】+1 Inspiration
```

**复制逻辑**:
```typescript
function copyIntention(intention) {
  const text = `
【意向】${intention.intention}
【Loop】${intention.loop}
【NPC】${intention.npc}
【前置】${intention.prerequisite}
【奖励】${intention.reward}
  `.trim()

  navigator.clipboard.writeText(text)
  // 显示复制成功提示
}
```

**提示反馈**:
- 复制成功: 显示Toast提示"已复制到剪贴板"
- 复制失败: 降级方案(显示纯文本)

---

## 步骤6: 性能优化

**优化策略**:
1. **防抖搜索**: 输入延迟300ms后触发搜索
2. **虚拟滚动**: 结果超过50条时使用虚拟列表
3. **记忆化**: 使用useMemo缓存筛选结果
4. **懒加载**: 首屏不加载，滚动到可视区域时加载

**防抖实现**:
```typescript
const debouncedSearch = useMemo(
  () => debounce(onSearch, 300),
  []
)
```

---

## 步骤7: 响应式适配

**断点适配**:
- Mobile: 筛选器堆叠排列，搜索框全宽
- Tablet/Desktop: 筛选器水平排列

**结果列表**:
- Mobile: 单列
- Tablet: 单列
- Desktop: 双列(grid-cols-2)

---

## 步骤8: 插入到首页

**文件路径**: `src/app/page.tsx`

**插入位置**: "Core Intentions Reference"区块后

**插入代码结构**:
```tsx
{/* Core Intentions Reference */}
<section>...</section>

{/* 新增: 意向树查询器 */}
<IntentionSearch />

{/* Latest Articles */}
<section>...</section>
```

---

## 步骤9: 无障碍支持

**可访问性优化**:
- 搜索框: `aria-label="搜索意向"`
- 筛选器: `aria-label="按NPC筛选"`、`aria-label="按Loop筛选"`
- 结果数量: `aria-live="polite"` 实时播报
- 键盘导航: 支持Tab、Enter操作
- 复制按钮: `aria-label="复制到剪贴板"`

---

## 步骤10: 验收标准

**功能验收**:
- [ ] 组件成功加载intentions.json数据
- [ ] 搜索框实时搜索正常
- [ ] NPC筛选正常
- [ ] Loop筛选正常
- [ ] 复制功能正常
- [ ] 组合筛选(搜索+NPC+Loop)正常

**样式验收**:
- [ ] 卡片样式与现有组件一致
- [ ] 搜索框和筛选器样式统一
- [ ] 响应式布局正常
- [ ] 暗色主题适配

**性能验收**:
- [ ] 搜索响应速度<100ms
- [ ] 大数据量(200+条)不卡顿
- [ ] 无内存泄漏

**用户体验验收**:
- [ ] 搜索结果准确
- [ ] 无搜索结果时显示友好提示
- [ ] 复制成功有明确反馈
- [ ] 键盘操作流畅

---

# TODO-5: 新增YouTube视频和Reddit讨论区

## 📋 借鉴文档和资源

- **`首页其余部分的实现.md`** - YouTube视频列表(3个视频ID)、Reddit讨论链接(4个帖子)、布局设计
- **`前置准备.md`** - lite-youtube-embed库说明、视频缩略图URL格式

---

## 任务目标

创建两个新区块：YouTube精选视频区和Reddit热门讨论区，使用轻量级嵌入方式优化性能。

**插入位置**: "Latest Articles"区块和"FAQ"区块之间

---

## 步骤1: 创建YouTube视频区组件

**文件路径**: `src/components/rue-valley/VideoSection.tsx`

**组件功能**:
1. 加载 `src/data/videos.ts` 配置
2. 使用 `lite-youtube-embed` 库嵌入视频
3. 显示视频标题和描述

**组件结构**:
```typescript
import 'lite-youtube-embed/src/lite-yt-embed.css'

export function VideoSection() {
  // 导入featuredVideos数据
  // 渲染视频卡片网格
  return (...)
}
```

---

## 步骤2: lite-youtube-embed配置

**库说明**:
- 轻量级YouTube嵌入组件
- 首屏仅加载缩略图(约1KB)
- 点击后才加载完整iframe(减少200KB+)

**使用方式**:
```html
<lite-youtube
  videoid="ydirmet86Uk"
  style={{ aspectRatio: '16/9' }}
/>
```

**视频数据** (来自 `src/data/videos.ts`):
```typescript
const featuredVideos = [
  {
    id: 'ydirmet86Uk',
    title: '官方玩法预告片',
    description: '官方 2 分钟预告，速览玩法要素'
  },
  {
    id: 'IHOpJyGxSDc',
    title: '深度评测 (20 min)',
    description: 'Review Impressions - 媒体深度评测'
  },
  {
    id: 'kYxxTWN5N1c',
    title: '全流程无解说',
    description: 'Complete Gameplay Walkthrough'
  }
]
```

---

## 步骤3: 视频区布局设计

**区块标题**: "🎬 精选视频"

**布局结构**:
```
grid grid-cols-1 md:grid-cols-3 gap-6
```

**卡片样式**:
- 视频容器: `aspect-ratio: 16/9` 保持比例
- 标题: `text-lg font-semibold text-white mt-3`
- 描述: `text-sm text-gray-400 mt-1`
- 卡片背景: 保持透明，仅添加轻微hover效果

**响应式**:
- Mobile: 单列，视频全宽
- Tablet: 双列
- Desktop: 三列

---

## 步骤4: 创建Reddit讨论区组件

**文件路径**: `src/components/rue-valley/RedditSection.tsx`

**组件功能**:
1. 加载 `src/data/reddit.ts` 配置
2. 显示Reddit帖子列表
3. 外链新标签打开

**组件结构**:
```typescript
export function RedditSection() {
  // 导入redditPosts数据
  // 渲染列表
  return (...)
}
```

---

## 步骤5: Reddit讨论区布局设计

**区块标题**: "💬 社区热门讨论"

**布局结构**:
```
<ul className="space-y-4">
  {redditPosts.map(post => (
    <li className="...">
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        ...
      </a>
    </li>
  ))}
</ul>
```

**列表样式**:
- 列表项: `bg-gray-800/30 border-l-4 border-[#7D12FF] px-4 py-3 rounded`
- 标题: `text-white font-medium`
- 统计信息: `text-sm text-gray-400`
- hover效果: `hover:bg-gray-800/50 transition-colors`

**Reddit数据** (来自 `src/data/reddit.ts`):
```typescript
const redditPosts = [
  {
    title: '⚠️ Soft-lock？进度卡死解决帖',
    stats: '200+ 赞',
    url: 'https://www.reddit.com/r/RueValleyGame/comments/1owazke/softlock/',
    category: 'technical'
  },
  // ...共4个帖子
]
```

---

## 步骤6: 双列布局整合

**整体布局**: 视频区和讨论区并排显示

**布局代码结构**:
```tsx
<section className="mb-16">
  <div className="grid md:grid-cols-2 gap-8">
    {/* 左列: YouTube视频 */}
    <div>
      <h3 className="text-2xl font-bold mb-6">🎬 精选视频</h3>
      <VideoSection />
    </div>

    {/* 右列: Reddit讨论 */}
    <div>
      <h3 className="text-2xl font-bold mb-6">💬 社区热门讨论</h3>
      <RedditSection />
    </div>
  </div>
</section>
```

**响应式调整**:
- Mobile (<768px): 堆叠布局，视频区在上
- Tablet/Desktop: 双列布局

---

## 步骤7: 性能优化

**YouTube优化**:
1. 使用lite-youtube-embed (仅1KB JS)
2. 懒加载: 仅可视区域内加载
3. 缩略图预加载(可选)

**Reddit链接优化**:
1. `rel="noopener noreferrer"` 防止安全风险
2. `target="_blank"` 新标签打开
3. 无额外JS依赖

**首屏性能**:
- YouTube区: 仅CSS + 缩略图图片
- Reddit区: 纯HTML + CSS
- 总体积: <10KB (不含图片)

---

## 步骤8: 插入到首页

**文件路径**: `src/app/page.tsx`

**插入位置**: "Latest Articles"区块后、"FAQ"区块前

**插入代码结构**:
```tsx
{/* Latest Articles */}
<section>...</section>

{/* 新增: 视频和社区讨论 */}
<section className="mb-16">
  <div className="grid md:grid-cols-2 gap-8">
    <div>
      <h3>🎬 精选视频</h3>
      <VideoSection />
    </div>
    <div>
      <h3>💬 社区热门讨论</h3>
      <RedditSection />
    </div>
  </div>
</section>

{/* FAQ */}
<section>...</section>
```

---

## 步骤9: 样式一致性检查

**确保样式与现有组件一致**:
- 标题字体: `text-2xl font-bold`
- 卡片背景: `bg-gray-800/50` 或 `bg-gray-800/30`
- 边框: `border border-gray-700` 或 `border-l-4 border-[#7D12FF]`
- 间距: `mb-16` (section间距), `gap-6`/`gap-8` (内部间距)
- hover效果: `transition-colors`, `hover:bg-gray-800/50`

---

## 步骤10: 验收标准

**功能验收**:
- [ ] 3个YouTube视频正常嵌入
- [ ] 视频点击播放正常
- [ ] 4个Reddit链接可点击
- [ ] Reddit链接新标签打开
- [ ] 视频标题和描述显示正确
- [ ] Reddit帖子统计信息显示正确

**样式验收**:
- [ ] 双列布局正常
- [ ] 响应式堆叠正常(mobile)
- [ ] 视频比例16:9正常
- [ ] 卡片样式与现有组件一致
- [ ] hover效果流畅

**性能验收**:
- [ ] 首屏加载快(<2s)
- [ ] lite-youtube组件加载快
- [ ] 无控制台错误

**可访问性验收**:
- [ ] 视频可键盘操作
- [ ] Reddit链接有明确提示(新标签)
- [ ] 屏幕阅读器友好

---

# TODO-6: 批量生成160条SEO内页

## 📋 借鉴文档和资源

- **`rue_valley_seo_matrix.csv`** - 160条关键词及URL映射、参考文章链接
- **`内页url和项目目录设计.md`** - 目录树设计、批量生成方案、MDX模板
- **`前置准备.md`** - 批量生成脚本实现、frontmatter结构

---

## 任务目标

根据SEO矩阵CSV批量生成160条内页MDX文件，建立完整的内容结构和内部链接网络。

---

## 步骤1: 创建目录结构

**目录树**（基于CSV中的URL路径）:
```
src/content/
├── review/                 # 评测（2篇）
│   ├── overall.mdx
│   └── metacritic.mdx
├── buy/                    # 购买（3篇）
│   ├── steam-price.mdx
│   ├── switch.mdx
│   └── discount-history.mdx
├── guide/                  # 攻略（约135篇）
│   ├── gameplay-overview.mdx
│   ├── full-walkthrough.mdx
│   ├── loop-guide.mdx
│   ├── npc-guide.mdx
│   ├── achievements.mdx
│   ├── secrets.mdx
│   ├── tips.mdx
│   └── loops/              # Loop攻略（130篇）
│       ├── loop-1-walkthrough.mdx
│       ├── loop-2-walkthrough.mdx
│       └── ... loop-20-walkthrough.mdx
├── technical/              # 技术（5篇）
│   ├── system-requirements.mdx
│   ├── graphics-settings.mdx
│   ├── controller-support.mdx
│   └── steam-deck-performance.mdx
├── news/                   # 新闻（3篇）
│   ├── release-date.mdx
│   ├── patch-notes.mdx
│   └── bug-fixes.mdx
├── info/                   # 信息（7篇）
│   ├── dlc.mdx
│   ├── characters.mdx
│   ├── endings.mdx
│   ├── best-choices.mdx
│   ├── soundtrack.mdx
│   ├── mods.mdx
│   └── language-support.mdx
├── community/              # 社区（1篇）
│   └── reddit-highlights.mdx
└── download/               # 下载（3篇）
    ├── crack-info.mdx
    ├── torrent-info.mdx
    └── save-file-location.mdx
```

**创建命令**: 使用脚本批量创建所有目录

---

## 步骤2: 创建MDX生成脚本

**文件路径**: `scripts/generate-mdx-from-csv.js`

**脚本功能**:
1. 读取 `rue_valley_seo_matrix.csv`
2. 解析每行数据(priority, keyword, url, reference)
3. 根据URL创建目录和MDX文件
4. 生成frontmatter和内容框架

**脚本逻辑**:
```javascript
// 1. 读取CSV
const csvData = readCSV('tools/demand/rue_valley_seo_matrix.csv')

// 2. 遍历每行
csvData.forEach(row => {
  // 3. 解析URL路径
  const filePath = `src/content${row.url}.mdx`

  // 4. 创建目录
  createDirectoryRecursive(filePath)

  // 5. 生成MDX内容
  const mdxContent = generateMDX(row)

  // 6. 写入文件
  fs.writeFileSync(filePath, mdxContent)
})
```

---

## 步骤3: MDX模板设计

**Frontmatter结构**:
```yaml
---
title: "{keyword标题化}"
description: "Comprehensive guide about {keyword}"
keywords: "{keyword}, Rue Valley, time loop RPG"
canonical: "{url}"
date: "{当前日期}"
reference: "{参考文章URL}"
priority: {优先级数字}
category: "{类别}"
---
```

**内容框架**（根据类别自动生成）:

**Loop攻略模板**:
```markdown
# Loop {N} Walkthrough

## Overview
- Loop Number: {N}
- Key Objectives: [待填充]
- Important NPCs: [待填充]

## Step-by-Step Guide

### 1. [任务名称]
[攻略步骤待填充]

### 2. [任务名称]
[攻略步骤待填充]

## Tips & Strategies
- [技巧1]
- [技巧2]

## Common Issues
- [问题1及解决方案]
- [问题2及解决方案]

## Rewards
- [奖励列表]

---
*本文参考: [{reference}]({reference})*
```

**评测模板**:
```markdown
# {Keyword} - Rue Valley Review

## Summary
[综述待填充]

## Pros
- [优点1]
- [优点2]

## Cons
- [缺点1]
- [缺点2]

## Verdict
[最终评价待填充]

## External Reviews
- [参考评测链接]

---
*本文参考: [{reference}]({reference})*
```

**购买指南模板**:
```markdown
# {Keyword} - Where to Buy

## Current Price
[价格信息待填充]

## Available Platforms
- Steam
- Nintendo Switch

## Discount History
[折扣历史待填充]

## Purchase Links
- [Steam Store Link]
- [Nintendo Store Link]

---
*本文参考: [{reference}]({reference})*
```

---

## 步骤4: 批量生成执行

**package.json配置**:
```json
{
  "scripts": {
    "generate:mdx": "node scripts/generate-mdx-from-csv.js"
  }
}
```

**执行命令**:
```bash
npm run generate:mdx
```

**生成报告**:
```
✅ 成功生成 160 个MDX文件
   - review: 2篇
   - buy: 3篇
   - guide: 135篇
   - technical: 5篇
   - news: 3篇
   - info: 7篇
   - community: 1篇
   - download: 3篇
```

---

## 步骤5: 配置Next.js动态路由

**目标**: 使所有MDX文件可通过URL访问

**路由结构**: `/[category]/[slug]`

**动态路由文件**: `src/app/[category]/[slug]/page.tsx`

**路由逻辑**:
1. 根据URL参数读取对应MDX文件
2. 解析frontmatter和内容
3. 渲染页面

**MDX配置**:
- 使用 `next-mdx-remote` 或 `@next/mdx`
- 支持frontmatter解析
- 支持自定义组件

---

## 步骤6: 内部链接优化

**相关文章推荐**:
- 在每篇文章底部添加"相关内容"区块
- 推荐规则:
  1. 同类别文章(3篇)
  2. 相关Loop攻略(如Loop 1推荐Loop 2-3)
  3. 相关NPC攻略

**面包屑导航**:
```
首页 › Guide › Loops › Loop 3 Walkthrough
```

**实现方式**:
- 使用现有 `Breadcrumb.tsx` 组件
- 根据URL路径自动生成

---

## 步骤7: SEO优化

**元数据配置** (每个MDX页面):
```typescript
export const metadata = {
  title: frontmatter.title,
  description: frontmatter.description,
  keywords: frontmatter.keywords,
  openGraph: {
    title: frontmatter.title,
    description: frontmatter.description,
    url: `https://ruevalley.org${frontmatter.canonical}`,
    images: ['/images/steam/header.jpg']
  }
}
```

**Sitemap生成**:
- 创建 `public/sitemap.xml`
- 包含所有160条内页URL
- 设置优先级(基于CSV的priority字段)

**Robots.txt**:
```
User-agent: *
Allow: /

Sitemap: https://ruevalley.org/sitemap.xml
```

---

## 步骤8: 内容填充策略

**优先级策略**（基于CSV的priority字段）:

| 优先级 | 范围 | 处理方式 |
|-------|------|---------|
| High | 1-30 | 手动编写高质量原创内容 |
| Medium | 31-80 | AI辅助生成 + 人工审核 |
| Low | 81-160 | 模板框架 + 后期补充 |

**内容来源**:
1. 参考文章链接(CSV的reference字段)
2. 官方攻略和文档
3. Steam社区讨论
4. Reddit热门帖子

**版权注意**:
- 只提取事实性信息
- 用自己的语言重写
- 标注参考来源

---

## 步骤9: 图片资源补充

**每篇文章建议添加**:
1. 特色图片(Steam截图或自定义)
2. 说明性截图(攻略步骤)
3. UI元素截图(界面说明)

**图片存储**:
```
public/images/articles/
├── loop-1/
│   ├── feature.jpg
│   ├── step-1.jpg
│   └── step-2.jpg
├── loop-2/
│   └── ...
└── ...
```

**图片优化**:
- 使用Next.js `<Image>` 组件
- 自动WebP转换
- 懒加载

---

## 步骤10: 验收标准

**文件生成验收**:
- [ ] 160个MDX文件全部生成
- [ ] 目录结构正确
- [ ] frontmatter完整
- [ ] 内容框架存在

**路由验收**:
- [ ] 所有URL可访问(curl测试)
- [ ] 动态路由正常工作
- [ ] 404页面正常

**SEO验收**:
- [ ] 每页meta标签完整
- [ ] sitemap.xml生成成功
- [ ] robots.txt配置正确
- [ ] OpenGraph标签正确

**内容验收**:
- [ ] 高优先级文章(1-30)内容完整
- [ ] 中优先级文章(31-80)框架完整
- [ ] 低优先级文章(81-160)模板存在

**性能验收**:
- [ ] 页面加载速度正常
- [ ] 图片懒加载正常
- [ ] 无404资源

---

# TODO-7: 测试和部署准备

## 📋 借鉴文档和资源

- **`0_需求.md`** - 代码检查规范、浏览器测试要求、部署流程

---

## 任务目标

完成所有功能开发后，进行全面测试、代码检查、构建验证，确保项目可以成功部署到Vercel。

---

## 步骤1: 代码质量检查

**类型检查**:
```bash
npm run typecheck
# 或
npx tsc --noEmit
```

**Lint检查**:
```bash
npm run lint
```

**格式化检查**:
```bash
npm run format
```

**验收标准**:
- [ ] 无TypeScript类型错误
- [ ] 无ESLint警告/错误
- [ ] 代码格式统一

---

## 步骤2: 构建测试

**本地构建**:
```bash
# 清理缓存
rm -rf .next

# 执行构建
npm run build
```

**构建验收**:
- [ ] 构建成功(exit code 0)
- [ ] SteamSpy数据自动拉取成功
- [ ] 所有页面静态化成功
- [ ] 无构建警告

**构建产物检查**:
```bash
ls -la .next/static
ls -la .next/server
```

---

## 步骤3: 本地运行测试

**启动生产模式**:
```bash
npm run build
npm run start
```

**测试端口**: http://localhost:3000

**测试检查清单**:
- [ ] 首页正常显示
- [ ] Header导航正常
- [ ] Footer链接正常
- [ ] Steam热度仪表盘显示
- [ ] 意向树查询器工作
- [ ] YouTube视频可播放
- [ ] Reddit链接可点击
- [ ] SEO内页可访问

---

## 步骤4: URL访问测试

**curl测试所有页面**:

```bash
# 测试首页
curl -I http://localhost:3000/

# 测试主要内页
curl -I http://localhost:3000/review/overall
curl -I http://localhost:3000/buy/steam-price
curl -I http://localhost:3000/guide/gameplay-overview
curl -I http://localhost:3000/guide/loops/loop-1-walkthrough
curl -I http://localhost:3000/technical/system-requirements

# 批量测试所有URL
cat public/data/seo-matrix-full.json | jq -r '.[].url' | while read url; do
  echo "Testing: $url"
  curl -I "http://localhost:3000$url" | head -1
done
```

**验收标准**:
- [ ] 所有URL返回200状态码
- [ ] 无404错误
- [ ] 无重定向循环

---

## 步骤5: 浏览器功能测试

**使用MCP browser工具测试**:

**测试脚本**:
```javascript
// 1. 打开首页
await page.goto('http://localhost:3000')

// 2. 测试Hero区
await page.waitForSelector('h1')
const title = await page.$eval('h1', el => el.textContent)
assert(title.includes('Rue Valley'))

// 3. 测试Steam仪表盘
await page.waitForSelector('[data-testid="steam-gauge"]')

// 4. 测试意向树查询器
await page.fill('input[placeholder*="搜索"]', 'Fix')
await page.waitForSelector('.search-result')

// 5. 测试YouTube视频
await page.click('lite-youtube')
await page.waitForSelector('iframe')

// 6. 测试导航
await page.click('a[href="/guide/gameplay-overview"]')
await page.waitForNavigation()
```

**测试检查清单**:
- [ ] 所有交互元素可点击
- [ ] 搜索功能正常
- [ ] 视频可播放
- [ ] 表单可提交
- [ ] 复制功能正常

---

## 步骤6: 响应式测试

**测试断点**:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1440px

**测试内容**:
- [ ] 导航菜单响应式(汉堡菜单)
- [ ] Hero区双列变单列
- [ ] 卡片网格正确堆叠
- [ ] 文字大小合理
- [ ] 图片不溢出

**浏览器兼容性**:
- [ ] Chrome/Edge
- [ ] Safari
- [ ] Firefox

---

## 步骤7: 性能测试

**Lighthouse检查**:
```bash
# 使用Chrome DevTools Lighthouse
# 或使用CLI
npx lighthouse http://localhost:3000 --view
```

**性能目标**:
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >95

**核心指标**:
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

---

## 步骤8: 环境变量配置（Vercel）

**Vercel控制台配置**:

进入项目设置 → Environment Variables → 添加：

```
NEXT_PUBLIC_GA_ID=G-K48QCTT1WD
NEXT_PUBLIC_CLARITY_ID=u6z6k49ztk
NEXT_PUBLIC_SITE_URL=https://ruevalley.org
NEXT_PUBLIC_SITE_NAME=Rue Valley Portal
NEXT_PUBLIC_STEAM_APP_ID=2126190
```

**验收标准**:
- [ ] 所有环境变量已添加
- [ ] 环境选择正确(Production)

---

## 步骤9: 域名配置

**Vercel域名设置**:

1. 进入项目设置 → Domains
2. 添加自定义域名: `ruevalley.org`
3. 配置DNS记录（在域名注册商）:
   - Type: A
   - Name: @
   - Value: 76.76.21.21 (Vercel IP)
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com

4. 等待DNS生效(最多48小时)

**验收标准**:
- [ ] 域名解析正确
- [ ] HTTPS证书自动配置
- [ ] www重定向到根域名

---

## 步骤10: 部署和最终验证

**部署方式**: 推送到GitHub，Vercel自动部署

**部署检查清单**:
- [ ] 构建成功
- [ ] 所有环境变量生效
- [ ] Steam数据自动拉取
- [ ] 域名访问正常
- [ ] HTTPS正常

**生产环境测试**:
```bash
# 测试生产URL
curl -I https://ruevalley.org/
curl -I https://ruevalley.org/guide/loops/loop-1-walkthrough

# 检查Analytics
# 访问 https://analytics.google.com/
# 验证数据收集正常

# 检查Clarity
# 访问 https://clarity.microsoft.com/
# 验证会话记录正常
```

**最终验收**:
- [ ] 首页完全正常
- [ ] 所有新功能正常
- [ ] SEO内页全部可访问
- [ ] 性能指标达标
- [ ] Analytics数据收集正常
- [ ] 无控制台错误

---

## 🎉 重构完成检查清单

完成所有TODO后，请确认：

### 基础配置
- [ ] 环境变量配置完成
- [ ] 所有依赖安装成功
- [ ] 数据文件准备齐全
- [ ] 图片资源下载完成

### 首页改造
- [ ] 所有文案替换为Rue Valley主题
- [ ] 所有链接指向正确
- [ ] 颜色主题调整为紫绿搭配
- [ ] UI结构完全保留

### 新增功能
- [ ] Steam热度仪表盘正常工作
- [ ] 意向树查询器功能完整
- [ ] YouTube视频区正常显示
- [ ] Reddit讨论区链接正常

### SEO内页
- [ ] 160条MDX文件全部生成
- [ ] 所有URL可访问
- [ ] meta标签完整
- [ ] sitemap生成成功

### 测试部署
- [ ] 代码质量检查通过
- [ ] 构建测试成功
- [ ] URL访问测试通过
- [ ] 浏览器功能测试通过
- [ ] 性能测试达标
- [ ] Vercel部署成功
- [ ] 域名配置完成

---

## 📚 后续优化建议

完成重构后，可以考虑：

1. **内容完善**:
   - 补充高优先级文章内容(1-30)
   - 添加文章配图
   - 补充完整的intentions数据(200+条)

2. **功能增强**:
   - 添加用户评论系统
- 实现内容搜索功能
   - 添加夜间模式切换
   - 支持多语言(英语、中文)

3. **性能优化**:
   - 图片CDN加速
   - 实现Service Worker缓存
   - 优化首屏加载速度

4. **SEO提升**:
   - 提交sitemap到Google Search Console
   - 建立外部反向链接
   - 定期更新内容

5. **数据分析**:
   - 分析Google Analytics数据
   - 优化高跳出率页面
   - 根据用户行为调整内容

---

**文档版本**: v1.0
**最后更新**: 2025-11-17
**适用项目**: Rue Valley 游戏站重构
