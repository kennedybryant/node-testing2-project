const db = require('../../data/db-config')

module.exports = {
    get,
    getById,
    add
}

function get() {
    return db('pokemon')
}

function getById(id) {
    return db('pokemon').where('pokemon_id', id).first()
}

async function add(pokemon) {
    return db('pokemon').insert(pokemon)
        .then(([id]) => {
            return getById(id)
        })
}