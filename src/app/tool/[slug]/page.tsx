import { Metadata } from 'next'
import { getToolBySlug } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return { title: '工具未找到' }

  return {
    title: `${tool.name} 评测 — 功能、定价与替代品 | AI工具库`,
    description: `${tool.name} 完整评测：功能特性、定价方案、优缺点分析，以及最佳替代品推荐。`,
    keywords: [tool.name, `${tool.name}评测`, `${tool.name}替代品`, tool.category, 'AI工具'],
  }
}

export async function generateStaticParams() {
  const { tools } = await import('@/lib/data')
  return tools.map(t => ({ slug: t.slug }))
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${tool.categorySlug}/`} className="hover:text-blue-600">{tool.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{tool.name}</span>
      </nav>

      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{tool.name} 评测</h1>
          <div className="text-right">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-lg font-bold">{tool.rating}★</span>
            <p className="text-sm text-gray-500 mt-1">{tool.reviewCount} 条评价</p>
          </div>
        </div>

        <p className="text-lg text-gray-600 mb-6">{tool.description}</p>

        <div className="flex flex-wrap gap-4 mb-6">
          <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            访问官网
          </a>
          <span className={`px-4 py-2 rounded-lg ${tool.hasFreeTier ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {tool.hasFreeTier ? '有免费版' : '付费工具'}
          </span>
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">{tool.pricing}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">核心功能</h2>
          <ul className="space-y-2">
            {tool.features.map(f => (
              <li key={f} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">适用人群</h2>
          <div className="flex flex-wrap gap-2">
            {tool.bestFor.map(b => (
              <span key={b} className="bg-green-100 text-green-700 px-3 py-1 rounded">{b}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-green-700">优点</h2>
          <ul className="space-y-2">
            {tool.pros.map(p => (
              <li key={p} className="flex items-start gap-2">
                <span className="text-green-600 font-bold">+</span>
                <span className="text-gray-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-red-700">缺点</h2>
          <ul className="space-y-2">
            {tool.cons.map(c => (
              <li key={c} className="flex items-start gap-2">
                <span className="text-red-600 font-bold">-</span>
                <span className="text-gray-700">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">替代品推荐</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tool.alternatives.map(alt => (
            <div key={alt} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition">
              <span className="font-medium text-gray-800">{alt}</span>
            </div>
          ))}
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "applicationCategory": "DeveloperApplication",
        "description": tool.description,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "USD",
          "price": tool.pricing.includes('免费') ? '0' : '20',
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": tool.rating,
          "ratingCount": tool.reviewCount,
        },
      })}} />
    </div>
  )
}
