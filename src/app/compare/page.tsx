import { Metadata } from 'next'
import { getTools } from '@/lib/data'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '工具对比 — 找出最适合你的AI工具',
  description: '选择2-4个AI工具进行详细对比，从功能、定价、适用场景等维度全面分析。',
}

export const revalidate = 3600

export default async function ComparePage() {
  const tools = await getTools()

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">工具对比</h1>
      <p className="text-gray-600 mb-8">选择工具进行对比，找出最适合你的那一款</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <div key={tool.id} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{tool.tagline}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{tool.rating}★</span>
              <span className="text-sm text-gray-500">{tool.pricing}</span>
            </div>
            <Link href={`/tool/${tool.slug}/`} className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              查看详情
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">热门对比</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/tool/chatgpt/" className="bg-white px-4 py-2 rounded-lg shadow text-blue-700 hover:shadow-md transition">ChatGPT vs Claude</Link>
          <Link href="/tool/midjourney/" className="bg-white px-4 py-2 rounded-lg shadow text-blue-700 hover:shadow-md transition">Midjourney vs DALL-E</Link>
          <Link href="/tool/cursor/" className="bg-white px-4 py-2 rounded-lg shadow text-blue-700 hover:shadow-md transition">Cursor vs Copilot</Link>
          <Link href="/tool/notion/" className="bg-white px-4 py-2 rounded-lg shadow text-blue-700 hover:shadow-md transition">Notion vs Obsidian</Link>
        </div>
      </div>
    </div>
  )
}
