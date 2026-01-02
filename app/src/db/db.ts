import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import type { DatabaseSchema } from "./types.js";

const adapter = new JSONFile<DatabaseSchema>("db.json");
const db = new Low<DatabaseSchema>(adapter, {} as DatabaseSchema);

export async function initDb() {
  await db.read();
}
db.data ||= { products: [], orders: [] };

export default db;
