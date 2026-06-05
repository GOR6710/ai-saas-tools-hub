import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: { default: 'AI工具库 - AI SaaS 工具对比与推荐平台', template: '%s | AI工具库' },
  description: '发现最适合你的 AI 工具和生产力软件。提供详细对比、真实评测和场景化推荐。',
  keywords: ['AI工具', 'SaaS工具', 'AI推荐', '生产力工具', 'AI对比'],
  metadataBase: new URL('https://ai-tools-hub.com'),
  openGraph: {
    type: 'website',
    siteName: 'AI工具库',
    title: 'AI工具库 - AI SaaS 工具对比与推荐平台',
    description: '发现最适合你的 AI 工具和生产力软件。提供详细对比、真实评测和场景化推荐。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI工具库 - AI SaaS 工具对比与推荐平台',
    description: '发现最适合你的 AI 工具和生产力软件',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        <Header />
        {children}
      </body>
    </html>
  )
}
