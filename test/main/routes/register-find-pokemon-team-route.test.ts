import request from 'supertest'

import app from '@/main/config/app'

describe('Find pokemon team route', () => {
  test('should return an account on success', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })

    const response = await request(app)
      .post('/api/create-pokemon-team')
      .send({
        name: 'Any_name',
        pokemons: [],
      })

    const route = `/api/find-pokemon-team/${response.body.name}`
    await request(app)
      .get(route)
      .send()
      .expect(200)
  })
})
