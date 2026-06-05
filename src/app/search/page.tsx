import { Metadata } from 'next'
import { searchTools } from '@/lib/data'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '搜索工具',
  description: '在AI工具库中搜索你需要的AI工具',
}

export const revalidate = 3600

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q || ''
  const results = query ? await searchTools(query) : []

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">搜索: {query}</h1>
      <p className="text-gray-500 mb-8">找到 {results.length} 个结果</p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(tool => (
            <div key={tool.id} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{tool.tagline}</p>
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{tool.rating}★</span>
                <Link href={`/tool/${tool.slug}/`} className="text-blue-600 hover:text-blue-800">详情 →</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-12">未找到相关工具，请尝试其他关键词</p>
      )}
    </div>
  )
}
