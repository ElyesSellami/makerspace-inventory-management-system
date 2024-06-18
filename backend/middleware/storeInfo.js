require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

function getUserInfo() {
    const decoded = jwt.verify(sessionStorage.getItem('userToken'), secret);
    const { userid, email, firstName, lastName, accountType } = decoded;
    return { userid, email, firstName, lastName, accountType }
}

module.exports = { getUserInfo }