import Link from 'next/link'
import { SteamGauge } from '@/components/rue-valley/SteamGauge'
import { IntentionSearch } from '@/components/rue-valley/IntentionSearch'
import { VideoSection } from '@/components/rue-valley/VideoSection'
import { RedditSection } from '@/components/rue-valley/RedditSection'

export default function HomePage() {
  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-6">
            47 分钟循环，不想再卡关就看这里
          </h1>
          <h2 className="text-2xl lg:text-3xl text-gray-200 drop-shadow-md mb-6">
            最完整的攻略、实时价格与角色档案，一站掌握
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            探索 Rue Valley 的时间循环世界，解锁所有意向树任务，深入了解 Eugene Harlow 和 Rue Valley 小镇的秘密。
            我们提供最全面的攻略、角色心理分析、Steam 实时价格追踪，助你打破循环。
          </p>
          <div className="flex gap-4">
            <Link
              href="/guide/gameplay-overview"
              className="bg-[#25AB2B] hover:bg-[#1E8923] text-black font-bold py-3 px-6 rounded-md transition-colors"
            >
              开始上手
            </Link>
            <Link
              href="/buy/steam-price"
              className="bg-white/90 hover:bg-white text-[#1E8923] font-semibold py-3 px-6 rounded-md transition-colors"
            >
              最低价格
            </Link>
            <Link
              href="/guide/full-walkthrough"
              className="border border-gray-600 hover:border-[#25AB2B] text-gray-200 hover:text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              完整攻略
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src="/images/steam/official-banner.png"
            alt="Rue Valley Game"
            className="rounded-lg shadow-2xl w-full"
          />
        </div>
      </section>

      {/* Steam Heatmap Dashboard */}
      <SteamGauge />

      {/* Intention Tree Search */}
      <IntentionSearch />

      {/* Information Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">快速导航</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((item, index) => (
            <Link key={index} href={item.url}>
              <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] hover:ring-4 hover:ring-[#25AB2B]/30 rounded-lg p-6 border border-gray-700 transition-all">
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Video & Reddit Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* YouTube Videos */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">🎬 精选视频</h2>
            <VideoSection />
          </div>

          {/* Reddit Discussions */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">💬 热门讨论</h2>
            <RedditSection />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Rue Valley 核心特色</h2>
        <p className="text-center text-gray-300 mb-8">为什么这款时间循环 RPG 值得一玩</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">意向系统</h3>
            <p className="text-gray-300 text-sm">
              独特的意向树玩法，每个循环可完成不同任务，解锁新区域和角色关系。
              20+ 意向任务等你发掘。
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">47 分钟循环</h3>
            <p className="text-gray-300 text-sm">
              每个循环精确 47 分钟，在有限时间内探索小镇、收集线索、推进剧情。
              时间管理是突破关键。
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">心理叙事</h3>
            <p className="text-gray-300 text-sm">
              深度角色塑造，Eugene、Dr. Finck、Anitta 等角色各有隐藏故事。
              剧情媲美 Disco Elysium。
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-white mb-8">常见问题</h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-12 text-center border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-4">准备好打破时间循环了吗？</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          立即开始你的 Rue Valley 之旅，使用我们的完整攻略、意向树查询工具，
          以及角色关系图，轻松突破每个循环的谜题。
        </p>
        <Link
          href="/guide/gameplay-overview"
          className="inline-block bg-[#25AB2B] hover:bg-[#1E8923] text-black font-bold py-3 px-8 rounded-md transition-colors"
        >
          开始上手
        </Link>
      </section>
    </div>
  )
}

const quickLinks = [
  {
    title: "新手开局",
    subtitle: "3 分钟入门",
    url: "/guide/gameplay-overview"
  },
  {
    title: "全意向流程图",
    subtitle: "一图看懂循环",
    url: "/guide/full-walkthrough"
  },
  {
    title: "角色心理档案",
    subtitle: "他们为何困在此",
    url: "/info/characters"
  },
  {
    title: "版本更新笔记",
    subtitle: "补丁一览",
    url: "/technical/patch-notes"
  },
  {
    title: "平台价格速查",
    subtitle: "Steam / Switch",
    url: "/buy/steam-price"
  },
  {
    title: "FAQ & 软锁自救",
    subtitle: "别让循环卡死",
    url: "/community/reddit-highlights"
  }
]

const faqs = [
  {
    question: "Rue Valley 是什么游戏？",
    answer: "Rue Valley 是一款时间循环叙事 RPG，玩家扮演 Eugene Harlow，困在 47 分钟的循环中，需要通过完成意向任务、探索小镇、解锁角色关系来打破循环。游戏融合心理叙事和解谜元素，剧情深度媲美 Disco Elysium。"
  },
  {
    question: "如何开始玩 Rue Valley？",
    answer: "建议先阅读我们的新手指南了解基本玩法和意向系统。游戏可在 Steam 购买（支持 Windows、Mac、Linux），首次循环会有教程引导。使用我们的意向树查询工具可快速找到卡关任务的解法。"
  },
  {
    question: "Rue Valley 有多少个结局？",
    answer: "Rue Valley 有多个结局，取决于你在循环中完成的意向、与角色的互动选择，以及发现的隐藏线索。不同的选择会影响 Eugene 的心理状态和小镇居民的命运。"
  },
  {
    question: "遇到软锁（Soft-lock）怎么办？",
    answer: "软锁通常发生在任务顺序错误或错过关键时间点。查看我们的 Reddit 讨论区有详细的软锁解决方案。常见问题包括 Frank's Room 进不去、Anitta's Car 解锁失败等，都可在社区找到答案。"
  }
]
