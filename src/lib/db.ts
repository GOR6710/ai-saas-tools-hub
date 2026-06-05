import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_ChBz45cKSixJ@ep-dry-sun-aqcpk7h5.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require')

export default sql
