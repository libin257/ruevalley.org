# Game Website Template Usage Guide

This document explains how to adapt the Rue Valley website template for your own game.

## 📋 Table of Contents

1. [Quick Start Checklist](#quick-start-checklist)
2. [Project Structure](#project-structure)
3. [Step-by-Step Customization](#step-by-step-customization)
4. [Component Configuration](#component-configuration)
5. [Content Management](#content-management)
6. [Styling & Branding](#styling--branding)
7. [Deployment](#deployment)

---

## 🚀 Quick Start Checklist

Before you begin, gather the following information about your game:

- [ ] Game name
- [ ] Game tagline/slogan
- [ ] Steam App ID (if applicable)
- [ ] Primary brand color (HEX code)
- [ ] Background image/hero image
- [ ] Game banner/screenshot
- [ ] Social media links
- [ ] YouTube video IDs
- [ ] Reddit community links

---

## 📁 Project Structure

```
your-game-website/
├── public/
│   ├── images/
│   │   ├── backgrounds/    # Hero background image
│   │   ├── steam/          # Steam-related images
│   │   └── youtube/        # YouTube thumbnails
│   └── data/
│       ├── intentions.json # Game-specific data (optional)
│       └── steamspy.json   # Auto-generated Steam data
├── src/
│   ├── app/
│   │   ├── page.tsx        # Homepage - REPLACE CONTENT
│   │   ├── layout.tsx      # Site metadata - UPDATE
│   │   └── [categories]/   # Category pages - KEEP STRUCTURE
│   ├── components/
│   │   ├── Header.tsx      # Navigation - UPDATE GAME NAME
│   │   ├── Footer.tsx      # Footer - UPDATE LINKS
│   │   └── rue-valley/     # RENAME THIS FOLDER
│   ├── content/            # All MDX articles - REPLACE
│   └── data/
│       ├── videos.ts       # YouTube videos - REPLACE
│       └── reddit.ts       # Reddit posts - REPLACE
├── scripts/
│   └── fetch-steam.js      # UPDATE STEAM_APP_ID
└── package.json            # UPDATE PROJECT NAME
```

---

## 🔧 Step-by-Step Customization

### Step 1: Update Project Metadata

#### 1.1 `package.json`
```json
{
  "name": "your-game-website",  // Change this
  "version": "0.1.0",
  "description": "Your Game guide and resource portal"
}
```

#### 1.2 `src/app/layout.tsx`
```tsx
export const metadata: Metadata = {
  title: "Your Game - Complete Guide & Walkthrough Portal",
  description: "Your ultimate resource for [Your Game] - Complete walkthrough, character guides, and community insights.",
}
```

Update background image path:
```tsx
style={{ backgroundImage: 'url(/images/backgrounds/your-hero-bg.jpg)' }}
```

---

### Step 2: Update Homepage Content

#### `src/app/page.tsx`

Replace the hero section:

```tsx
<h1 className="text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-4">
  Your Game Name  {/* Change this */}
</h1>
<h2 className="text-3xl lg:text-4xl text-gray-200 drop-shadow-md mb-4">
  Your Game Tagline  {/* Change this */}
</h2>
<p className="text-xl lg:text-2xl text-gray-300 mb-6">
  Complete Walkthrough, Tips & Guides  {/* Change this */}
</p>
<p className="text-lg text-gray-300 mb-8">
  Describe your game here. What makes it special?  {/* Change this */}
  We provide comprehensive guides to help you master the game.
</p>
```

Update Quick Navigation links (line ~54):
```tsx
const quickLinks = [
  {
    title: "Beginner's Guide",
    subtitle: "Quick Start",  // Customize
    url: "/guide/getting-started"  // Update URL
  },
  // Add 5-6 links relevant to your game
]
```

Update FAQ section (line ~186):
```tsx
const faqs = [
  {
    question: "What is [Your Game]?",
    answer: "Your game description..."
  },
  // Add 3-5 FAQs about your game
]
```

Update Core Features section (line ~92):
```tsx
<div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
  <h3 className="text-xl font-semibold text-white mb-2">Feature 1</h3>
  <p className="text-gray-300 text-sm">
    Describe your game's unique feature
  </p>
</div>
// Add 2-3 core features
```

---

### Step 3: Update Header & Footer

#### `src/components/Header.tsx`

Change game name:
```tsx
<span className="inline-block font-bold text-white drop-shadow-md">
  Your Game  {/* Line 10 */}
</span>
```

Update navigation (optional - you can keep the same structure):
```tsx
<Link href="/guide">Guide</Link>
<Link href="/buy">Buy</Link>
<Link href="/review">Review</Link>
// Keep or modify based on your needs
```

#### `src/components/Footer.tsx`

Update site name:
```tsx
<span className="inline-block font-bold">Your Game Portal</span>  {/* Line 11 */}
```

Update description:
```tsx
<p className="mt-4 text-xs">
  Your ultimate resource for [Your Game] - Complete walkthrough...  {/* Line 14 */}
</p>
```

Update footer quote:
```tsx
<p className="mt-6 text-xs text-gray-400">
  Quote from [Gaming Site]: "Your game review quote"  {/* Line 47 */}
</p>
```

Update copyright:
```tsx
<p className="text-base text-center">
  © 2025 yourgame.com. Game developed by [Studio Name].  {/* Line 53 */}
</p>
```

---

### Step 4: Rename & Update Game-Specific Components

#### Rename folder:
```bash
mv src/components/rue-valley src/components/your-game
```

#### Update imports throughout the project:
```bash
# Find all files importing from rue-valley
grep -r "rue-valley" src/

# Replace in each file:
# FROM: '@/components/rue-valley/...'
# TO:   '@/components/your-game/...'
```

#### 4.1 Remove or Update `SteamGauge.tsx` (Optional)

If your game is not on Steam, delete this component and its usage in `page.tsx`.

If keeping it, update line 87:
```tsx
<h2 className="text-3xl font-bold text-center text-white mb-8">
  Steam Dashboard  {/* Can keep as is */}
</h2>
```

#### 4.2 Update `IntentionSearch.tsx` (Game-Specific Feature)

This component is specific to Rue Valley's "Intention" mechanic.

**Option A: Remove it** (if not applicable)
- Delete `src/components/your-game/IntentionSearch.tsx`
- Remove from `src/app/page.tsx`
- Delete `public/data/intentions.json`

**Option B: Adapt it** for your game's mechanic
- Rename to match your game's feature (e.g., `QuestSearch.tsx`, `SkillTree.tsx`)
- Update titles, labels, and data structure
- Create corresponding JSON data file

#### 4.3 Update `VideoSection.tsx` & `RedditSection.tsx`

These components are generic and can be kept as-is. Only update the data sources.

---

### Step 5: Update Data Files

#### 5.1 `src/data/videos.ts`

Replace with your game's YouTube videos:

```tsx
export const featuredVideos: Video[] = [
  {
    id: 'YOUR_YOUTUBE_VIDEO_ID',  // From URL: youtube.com/watch?v=THIS_PART
    title: 'Official Gameplay Trailer',
    description: 'Official trailer description',
    thumbnail: 'https://img.youtube.com/vi/YOUR_YOUTUBE_VIDEO_ID/maxresdefault.jpg'
  },
  // Add 2-4 videos
]
```

#### 5.2 `src/data/reddit.ts`

Replace with your game's Reddit community:

```tsx
export const redditPosts: RedditPost[] = [
  {
    title: 'Top Community Discussion',
    stats: '300+ upvotes',
    url: 'https://www.reddit.com/r/YourGameSubreddit/...',
    category: 'discussion'
  },
  // Add 3-5 posts
]
```

---

### Step 6: Update Steam Integration

#### `scripts/fetch-steam.js`

Update line 4:
```javascript
const STEAM_APP_ID = 'YOUR_STEAM_APP_ID'  // Find this on your Steam page URL
```

Example: For `https://store.steampowered.com/app/123456/YourGame/`, use `123456`

Test the script:
```bash
npm run fetch:steam
```

If your game is not on Steam, you can:
1. Remove this script
2. Remove the `prebuild` script from `package.json`
3. Delete `SteamGauge` component

---

### Step 7: Replace Images

#### 7.1 Background Image
Replace: `public/images/backgrounds/hero-bg.jpg`
- Recommended size: 1920x1080 or larger
- Format: JPG or WebP
- File size: < 500KB for best performance

#### 7.2 Game Banner
Replace: `public/images/steam/official-banner.png`
- Recommended size: 1600x900
- Used on homepage hero section

#### 7.3 Additional Images
Add your own screenshots, artwork, or promotional materials to:
- `public/images/screenshots/`
- `public/images/characters/`
- etc.

---

### Step 8: Update Content (MDX Articles)

Replace all content in `src/content/` folders:

```
src/content/
├── guide/           # Game guides
├── buy/             # Purchase options
├── review/          # Reviews
├── technical/       # Technical guides
├── community/       # Community content
├── download/        # Downloads (mods, saves, etc.)
├── info/            # Game information
└── news/            # News & updates
```

Each `.mdx` file should have frontmatter:

```mdx
---
title: "Your Article Title"
description: "Brief description"
category: "Guide"
priority: 1
date: "2025-01-17"
---

# Your Article Content

Write your content in Markdown...
```

---

### Step 9: Update Colors & Branding

#### 9.1 Primary Color

The template uses green (`#25AB2B`) for Rue Valley. Replace throughout:

**Files to update:**
- `src/app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind theme colors

**Common replacements:**
```css
/* Find and replace: */
#25AB2B -> YOUR_PRIMARY_COLOR
#1E8923 -> YOUR_DARKER_SHADE
```

**Quick find command:**
```bash
grep -r "#25AB2B" src/
grep -r "\\[#25AB2B\\]" src/
```

#### 9.2 Update `tailwind.config.ts`

```typescript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      'primary-dark': '#YOUR_DARKER_COLOR',
    }
  }
}
```

Then replace `[#25AB2B]` with `primary` throughout your components.

---

### Step 10: Test Your Changes

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000

# Test all navigation links
# Test all category pages
# Test article pages
# Test responsive design (mobile, tablet, desktop)
```

---

## 🎨 Component Configuration

### SteamGauge Component

**Purpose:** Display Steam statistics (reviews, owners, price)

**Configuration:**
- Update `STEAM_APP_ID` in `scripts/fetch-steam.js`
- Run `npm run fetch:steam` to fetch data
- Data stored in `public/data/steamspy.json`

**Remove if:**
- Game is not on Steam
- You don't want to display statistics

### IntentionSearch Component

**Purpose:** Game-specific search feature (for Rue Valley's "Intention" system)

**Configuration:**
- Update data structure in `public/data/intentions.json`
- Modify search fields in component
- Update labels and UI text

**Remove if:**
- Your game doesn't have a similar mechanic

### VideoSection Component

**Purpose:** Display embedded YouTube videos

**Configuration:**
- Update `src/data/videos.ts` with your video IDs
- No code changes needed

### RedditSection Component

**Purpose:** Link to Reddit discussions

**Configuration:**
- Update `src/data/reddit.ts` with your Reddit posts
- No code changes needed

---

## 📝 Content Management

### Adding New Categories

1. Create folder: `src/app/your-category/`
2. Create `page.tsx` (copy from existing category)
3. Create content folder: `src/content/your-category/`
4. Add to navigation in `Header.tsx`

### Adding New Articles

1. Create MDX file in appropriate category folder
2. Add frontmatter metadata
3. Write content in Markdown
4. Article will automatically appear in category list

### URL Structure

- Homepage: `/`
- Category list: `/guide`, `/buy`, etc.
- Articles: `/guide/article-name`, `/buy/steam-price`, etc.

---

## 🎨 Styling & Branding

### Color Palette

Current Rue Valley colors:
- Primary: `#25AB2B` (green)
- Primary Dark: `#1E8923`
- Background: Dark purple/blue gradient
- Text: White/Gray shades

### Typography

- Headings: Geist Sans (bold)
- Body: Geist Sans (regular)
- Code: Geist Mono

To change fonts, update in `src/app/layout.tsx`.

### Responsive Design

The template is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables (if any)
4. Deploy

### Deploy to Netlify

1. Push to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

### Custom Domain

Update in your hosting provider's dashboard and update:
```tsx
// src/components/Footer.tsx
© 2025 yourdomain.com
```

---

## ✅ Final Checklist

Before going live, verify:

- [ ] All "Rue Valley" text replaced with your game name
- [ ] All images replaced (background, banner, screenshots)
- [ ] Steam App ID updated (if applicable)
- [ ] YouTube video IDs updated
- [ ] Reddit links updated
- [ ] All navigation links work
- [ ] All category pages display correctly
- [ ] All articles render properly
- [ ] Primary color updated throughout
- [ ] Metadata (title, description) updated
- [ ] Footer links and copyright updated
- [ ] Mobile responsive design tested
- [ ] Page load performance checked

---

## 🆘 Troubleshooting

### Issue: Steam data not loading

**Solution:**
- Verify `STEAM_APP_ID` is correct
- Run `npm run fetch:steam`
- Check `public/data/steamspy.json` exists

### Issue: Articles not displaying

**Solution:**
- Verify MDX files have proper frontmatter
- Check file extension is `.mdx`
- Verify folder structure matches URL pattern

### Issue: Images not loading

**Solution:**
- Verify images are in `public/` folder
- Check image paths start with `/` (e.g., `/images/banner.png`)
- Verify image file names match code

### Issue: Colors not updating

**Solution:**
- Search for hardcoded color values: `grep -r "#25AB2B" src/`
- Update Tailwind config
- Clear `.next` cache: `rm -rf .next && npm run dev`

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🤝 Support

If you need help adapting this template, please refer to:
- Original repository: https://github.com/libin257/ruevalley.org
- Create an issue on GitHub
- Contact: [Your contact info]

---

**Good luck with your game website! 🎮**
