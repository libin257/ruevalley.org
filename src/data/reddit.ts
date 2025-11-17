// src/data/reddit.ts

export interface RedditPost {
  title: string
  stats: string
  url: string
  category: 'technical' | 'review' | 'discussion'
}

export const redditPosts: RedditPost[] = [
  {
    title: '⚠️ Soft-lock？进度卡死解决帖',
    stats: '200+ 赞',
    url: 'https://www.reddit.com/r/RueValleyGame/comments/1owazke/softlock/',
    category: 'technical'
  },
  {
    title: 'Rue Valley Review Mega Thread',
    stats: '汇总各路评测',
    url: 'https://www.reddit.com/r/rpg_gamers/comments/1otvwhk/rue_valley_review_mega_thread/',
    category: 'review'
  },
  {
    title: '[无剧透] 对时间循环设计的失望与建议',
    stats: '热门讨论',
    url: 'https://www.reddit.com/r/RueValleyGame/comments/1owhg8u/no_spoilers_very_disappointed_with_the_game/',
    category: 'discussion'
  },
  {
    title: 'Rue Valley 是神作还是灾难？',
    stats: '争议讨论',
    url: 'https://www.reddit.com/r/rpg_gamers/comments/1owh5pm/rue_valley_is_terrible/',
    category: 'discussion'
  }
]
