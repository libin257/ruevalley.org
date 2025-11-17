'use client'

import { useEffect } from 'react'
import { featuredVideos } from '@/data/videos'
import 'lite-youtube-embed/src/lite-yt-embed.css'

// Extend JSX to include custom element
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { videoid: string },
        HTMLElement
      >
    }
  }
}

export function VideoSection() {
  useEffect(() => {
    // Dynamically import lite-youtube-embed script
    import('lite-youtube-embed')
  }, [])

  return (
    <div className="space-y-4">
      {featuredVideos.map((video) => (
        <div
          key={video.id}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-[#25AB2B] transition-all"
        >
          <lite-youtube
            videoid={video.id}
            style={{ aspectRatio: '16 / 9' }}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-1">{video.title}</h3>
            <p className="text-sm text-gray-300">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
