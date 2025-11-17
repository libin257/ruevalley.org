import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'

export default function ArticlesPage() {
  return (
    <div className="container mx-auto py-12">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Articles' }
      ]} />

      {/* Page Header */}
      <div className="flex flex-col justify-between items-center mb-6">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-5xl tracking-tight text-white drop-shadow-lg">
          <span className="pt-10">Articles</span>
        </h1>
        <h2 className="mx-auto max-w-[700px] md:text-xl my-6 text-gray-200 drop-shadow-md">
          Discover insights and stories
        </h2>
      </div>

      {/* Articles List */}
      <section>
        <div className="space-y-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="rounded-lg border text-card-foreground shadow-sm bg-black/50 backdrop-blur-md border-gray-700 hover:border-red-900 hover:shadow-2xl hover:shadow-red-900/20 transition-all"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <Link
                  href={article.href}
                  className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-1"
                >
                  <h3 className="text-2xl font-semibold leading-none tracking-tight mr-1 text-gray-100">
                    {article.title}
                  </h3>
                  →
                </Link>
                <div className="text-sm text-gray-300">
                  {article.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const articles = [
  {
    title: "Brother Hai Restaurant Walkthrough: Complete Beginner's Guide to the Vietnamese Horror Game",
    description: "Master Brother Hai Restaurant with our complete walkthrough. Tips for pho preparation, customer service, uncovering secrets, and surviving the psychological horror in Anh Hai's village.",
    href: "/article/brother-hai-restaurant-walkthrough"
  },
  {
    title: "Brother Hai Restaurant Characters: Meet Anh Hai, Mr. Gold & the Cast",
    description: "Explore the characters of Brother Hai Restaurant including protagonist Anh Hai, the beloved shop dog Mr. Gold (Cậu Vàng), and other key figures in this Vietnamese horror game.",
    href: "/article/brother-hai-restaurant-characters"
  },
  {
    title: "All Endings in Brother Hai Restaurant: Complete Walkthrough & Choices Guide",
    description: "Discover all four endings in Brother Hai Restaurant. Complete walkthrough with choices, routes, hidden secrets, and how your decisions shape Anh Hai's story in this Vietnamese horror game.",
    href: "/article/all-endings"
  },
  {
    title: "Brother Hai Restaurant Download Guide: Safe Installation for Windows & Linux",
    description: "Complete guide to downloading Brother Hai Restaurant safely from itch.io. Includes installation steps, system requirements, and APK safety warnings for the viral Vietnamese horror game.",
    href: "/article/download-guide"
  },
  {
    title: "Is Brother Hai Restaurant Real? The Truth About the Viral Google Maps Location",
    description: "Discover the truth behind Brother Hai Restaurant's viral Google Maps phenomenon. Learn about the fictional pho shop that sparked worldwide searches and the Dan Phuong location mystery.",
    href: "/article/is-brother-hai-restaurant-real"
  },
  {
    title: "Brother Hai Restaurant Google Maps Phenomenon: How a Fictional Shop Got 500+ Reviews",
    description: "Uncover how Brother Hai Restaurant's fictional Dan Phuong location became a Google Maps sensation with hundreds of reviews. The complete story of this viral gaming phenomenon.",
    href: "/article/google-maps-phenomenon"
  }
]
