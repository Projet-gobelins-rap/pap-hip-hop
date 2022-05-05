const { nanoid } = require('nanoid');

const generateId = async function () {
    return nanoid(15)
}

module.exports = {
    generateId
} 