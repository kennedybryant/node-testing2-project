
exports.up = function(knex) {
  return knex.schema.createTable("pokemon", table => {
      table.increments('pokemon_id')
      table.string('poke_name', 100).unique().notNullable()
      table.string('poke_type', 100).notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pokemon')
}
