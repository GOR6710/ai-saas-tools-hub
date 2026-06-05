import pool from './db'

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
  const result = await pool.query(`
    SELECT c.id, c.name, c.slug, c.description, COUNT(t.id)::int as tool_count
    FROM categories c
    LEFT JOIN tools t ON c.id = t.category_id AND t.status = 'ACTIVE'
    GROUP BY c.id, c.name, c.slug, c.description
    ORDER BY c.sort_order
  `)
  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    toolCount: row.tool_count || 0,
  }))
}

export async function getTools(): Promise<Tool[]> {
  const result = await pool.query(`
    SELECT t.*, c.name as category_name, c.slug as category_slug
    FROM tools t
    JOIN categories c ON t.category_id = c.id
    WHERE t.status = 'ACTIVE'
    ORDER BY t.rating DESC
  `)

  const tools = []
  for (const row of result.rows) {
    const featuresResult = await pool.query(`
      SELECT f.name FROM features f
      JOIN tool_features tf ON f.id = tf.feature_id
      WHERE tf.tool_id = $1 AND tf.has_feature = true
    `, [row.id])

    const reviewsResult = await pool.query(`
      SELECT rating, comment, pros, cons FROM user_reviews
      WHERE tool_id = $1 AND status = 'APPROVED'
      ORDER BY created_at DESC
      LIMIT 5
    `, [row.id])

    const pros: string[] = []
    const cons: string[] = []
    for (const r of reviewsResult.rows) {
      if (r.pros) pros.push(...r.pros)
      if (r.cons) cons.push(...r.cons)
    }

    const altResult = await pool.query(`
      SELECT name FROM tools
      WHERE category_id = $1 AND id != $2 AND status = 'ACTIVE'
      LIMIT 4
    `, [row.category_id, row.id])

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
      features: featuresResult.rows.map(f => f.name),
      pros: [...new Set(pros)].slice(0, 4),
      cons: [...new Set(cons)].slice(0, 4),
      bestFor: ['日常办公', '内容创作', '团队协作'],
      alternatives: altResult.rows.map(a => a.name),
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
  const result = await pool.query(`
    SELECT t.*, c.name as category_name, c.slug as category_slug
    FROM tools t
    JOIN categories c ON t.category_id = c.id
    WHERE t.status = 'ACTIVE' AND (
      LOWER(t.name) LIKE $1 OR
      LOWER(t.description) LIKE $1 OR
      LOWER(c.name) LIKE $1
    )
  `, [q])

  return result.rows.map(row => ({
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
