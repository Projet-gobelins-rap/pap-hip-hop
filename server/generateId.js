const { nanoid } = require('nanoid');

const generateId = async function () {
    return nanoid(3)
}

module.exports = {
    generateId
} 