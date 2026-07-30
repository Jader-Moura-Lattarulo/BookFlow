import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar TEXT
)`);

function createUserRepository(newUser) {
    return new Promise((resolve, reject) => {
        const { username, email, password, avatar } = newUser;
        db.run(
            `INSERT INTO users (username, email, password, avatar) 
             VALUES (?, ?, ?, ?)`,
             [username, email, password, avatar],
             function (err) {
                 if (err) {
                     reject(err);
                 } else {
                     resolve({id: this.lastID, ...newUser});
                 } 
            }
        );
    });
}

function findUserByEmailRepository(email) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

function findUserByUserNameRepository(username) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM users WHERE username = ?`,
            [username],
            function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
}

export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByUserNameRepository
};
