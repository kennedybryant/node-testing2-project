const pokemon = [
        {poke_name: 'Pikachu', poke_type: 'Electric'},
        {poke_name: 'Eevee', poke_type: 'Normal'},
        {poke_name: 'Bulbasaur', poke_type: 'Grass'},
        {poke_name: 'Squirtle', poke_type: 'Water'},
        {poke_name: 'Charmander', poke_type: 'Fire'},
]

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pokemon').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pokemon').insert(pokemon)
    })
}

exports.pokemon = pokemon
