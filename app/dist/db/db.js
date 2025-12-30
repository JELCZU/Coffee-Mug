import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
// ścieżka do typów
const adapter = new JSONFile("db.json");
const db = new Low(adapter, {});
// inicjalizacja domyślna
export async function initDb() {
    await db.read();
}
db.data ||= { products: [], orders: [] };
export default db;
//# sourceMappingURL=db.js.map