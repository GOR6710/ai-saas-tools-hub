import sql from './db'

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

export async function getCategories(): Promise<Category[]> {
  const rows = await sql`
    SELECT c.id, c.name, c.slug, c.description, COUNT(t.id)::int as tool_count
    FROM categories c
    LEFT JOIN tools t ON c.id = t.category_id AND t.status = 'ACTIVE'
    GROUP BY c.id, c.name, c.slug, c.description
    ORDER BY c.sort_order
  `
  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    toolCount: row.tool_count || 0,
  }))
}

export async function getTools(): Promise<Tool[]> {
  const rows = await sql`
    SELECT t.*, c.name as category_name, c.slug as category_slug
    FROM tools t
    JOIN categories c ON t.category_id = c.id
    WHERE t.status = 'ACTIVE'
    ORDER BY t.rating DESC
  `

  const tools: Tool[] = []
  for (const row of rows) {
    const features = await sql`
      SELECT f.name FROM features f
      JOIN tool_features tf ON f.id = tf.feature_id
      WHERE tf.tool_id = ${row.id} AND tf.has_feature = true
    `

    const reviews = await sql`
      SELECT rating, comment, pros, cons FROM user_reviews
      WHERE tool_id = ${row.id} AND status = 'APPROVED'
      ORDER BY created_at DESC
      LIMIT 5
    `

    const pros: string[] = []
    const cons: string[] = []
    for (const r of reviews) {
      if (r.pros) pros.push(...r.pros)
      if (r.cons) cons.push(...r.cons)
    }

    const alts = await sql`
      SELECT name FROM tools
      WHERE category_id = ${row.category_id} AND id != ${row.id} AND status = 'ACTIVE'
      LIMIT 4
    `

    tools.push({
      id: row.id,
      name: row.name,
      slug: row.slug,
      tagline: row.tagline || '',
      description: row.description || '',
      category: row.category_name,
      categorySlug: row.category_slug,
      rating: parseFloat(row.rating) || 0,
      reviewCount: parseInt(row.review_count) || 0,
      pricing: row.pricing_model || '未知',
      hasFreeTier: row.has_free_tier || false,
      websiteUrl: row.website_url || '',
      features: features.map((f: any) => f.name),
      pros: [...new Set(pros)].slice(0, 4),
      cons: [...new Set(cons)].slice(0, 4),
      bestFor: ['日常办公', '内容创作', '团队协作'],
      alternatives: alts.map((a: any) => a.name),
    })
  }

  return tools
}

export async function getToolBySlug(slug: string): Promise<Tool | undefined> {
  const tools = await getTools()
  return tools.find(t => t.slug === slug)
}

export async function getToolsByCategory(categorySlug: string): Promise<Tool[]> {
  const tools = await getTools()
  return tools.filter(t => t.categorySlug === categorySlug)
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories()
  return categories.find(c => c.slug === slug)
}

export async function searchTools(query: string): Promise<Tool[]> {
  const q = `%${query.toLowerCase()}%`
  const rows = await sql`
    SELECT t.*, c.name as category_name, c.slug as category_slug
    FROM tools t
    JOIN categories c ON t.category_id = c.id
    WHERE t.status = 'ACTIVE' AND (
      LOWER(t.name) LIKE ${q} OR
      LOWER(t.description) LIKE ${q} OR
      LOWER(c.name) LIKE ${q}
    )
  `

  return rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline || '',
    description: row.description || '',
    category: row.category_name,
    categorySlug: row.category_slug,
    rating: parseFloat(row.rating) || 0,
    reviewCount: parseInt(row.review_count) || 0,
    pricing: row.pricing_model || '未知',
    hasFreeTier: row.has_free_tier || false,
    websiteUrl: row.website_url || '',
    features: [],
    pros: [],
    cons: [],
    bestFor: [],
    alternatives: [],
  }))
}
