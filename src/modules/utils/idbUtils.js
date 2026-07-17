import { openDB } from "idb";

const dbName = "AppUpdatesDB";

async function getDB() {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("updates")) {
        db.createObjectStore("updates", { keyPath: "id" });
      }
    },
  });
}
export async function saveUpdate(update) {
  const db = await getDB();
  await db.put("updates", { id: "latest", ...update });
}
export async function getSavedUpdate() {
  const db = await getDB();
  return db.get("updates", "latest");
}
export async function clearSavedUpdate() {
  const db = await getDB();
  return db.delete("updates", "latest");
}
