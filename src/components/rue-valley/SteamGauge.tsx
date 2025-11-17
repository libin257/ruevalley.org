'use client'

import { useEffect, useState } from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

interface SteamSpyData {
  fetchedAt: number
  name: string
  positive: number
  negative: number
  owners: string
  price: string
  scoreRank: string
}

export function SteamGauge() {
  const [steamData, setSteamData] = useState<SteamSpyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/steamspy.json')
      .then((res) => res.json())
      .then((data) => {
        setSteamData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load Steam data:', error)
        setLoading(false)
      })
  }, [])

  if (loading || !steamData) {
    return (
      <section className="mb-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <p className="text-center text-gray-400">Loading Steam data...</p>
        </div>
      </section>
    )
  }

  // Calculate review percentage
  const totalReviews = steamData.positive + steamData.negative
  const hasReviews = totalReviews > 0

  const reviewRate = hasReviews
    ? Math.round((steamData.positive / totalReviews) * 100)
    : 75 // Default display value when no reviews

  // Determine color based on percentage
  const getColor = (rate: number) => {
    if (!hasReviews) return '#6B7280' // Gray for no data
    if (rate >= 80) return '#25AB2B' // Green
    if (rate >= 60) return '#F59E0B' // Amber
    return '#EF4444' // Red
  }

  const chartColor = getColor(reviewRate)

  // Prepare chart data
  const chartData = [
    {
      name: 'Reviews',
      value: hasReviews ? reviewRate : 75, // Show partial circle when no reviews
      fill: chartColor,
    },
  ]

  // Format price from cents to dollars
  const priceUSD = steamData.price
    ? `$${(parseInt(steamData.price) / 100).toFixed(2)}`
    : 'N/A'

  // Get review status text
  const getReviewStatus = (rate: number) => {
    if (totalReviews === 0) return '暂无评价'
    if (rate >= 95) return '好评如潮'
    if (rate >= 80) return '特别好评'
    if (rate >= 70) return '多半好评'
    if (rate >= 40) return '褒贬不一'
    return '多半差评'
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Steam 热度仪表盘</h2>

      <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-8 border border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Radial Chart */}
          <div className="flex flex-col items-center">
            <ResponsiveContainer width={260} height={260}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={20}
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background={{ fill: '#374151' }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute" style={{ marginTop: '-160px' }}>
              <div className="text-center">
                {hasReviews ? (
                  <>
                    <div className="text-5xl font-bold text-white" style={{ color: chartColor }}>
                      {reviewRate}%
                    </div>
                    <div className="text-sm text-gray-300 mt-2">{getReviewStatus(reviewRate)}</div>
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-gray-400">
                      Coming Soon
                    </div>
                    <div className="text-sm text-gray-500 mt-2">即将上线</div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 text-center">
              {hasReviews ? (
                <>
                  <p className="text-sm text-gray-400">
                    {steamData.positive.toLocaleString()} 好评 / {steamData.negative.toLocaleString()} 差评
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    共 {totalReviews.toLocaleString()} 条评价
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  等待玩家评价中...
                </p>
              )}
            </div>
          </div>

          {/* Right: Metrics */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">持有玩家</h3>
              <p className="text-3xl font-bold text-[#25AB2B]">{steamData.owners}</p>
              <p className="text-sm text-gray-400 mt-1">Steam 统计</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">当前售价</h3>
              <p className="text-3xl font-bold text-white">{priceUSD}</p>
              <p className="text-sm text-gray-400 mt-1">Steam 平台</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">数据更新</h3>
              <p className="text-sm text-gray-300">
                {new Date(steamData.fetchedAt).toLocaleString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="text-xs text-gray-500 mt-1">数据来源: SteamSpy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
