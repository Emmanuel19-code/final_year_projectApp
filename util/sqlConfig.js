import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("notifications")

export const createNotificationDB = async () => {
  try {
    await db.prepareAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS test (
    id TEXT PRIMARY KEY NOT NULL, 
    title TEXT NOT NULL, 
    message TEXT NOT NULL, 
    created_at TEXT NOT NULL, 
    read INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    appointment_date TEXT NOT NULL,
    appointment_id TEXT NOT NULL,
    doctor_name TEXT NOT NULL
)
`)
    console.log("database create")
  } catch (error) {
    console.log("an error ", error)
  }
};

createNotificationDB()