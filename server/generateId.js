const { nanoid } = require('nanoid');

const generateId = async function () {
    return nanoid(15)
}

const generatePin = async function () {
    return String(Math.floor(Math.random() * 200))
}
const devPin = async function () {
    return '667'
}

module.exports = {
    generateId,
    generatePin,
    devPin
} 