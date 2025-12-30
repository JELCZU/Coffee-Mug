import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import type { DatabaseSchema } from "./types.js"; // ścieżka do typów
// ścieżka do typów

const adapter = new JSONFile<DatabaseSchema>("db.json");
const db = new Low<DatabaseSchema>(adapter, {} as DatabaseSchema);

// inicjalizacja domyślna

export async function initDb() {
  await db.read();
}
db.data ||= { products: [], orders: [] };

export default db;
