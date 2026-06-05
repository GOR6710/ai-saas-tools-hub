import { Metadata } from 'next'
import { getCategories, getTools } from '@/lib/data'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI工具库 - AI SaaS 工具对比与推荐平台',
  description: '发现最适合你的 AI 工具和生产力软件。提供详细对比、真实评测和场景化推荐。',
  keywords: ['AI工具', 'SaaS工具', 'AI推荐', 'AI写作', 'AI编程', 'AI图像', '生产力工具'],
  openGraph: {
    title: 'AI工具库 - AI SaaS 工具对比与推荐平台',
    description: '发现最适合你的 AI 工具和生产力软件。提供详细对比、真实评测和场景化推荐。',
  },
}

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const categories = await getCategories()
  const tools = await getTools()
  const featuredTools = tools.slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            发现最佳 AI 工具与生产力软件
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            详细的工具对比、真实评测和场景化推荐，帮你找到最适合的工具
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              搜索工具
            </Link>
            <Link href="/compare" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              开始对比
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">编辑推荐</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map(tool => (
            <div key={tool.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{tool.name}</h3>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{tool.rating}★</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{tool.tagline}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.features.slice(0, 3).map(f => (
                  <span key={f} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{f}</span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{tool.pricing}</span>
                <Link href={`/tool/${tool.slug}/`} className="text-blue-600 hover:text-blue-800 font-medium">
                  查看详情 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">按分类浏览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}/`} className="group">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mt-2">{cat.description}</p>
                  <span className="text-sm text-blue-600 mt-3 block">{cat.toolCount} 个工具</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AI工具库",
        "url": "https://ai-tools-hub.com",
        "description": "AI SaaS 工具对比与推荐平台",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://ai-tools-hub.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })}} />
    </div>
  )
}
