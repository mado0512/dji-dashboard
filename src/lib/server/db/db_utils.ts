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
