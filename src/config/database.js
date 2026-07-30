import sqlite3 from "sqlite3";

const db = new sqlite3.Database("library.db.sqlite", (err) => {
    if (err) {
        console.error("Error opening database", err);
    } else {
        console.log("Connected to SQLite database");
    }
});

export default db;