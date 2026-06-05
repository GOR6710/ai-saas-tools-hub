import { Metadata } from 'next'
import { getCategoryBySlug, getToolsByCategory } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: '分类未找到' }

  return {
    title: `${category.name} — 2026 最佳推荐 | AI工具库`,
    description: `探索 ${category.name} 类别下的顶级工具，含详细对比、定价信息和用户评分。`,
    keywords: [category.name, 'AI工具', 'SaaS工具', '工具推荐'],
  }
}

export async function generateStaticParams() {
  const { getCategories } = await import('@/lib/data')
  const categories = await getCategories()
  return categories.map(c => ({ slug: c.slug }))
}

export const revalidate = 3600

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const tools = await getToolsByCategory(slug)

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{category.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">最佳 {category.name} 工具</h1>
      <p className="text-gray-600 mb-8">{category.description} — 共 {category.toolCount} 个工具</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <div key={tool.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{tool.tagline}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tool.features.slice(0, 3).map(f => (
                <span key={f} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{f}</span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{tool.rating}★</span>
              <Link href={`/tool/${tool.slug}/`} className="text-blue-600 hover:text-blue-800 font-medium">查看详情 →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
