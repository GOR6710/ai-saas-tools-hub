import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          AI工具库
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">首页</Link>
          <Link href="/search" className="text-gray-600 hover:text-blue-600">搜索</Link>
          <Link href="/compare" className="text-gray-600 hover:text-blue-600">对比</Link>
        </nav>
      </div>
    </header>
  )
}
