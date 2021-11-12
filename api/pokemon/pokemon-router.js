const express = require('express')
const router = express.Router()
const Pokemon = require('./pokemon-model')

router.get('/', (req, res) => {
    Pokemon.get()
        .then(pokemon => {
            res.status(200).json(pokemon)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', (req, res) => {
    Pokemon.getById(req.params.id)
        .then(pokemon => {
            if (!pokemon) {
                res.status(404).json({ message: 'could not find pokemon' })
            } else {
                res.status(200).json(pokemon)
            }
        })
})

router.post('/', (req, res) => {
    Pokemon.add(req.body)
    .then(pokemon => {
        if (!pokemon.poke_name) {
            res.status(401).json({ message: 'pokemon name is required' })
        } else {
            const addedPokemon = {poke_id: pokemon.poke_id, poke_name: pokemon.poke_name, poke_type: pokemon.poke_type}
            res.status(201).json(addedPokemon)
        }
    })
})

module.exports = router