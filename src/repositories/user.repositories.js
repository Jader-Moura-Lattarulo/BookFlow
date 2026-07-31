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

function findUserByIdRepository(id) {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT id, username, email, avatar FROM users WHERE id = ?`,
            [id],
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

function findAllUsersRepository() {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT id, username, email, avatar FROM users`,
            [],
            function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}

function updateUserRepository(id, user) {
    return new Promise((resolve, reject) => {
        const { username, email, password, avatar } = user;
        const fields = ["username", "email", "password", "avatar"];
        let query = "UPDATE users SET ";
        const values = [];

        let hasFields = false;

        fields.forEach((field, index) => {
            if (user[field] !== undefined) {
                if (hasFields) {
                    query += ", ";
                }
                query += `${field} = ?`;
                values.push(user[field]);
                hasFields = true;
            }
        });

        if (values.length === 0) {
            return resolve({ id, ...user });
        }

        query += ` WHERE id = ?`;
        values.push(id);

        db.run(
            query,
            values,
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve( {id, ...user});
                }
            }
        );
    });
}

async function deleteUserRepository(id) {
    return new Promise((resolve, reject) => {
        db.run(
            `DELETE FROM users WHERE id = ?`,
            [id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve( {message: "User deleted successfully!", id});
                }
            }
        );
    });
}

export default {
    createUserRepository,
    findUserByEmailRepository,
    findUserByUserNameRepository,
    findUserByIdRepository,
    findAllUsersRepository,
    updateUserRepository,
    deleteUserRepository
};
