const { nanoid } = require('nanoid');

const generateId = async function () {
    return nanoid(15)
}

const generatePin = async function () {
    return Math.floor(Math.random() * 200)
}

module.exports = {
    generateId,
    generatePin
} 