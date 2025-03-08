import { Pool } from 'pg';

export default function getClient() {
  return new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false },
  });
}