import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'

export default function ArticleDetailPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Articles', href: '/article' },
        { label: 'Is Brother Hai Restaurant Real?' }
      ]} />

      {/* Article Meta */}
      <div className="bg-black/50 backdrop-blur-md rounded-lg p-6 my-6 border border-gray-700">
        <p className="text-gray-300 mb-2">11/5/2025</p>
        <p className="text-gray-200">
          Discover the truth behind Brother Hai Restaurant's viral Google Maps phenomenon. Learn about the fictional pho shop that sparked worldwide searches and the Dan Phuong location mystery.
        </p>
      </div>

      {/* Article Content */}
      <article className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-gray-100 prose-a:text-red-400 hover:prose-a:text-red-300">
        <h1>Is Brother Hai Restaurant Real? The Truth About the Viral Google Maps Location</h1>

        <h2>The Brother Hai Restaurant Phenomenon</h2>
        <p>
          <strong>Brother Hai Restaurant</strong> has taken the internet by storm, but not in the way you might expect.
          This Vietnamese pho shop, featured in the indie horror game "Brother Hai's Pho Restaurant," sparked a viral
          phenomenon when fans began treating the fictional location as real.
        </p>

        <h2>What Is Brother Hai Restaurant?</h2>
        <p>
          Brother Hai Restaurant is the central setting of the viral Vietnamese indie horror game developed by{' '}
          <strong>marisa0704</strong> using the Godot engine. Released on October 23, 2025, the game follows Anh Hai,
          who runs a pho restaurant in a village near Hanoi.
        </p>

        <h3>Key Facts About Brother Hai Restaurant:</h3>
        <ul>
          <li><strong>Game Developer</strong>: marisa0704</li>
          <li><strong>Release Date</strong>: October 23, 2025</li>
          <li><strong>Platforms</strong>: Windows, Linux (itch.io)</li>
          <li><strong>Genre</strong>: Psychological Horror, Narrative-Driven</li>
          <li><strong>Setting</strong>: Fictional Vietnamese village</li>
        </ul>

        <h2>The Google Maps Mystery</h2>
        <p>
          The most fascinating aspect of Brother Hai Restaurant's viral spread is the Google Maps phenomenon.
          The game mentions a location at <strong>"No. 10 Đan Phượng"</strong> (Dan Phuong district), and fans
          created actual Google Maps listings for this fictional restaurant.
        </p>

        <h3>The Viral Timeline:</h3>
        <ol>
          <li><strong>November 3, 2025</strong>: Game gains sudden popularity</li>
          <li><strong>November 4, 2025</strong>: Fans create Google Maps listing</li>
          <li><strong>November 5, 2025</strong>: Location receives <strong>500+ reviews</strong> and <strong>4.7-star rating</strong></li>
          <li><strong>Media Coverage</strong>: Vietnamese national television (VTV) features the phenomenon</li>
        </ol>

        <h2>Is Brother Hai Restaurant Real?</h2>
        <p>
          <strong>No, Brother Hai Restaurant is not a real restaurant.</strong> It exists only within the video game
          "Brother Hai's Pho Restaurant." The Google Maps location, reviews, and photos were all created by fans
          participating in the viral phenomenon.
        </p>

        <h3>Why People Thought It Was Real:</h3>
        <ul>
          <li>Authentic cultural details in the game</li>
          <li>Specific address mentioned (Dan Phuong)</li>
          <li>Realistic portrayal of Vietnamese village life</li>
          <li>Fan-created Google Maps listing with reviews</li>
        </ul>

        <h2>The Cultural Impact</h2>
        <p>
          Brother Hai Restaurant represents more than just a viral gaming moment. The game's authentic representation
          of Vietnamese culture resonated deeply with players worldwide:
        </p>

        <ul>
          <li><strong>Cultural Authenticity</strong>: Plastic stools, patterned tiles, local dialogue</li>
          <li><strong>Mr. Gold (Cậu Vàng)</strong>: The shop dog became a beloved character</li>
          <li><strong>Media Recognition</strong>: Featured on Vietnamese national television</li>
          <li><strong>Community Engagement</strong>: Thousands of players sharing experiences</li>
        </ul>

        <h2>How to Experience Brother Hai Restaurant</h2>
        <p>While Brother Hai Restaurant isn't real, you can experience it through the game:</p>

        <ol>
          <li><strong>Visit Official Page</strong>: <a href="https://marisa0704.itch.io/brother-hais-pho-restaurant" target="_blank" rel="noopener noreferrer">marisa0704.itch.io/brother-hais-pho-restaurant</a></li>
          <li><strong>Download Free</strong>: Available for Windows and Linux</li>
          <li><strong>Explore the Story</strong>: Discover four unique endings</li>
          <li><strong>Join the Community</strong>: Share your experience with thousands of players</li>
        </ol>

        <h2>Frequently Asked Questions</h2>

        <p><strong>Q: Can I visit Brother Hai Restaurant in real life?</strong><br />
        A: No, Brother Hai Restaurant is entirely fictional and exists only in the video game.</p>

        <p><strong>Q: Who created the Google Maps location?</strong><br />
        A: Fans of the game created the listing as part of the viral phenomenon, treating the fictional location as real.</p>

        <p><strong>Q: Where can I play the Brother Hai Restaurant game?</strong><br />
        A: Download it free from the official itch.io page: <a href="https://marisa0704.itch.io/brother-hais-pho-restaurant" target="_blank" rel="noopener noreferrer">marisa0704.itch.io/brother-hais-pho-restaurant</a></p>

        <p><strong>Q: Why did Brother Hai Restaurant go viral?</strong><br />
        A: The combination of authentic Vietnamese cultural representation, engaging horror narrative, and the unique Google Maps phenomenon drove its viral success.</p>

        <h2>Conclusion</h2>
        <p>
          Brother Hai Restaurant may not be a real restaurant, but its impact on gaming culture, Vietnamese representation,
          and viral internet phenomena is very real. The game's success demonstrates the power of authentic storytelling
          and cultural representation in indie game development.
        </p>

        <p>
          Whether you're interested in Brother Hai Restaurant for its horror elements, cultural authenticity, or the
          fascinating Google Maps phenomenon, the game offers a unique experience that has captivated millions worldwide.
        </p>

        <p className="border-t border-gray-700 pt-4 mt-8">
          <em>Last Updated: November 5, 2025</em><br />
          <em>Article by Brother Hai Restaurant Community Team</em>
        </p>
      </article>

      {/* Back to Articles */}
      <div className="mt-12">
        <Link
          href="/article"
          className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-2"
        >
          ← Back to Articles
        </Link>
      </div>
    </div>
  )
}
