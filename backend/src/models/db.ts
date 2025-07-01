import { Pool } from 'pg';

export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Oil_India_db',
  password: 'root',
  port: 5432,
});
