import { DATABASE_URL } from "$env/static/private";
import pg from "pg";

export async function batchInsert<T extends Record<string, unknown>>(
  items: T[],
  table: string,
  pool: pg.Pool,
  columns: (keyof T)[],
): Promise<void> {
  if (items.length === 0) return;

  const values = items.flatMap((item) => columns.map((col) => item[col]));
  const placeholders = items
    .map((_, i) => {
      const offset = i * columns.length;
      const cols = columns.map((_, j) => `$${offset + j + 1}`);
      return `(${cols.join(", ")})`;
    })
    .join(", ");

  await pool.query(`INSERT INTO ${table} (${columns.join(", ")}) VALUES ${placeholders}`, values);
}

// ── Table base class ───────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Table<T extends Record<string, any>> {
  protected pool: pg.Pool;
  protected abstract readonly tableName: string;

  constructor(connectionString: string = DATABASE_URL) {
    this.pool = new pg.Pool({ connectionString });
  }

  abstract init(): Promise<void>;

  async insert(items: T[], columns?: (keyof T)[]) {
    const cols = columns ?? (Object.keys(items[0] ?? {}) as (keyof T)[]);
    await batchInsert(items, this.tableName, this.pool, cols);
  }

  async selectAll(columns?: string): Promise<T[]> {
    const col = columns ?? "*";
    const res = await this.pool.query(`select ${col} from ${this.tableName} order by id DESC;`);
    return res.rows;
  }

  async truncate(): Promise<number> {
    const res = await this.pool.query(`truncate ${this.tableName}`);
    return res.rowCount ?? 0;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
