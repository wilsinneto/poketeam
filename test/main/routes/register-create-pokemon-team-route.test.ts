import request from 'supertest'

import app from '@/main/config/app'

describe('Register create pokemon team route', () => {
  test('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/create-pokemon-team')
      .send({
        name: 'Any_name',
        pokemons: [],
      })
      .expect(201)
  })
})
