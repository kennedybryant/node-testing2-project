const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')

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

describe('[GET] /api/pokemon', () => {
    test('responds with all pokemon', async () => {
        const res = await request(server).get('/api/pokemon')
        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(5)
    })
})

describe('[GET] /api/pokemon/:id', () => {
    test('responds with one pokemon', async () => {
        const res = await request(server).get('/api/pokemon/1')
        expect(res.status).toBe(200)
        expect(res.body).toMatchObject({ pokemon_id: 1, poke_name: 'Pikachu', poke_type: 'Electric'})
    })
    test('responds with correct status and error when a pokemon with that id does not exist', async () => {
        const res = await request(server).get('/api/pokemon/6')
        expect(res.status).toBe(404)
        expect(res.body.message).toBe('could not find pokemon')
    })
})

describe('[POST] /api/pokemon', () => {
    test('responds with a newly created pokemon', async () => {
        const res = await request(server).post('/api/pokemon').send({  poke_name: 'Jigglypuff', poke_type: "Fairy" })
        expect(res.status).toBe(201)
    })
    test('responds with correct status and error when a name is not provided', async () => {
        const res = await request(server).post('/api/pokemon').send({  poke_name: '', poke_type: "Fairy" })
        expect(res.status).toBe(401)
        expect(res.body.message).toBe('pokemon name is required')
    })
})
