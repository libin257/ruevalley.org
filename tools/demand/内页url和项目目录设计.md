## 快速结论

已为 **Rue Valley** 站点批量生成 **160 条三级关键词内页**（覆盖评测 / 购入 / 引导 / 技术 / 社群等 10 大主题），并按「搜索需求热度 → 优先级」排序，同时映射到 **本地 MDX**-友好的 URL & 目录结构，并为每条关键词配好可借鉴的**优秀外部文章/资源链接**。完整矩阵已打包为 CSV，方便直接导入 Notion、表格或脚本批量生成 MDX 文件。

👉 **[下载完整矩阵 CSV](sandbox:/mnt/data/rue_valley_seo_matrix.csv)**
（含 priority / keyword / url / reference 四列，共 160 行）

---

## 目录树设计（示意）

```
src/content/
├─ review/                 # 站内评测与媒体综述
│  ├─ overall.mdx          # rue-valley-review
│  ├─ metacritic.mdx
│  └─ …
├─ buy/                    # 购买 & 价格
│  ├─ steam-price.mdx
│  ├─ switch.mdx
│  └─ discount-history.mdx
├─ guide/                  # 攻略 / Walkthrough
│  ├─ gameplay-overview.mdx
│  ├─ full-walkthrough.mdx
│  └─ loops/
│     ├─ loop-1-walkthrough.mdx
│     └─ … loop-20-walkthrough.mdx
├─ technical/              # 配置 / 性能 / 补丁
│  ├─ system-requirements.mdx
│  ├─ graphics-settings.mdx
│  └─ …
├─ community/              # 社群热点
│  ├─ reddit-highlights.mdx
│  └─ steam-forums.mdx
├─ download/               # 合法下载 / 存档
│  ├─ crack-info.mdx
│  ├─ torrent-info.mdx
│  └─ save-file-location.mdx
└─ info/                   # 角色 / 世界观等
   ├─ characters.mdx
   └─ endings.mdx
```

> **URL 规则**
>
> * 一级目录即频道：`/guide/`, `/buy/`, `/review/` …
> * 二级 slug 用短横线；Loop 专题统一放 `/guide/loops/loop-{n}-walkthrough`。
> * 纯本地 MDX：便于版本管控，亦可搭配 Next.js `next-mdx-remote` 按需静态化。

---

## 如何批量生成 MDX

```bash
# node scripts/generate-mdx.js
csv = fs.readFileSync('rue_valley_seo_matrix.csv', 'utf8')
for each row:
  dir = 'src/content' + row.url.replace('/','/')
  fs.mkdirpSync(dir); fs.writeFileSync(`${dir}.mdx`, frontMatter(row))
```

* **frontMatter** 建议包含：`title`, `description`, `keywords`, `canonical`, `date`, `cover`.
* 参考链接放在文末 “🔗 Further Reading” 区域；图片用远程 `![alt](url)` 或本地 `/public/images/...`.

---

## 关键词矩阵预览（Top 30）

| #  | 关键词                            | 内页 URL                         | 参考文章                              |
| -- | ------------------------------ | ------------------------------ | --------------------------------- |
| 1  | rue valley review              | /review/overall                | PC Gamer 专评 ([PC Gamer][1])       |
| 2  | rue valley release date        | /news/release-date             | Steam 商店页 ([Steam Store][2])      |
| 3  | rue valley price               | /buy/steam-price               | SteamDB 价格历史 ([SteamDB][3])       |
| 4  | rue valley metacritic          | /review/metacritic             | Metacritic 条目 ([Metacritic][4])   |
| 5  | rue valley switch              | /buy/switch                    | 任天堂官方页 ([Nintendo][5])            |
| 6  | rue valley gameplay            | /guide/gameplay-overview       | The Gamer 评测 ([The Gamer][6])     |
| 7  | rue valley walkthrough         | /guide/full-walkthrough        | 官方站 Walkthrough ([Rue Valley][7]) |
| 8  | rue valley reddit              | /community/reddit-highlights   | Reddit 讨论帖 ([Reddit][8])          |
| 9  | rue valley system requirements | /technical/system-requirements | SysRqmts 页面 ([SysRqMts][9])       |
| 10 | rue valley patch notes         | /news/patch-notes              | Steam 更新日志 ([Steam Store][2])     |
| …  | …                              | …                              | …                                 |

*(其余 130 条请在下载的 CSV 中查看)*

---

## 内链 & 面包屑策略

1. **面包屑**：`首页 › Guide › Loops › Loop 3 Walkthrough`
2. **顶部导航**：Guide / Review / Buy / Technical / Community / Download / Info
3. **同级推荐**：文章尾部列出“相关内页”→ 同目录同主题 3-5 篇，带简短描述。
4. **上下级递归**：频道页自动汇总下级 slug 列表，生成 sitemap-style markdown，利于 Google 发现。

---

## 外链规划

* 每篇内页正文第 1 段末尾加 **“> 本文参考：xxx”** 出站链接（1-2 条），稳健导出权重。
* 主站关联 Twitter / Reddit 账号做 **UGC 嵌入卡片**，提升 E-E-A-T。

---

## 下一步建议

1. **脚本化产出**：用 CSV → MDX 的脚本一次性生成骨架；后续可分批填充正文或 AI-Assist。
2. **批量外链**：发布到 Medium、知乎专栏（中文）与 itch.io Devlog，同步引用回站内对应页。
3. **观测成效**：用 Search Console「网页 → 着陆页」监控三级词曝光；优先继续扩写有展现却点击率低的页。

借助这套 **150+ 内页矩阵 + 树状目录 + 本地 MDX** 流程，你的新站将迅速覆盖 Rue Valley 长尾检索面，配合合理内链与外链，权重自然累积，后续再冲主关键词也会更从容。祝早日霸榜 SERP!

[1]: https://www.pcgamer.com/games/rpg/rue-valley-review/?utm_source=chatgpt.com "Rue Valley review"
[2]: https://store.steampowered.com/app/2126190/Rue_Valley/?utm_source=chatgpt.com "Save 10% on Rue Valley on Steam"
[3]: https://steamdb.info/app/2126190/?utm_source=chatgpt.com "Rue Valley Price history"
[4]: https://www.metacritic.com/game/rue-valley/?utm_source=chatgpt.com "Rue Valley Reviews"
[5]: https://www.nintendo.com/us/store/products/rue-valley-switch/?srsltid=AfmBOoqn_t4ziomXqkxCVr5kWXJruC1oRJS-rEhkt5B1EPkZfVy9QLlN&utm_source=chatgpt.com "Rue Valley for Nintendo Switch - Nintendo Official Site"
[6]: https://www.thegamer.com/rue-valley-review/?utm_source=chatgpt.com "Rue Valley Review: Time Loop De Loop"
[7]: https://ruevalley.com/?utm_source=chatgpt.com "Rue Valley"
[8]: https://www.reddit.com/r/RueValleyGame/comments/1owhg8u/no_spoilers_very_disappointed_with_the_game/?utm_source=chatgpt.com "[No spoilers] Very disappointed with the game"
[9]: https://sysrqmts.com/games/rue-valley?utm_source=chatgpt.com "Can I Run Rue Valley on My PC?"
