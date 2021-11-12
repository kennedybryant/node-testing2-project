const Pokemon = require('./pokemon-model')
const db = require('../../data/db-config')
const { pokemon } = require('../../data/seeds/01-pokemon')

test('is testing environment', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
  
beforeEach(async () => {
    await db.seed.run()
})
  
afterAll(async () => {
    await db.destroy()
})

describe('Pokemon model', () => {
    describe('get()', () => {
        let data
        beforeEach(async () => {
            data = await Pokemon.get()
        })
        test('responds with all pokemon', async () => {
            expect(data.length).toBe(5)
        })
        test('responds with the correct shape', async () => {
            expect(data).toMatchObject(pokemon)
            expect(data).toEqual([
                {
                    "pokemon_id": 1, 
                    "poke_name": 'Pikachu', 
                    "poke_type": 'Electric'
                },
                {
                    "pokemon_id": 2,
                    "poke_name": 'Eevee', 
                    "poke_type": 'Normal'
                },
                {
                    "pokemon_id": 3,
                    "poke_name": 'Bulbasaur', 
                    "poke_type": 'Grass'
                },
                {
                    "pokemon_id": 4,
                    "poke_name": 'Squirtle', 
                    "poke_type": 'Water'
                },
                {
                    "pokemon_id": 5,
                    "poke_name": 'Charmander', 
                    "poke_type": 'Fire'
                },
            ])
        })
    })
    describe('getById()', () => {
        test('responds with correct pokemon', async () => {
            const data = await Pokemon.getById('1')
            expect(data).toMatchObject({ pokemon_id: 1, poke_name: 'Pikachu', poke_type: 'Electric' })
        })
    })
    describe('add()', () => {
        test('responds with a new pokemon', async () => {
            const data = await Pokemon.add({ poke_name: "Jigglypuff", poke_type: "Fairy" })
            expect(data).toMatchObject({ pokemon_id: 6, poke_name: "Jigglypuff", poke_type: "Fairy" })
        })
    })
})