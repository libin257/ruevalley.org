// src/data/videos.ts

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
}

export const featuredVideos: Video[] = [
  {
    id: 'ydirmet86Uk',
    title: '官方玩法预告片',
    description: '官方 2 分钟预告，速览玩法要素',
    thumbnail: 'https://img.youtube.com/vi/ydirmet86Uk/maxresdefault.jpg'
  },
  {
    id: 'IHOpJyGxSDc',
    title: '深度评测 (20 min)',
    description: 'Review Impressions - 媒体深度评测',
    thumbnail: 'https://img.youtube.com/vi/IHOpJyGxSDc/maxresdefault.jpg'
  },
  {
    id: 'kYxxTWN5N1c',
    title: '全流程无解说',
    description: 'Complete Gameplay Walkthrough',
    thumbnail: 'https://img.youtube.com/vi/kYxxTWN5N1c/maxresdefault.jpg'
  }
]
