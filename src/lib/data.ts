export interface Tool {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  category: string
  categorySlug: string
  rating: number
  reviewCount: number
  pricing: string
  hasFreeTier: boolean
  websiteUrl: string
  features: string[]
  pros: string[]
  cons: string[]
  bestFor: string[]
  alternatives: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  toolCount: number
}

export const categories: Category[] = [
  { id: '1', name: 'AI写作', slug: 'ai-writing', description: 'AI写作工具、文案生成、内容创作助手', toolCount: 5 },
  { id: '2', name: 'AI编程', slug: 'ai-coding', description: 'AI代码补全、编程助手、开发工具', toolCount: 5 },
  { id: '3', name: 'AI图像', slug: 'ai-image', description: 'AI图像生成、设计工具、视觉创作', toolCount: 5 },
  { id: '4', name: 'AI对话', slug: 'ai-chat', description: 'AI聊天机器人、对话助手', toolCount: 5 },
  { id: '5', name: 'AI视频', slug: 'ai-video', description: 'AI视频生成、编辑工具', toolCount: 4 },
  { id: '6', name: 'AI语音', slug: 'ai-voice', description: 'AI语音合成、语音识别工具', toolCount: 3 },
  { id: '7', name: 'AI SEO', slug: 'ai-seo', description: 'AI SEO工具、内容优化', toolCount: 3 },
  { id: '8', name: 'AI自动化', slug: 'ai-automation', description: 'AI自动化工具、工作流', toolCount: 3 },
]

export const tools: Tool[] = [
  {
    id: '1', name: 'ChatGPT', slug: 'chatgpt',
    tagline: 'OpenAI出品的最强大语言模型对话工具',
    description: 'ChatGPT是由OpenAI开发的人工智能对话系统，基于GPT-4架构，能够理解和生成自然语言文本，支持多轮对话、代码编写、内容创作等多种场景。',
    category: 'AI对话', categorySlug: 'ai-chat',
    rating: 4.5, reviewCount: 1280,
    pricing: '免费版/Plus $20/月', hasFreeTier: true,
    websiteUrl: 'https://chat.openai.com',
    features: ['多轮对话', '代码编写', '内容创作', '图像理解', '插件扩展', 'API接口'],
    pros: ['功能全面，适用场景广', '免费版体验良好', '持续更新迭代', '社区资源丰富'],
    cons: ['付费版价格较高', '中文输出偶尔不够自然', '高峰期响应慢'],
    bestFor: ['日常办公', '内容创作', '编程辅助', '学习研究'],
    alternatives: ['Claude', '文心一言', 'Kimi', '通义千问']
  },
  {
    id: '2', name: 'Claude', slug: 'claude',
    tagline: 'Anthropic出品的高智能AI助手',
    description: 'Claude是由Anthropic开发的人工智能助手，以安全性和可靠性著称，擅长长文本处理、分析总结和复杂推理任务。',
    category: 'AI对话', categorySlug: 'ai-chat',
    rating: 4.6, reviewCount: 850,
    pricing: '免费版/Pro $20/月', hasFreeTier: true,
    websiteUrl: 'https://claude.ai',
    features: ['长文本处理', '文件分析', '代码编写', '数学推理', '安全对话', 'API接口'],
    pros: ['长文本处理能力最强', '输出质量高且稳定', '安全性好', '逻辑推理能力强'],
    cons: ['免费版额度有限', '国内访问不便', '没有联网搜索'],
    bestFor: ['学术研究', '长文档分析', '深度写作', '逻辑推理'],
    alternatives: ['ChatGPT', 'Kimi', 'Gemini', '文心一言']
  },
  {
    id: '3', name: 'Midjourney', slug: 'midjourney',
    tagline: '业界领先的AI图像生成工具',
    description: 'Midjourney是目前最受欢迎的AI图像生成工具之一，通过Discord平台运行，能够根据文本描述生成高质量、风格化的图像作品。',
    category: 'AI图像', categorySlug: 'ai-image',
    rating: 4.7, reviewCount: 2100,
    pricing: 'Basic $10/月', hasFreeTier: false,
    websiteUrl: 'https://www.midjourney.com',
    features: ['文本生成图像', '风格化输出', '图像放大', '参数控制', '社区分享', 'API接口'],
    pros: ['图像质量业界顶尖', '艺术风格多样', '社区活跃', '持续迭代升级'],
    cons: ['需要Discord', '没有免费版', '中文提示词效果一般', '学习曲线较陡'],
    bestFor: ['艺术创作', '设计灵感', '商业插画', '概念设计'],
    alternatives: ['DALL-E 3', 'Stable Diffusion', 'Leonardo.ai', 'Adobe Firefly']
  },
  {
    id: '4', name: 'Cursor', slug: 'cursor',
    tagline: 'AI驱动的下一代代码编辑器',
    description: 'Cursor是基于VS Code构建的AI代码编辑器，深度集成GPT-4，支持代码生成、重构、解释和对话式编程，大幅提升开发效率。',
    category: 'AI编程', categorySlug: 'ai-coding',
    rating: 4.4, reviewCount: 620,
    pricing: '免费版/Pro $20/月', hasFreeTier: true,
    websiteUrl: 'https://cursor.sh',
    features: ['代码生成', '代码重构', '代码解释', 'Bug修复', '对话编程', '多文件编辑'],
    pros: ['基于VS Code，生态丰富', 'AI集成深度好', '代码生成质量高', '支持多种语言'],
    cons: ['付费版功能受限', '大项目性能一般', '依赖网络连接'],
    bestFor: ['软件开发', '代码学习', '快速原型', '项目重构'],
    alternatives: ['GitHub Copilot', 'Codeium', 'Tabnine', 'CodeGeeX']
  },
  {
    id: '5', name: 'Notion', slug: 'notion',
    tagline: 'All-in-one workspace，AI增强的协作平台',
    description: 'Notion是功能强大的笔记和协作工具，集成了AI写作助手，支持文档、数据库、看板、日历等多种视图，适合个人和团队使用。',
    category: 'AI写作', categorySlug: 'ai-writing',
    rating: 4.5, reviewCount: 3400,
    pricing: '免费版/Plus $10/月', hasFreeTier: true,
    websiteUrl: 'https://notion.so',
    features: ['AI写作', '文档管理', '数据库', '看板', '团队协作', '模板库'],
    pros: ['功能全面，集成度高', '模板丰富', '团队协作强大', '跨平台同步'],
    cons: ['国内访问速度一般', '上手门槛较高', 'AI功能额外付费'],
    bestFor: ['知识管理', '团队协作', '项目管理', '内容创作'],
    alternatives: ['Obsidian', '飞书', 'ClickUp', 'Logseq']
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug)
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter(t => t.categorySlug === categorySlug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase()
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q) ||
    t.features.some(f => f.toLowerCase().includes(q))
  )
}
