# Rue Valley - Complete Guide & Walkthrough Portal

> Your ultimate resource for the time loop RPG *Rue Valley* - Complete walkthrough, character guides, intention tree search, and community insights.

🌐 **Live Site**: [https://ruevalley.org](https://ruevalley.org)

---

## 📖 About This Project

Rue Valley Portal is a comprehensive fan website dedicated to helping players navigate the complex time loop mechanics of *Rue Valley*, the narrative RPG by Emotional Mecha. The site features:

- ✅ **Complete Walkthrough** - Step-by-step guide for all 47-minute loops
- ✅ **Intention Tree Search** - Fuzzy search for all intention tasks with Loop/NPC filtering
- ✅ **Steam Heatmap Dashboard** - Real-time player statistics and review metrics
- ✅ **Character Profiles** - Psychological analysis of Eugene, Dr. Finck, Anitta, and more
- ✅ **160+ SEO-optimized guides** - Covering every aspect of the game
- ✅ **Community Hub** - Curated YouTube videos and Reddit discussions
- ✅ **Price Tracking** - Steam and Nintendo Switch pricing information

---

## 🏗️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Data Visualization**: Recharts
- **Search**: Fuse.js (fuzzy search)
- **Video Embeds**: lite-youtube-embed
- **Content**: MDX + gray-matter
- **Deployment**: Vercel

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ruevalley.org.git
cd ruevalley.org

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the site.

### Build for Production

```bash
# Build the site
npm run build

# Start production server
npm run start
```

---

## 📂 Project Structure

```
├── public/
│   ├── data/
│   │   ├── steamspy.json          # Auto-generated Steam statistics
│   │   └── intentions.json         # Intention tree data
│   └── images/                     # Static images
├── src/
│   ├── app/
│   │   ├── page.tsx                # Homepage
│   │   ├── [...slug]/page.tsx      # Dynamic MDX page routes
│   │   └── sitemap.xml/route.ts    # Dynamic sitemap generator
│   ├── components/
│   │   ├── Header.tsx              # Site navigation
│   │   ├── Footer.tsx              # Site footer
│   │   └── rue-valley/             # Rue Valley-specific components
│   │       ├── SteamGauge.tsx      # Steam heatmap dashboard
│   │       ├── IntentionSearch.tsx # Intention tree search tool
│   │       ├── VideoSection.tsx    # YouTube video embeds
│   │       └── RedditSection.tsx   # Reddit discussions
│   ├── content/                    # 160+ MDX content files
│   │   ├── review/
│   │   ├── buy/
│   │   ├── guide/
│   │   ├── technical/
│   │   ├── community/
│   │   └── info/
│   ├── data/
│   │   ├── videos.ts               # YouTube video data
│   │   └── reddit.ts               # Reddit post data
│   └── types/                      # TypeScript type definitions
├── scripts/
│   ├── fetch-steam.js              # SteamSpy API data fetcher
│   ├── csv-to-json.js              # SEO matrix processor
│   └── generate-mdx-from-csv.js    # MDX file generator
└── tools/
    └── demand/                      # Project requirements & design docs
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev                  # Start dev server with Turbopack
npm run lint                 # Run ESLint + TypeScript checks
npm run format               # Format code with Biome

# Production
npm run build                # Build for production (includes prebuild)
npm run start                # Start production server
npm run prebuild             # Fetch Steam data before build

# Data Generation
npm run fetch:steam          # Fetch latest Steam statistics
npm run csv:json             # Convert SEO matrix CSV to JSON
npm run generate:mdx         # Generate 160+ MDX pages from CSV
```

---

## 🎨 Key Features

### 1. **Steam Heatmap Dashboard**

Real-time visualization of:
- Player review percentage (good vs. bad)
- Estimated player count
- Current Steam price
- Data freshness indicator

Uses SteamSpy API with automatic fetching during build time.

### 2. **Intention Tree Search**

Interactive search tool with:
- Fuzzy search across intention names, NPCs, prerequisites, and rewards
- Loop number filtering (Loop 1-20)
- NPC-based filtering
- One-click copy-to-clipboard functionality

Powered by Fuse.js with 300ms search delay for optimal performance.

### 3. **160+ SEO-Optimized Pages**

Automatically generated MDX pages covering:
- Complete loop-by-loop walkthroughs
- Character guides and endings
- Technical specs and system requirements
- Purchase guides and price history
- Bug fixes and patch notes

Each page includes:
- Structured frontmatter (title, description, keywords)
- Breadcrumb navigation
- Related article recommendations
- External reference links

### 4. **Dynamic Sitemap**

Automatically generates `sitemap.xml` with all 160+ pages, optimized for search engines.

---

## 📊 Data Sources

- **Steam Statistics**: [SteamSpy API](https://steamspy.com/)
- **Walkthrough Data**: Scraped from [IntoIndieGames](https://intoindiegames.com/walkthrough-hub/rue-valley-complete-walkthrough-all-tasks-and-intentions/)
- **Community Content**: Curated from Reddit r/RueValleyGame
- **Video Content**: Official trailers and community reviews from YouTube

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow the existing code style (enforced by Biome)
2. Ensure TypeScript types are properly defined
3. Test builds locally before submitting PR
4. Update documentation for new features

---

## 📝 License

This project is a fan-made resource and is not officially affiliated with Emotional Mecha or the creators of Rue Valley. All game-related content belongs to its respective owners.

The codebase itself is licensed under MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Emotional Mecha** - For creating the amazing game Rue Valley
- **IntoIndieGames** - For the comprehensive walkthrough data
- **Reddit Community** - For valuable discussions and soft-lock solutions
- **SteamSpy** - For providing public Steam statistics API

---

## 🔗 Links

- **Live Site**: [https://ruevalley.org](https://ruevalley.org)
- **Steam Store**: [Rue Valley on Steam](https://store.steampowered.com/app/2126190/Rue_Valley/)
- **Official Game**: [Rue Valley Website](https://ruevalley.com/)
- **Reddit Community**: [r/RueValleyGame](https://www.reddit.com/r/RueValleyGame/)

---

## 📧 Contact

For questions, suggestions, or bug reports, please:
- Open an issue on GitHub
- Visit our [Reddit community](https://www.reddit.com/r/RueValleyGame/)

---

*Built with ❤️ for the Rue Valley community*
