const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword]);
};

const findUserByUsername = async (username) => {
    const [rows] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);
    return rows[0];
};

module.exports = {
    createUser,
    findUserByUsername
};