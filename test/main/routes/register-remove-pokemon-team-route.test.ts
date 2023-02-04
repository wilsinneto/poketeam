import request from 'supertest'

import app from '@/main/config/app'

describe('Register remove pokemon team route', () => {
  test('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    const response = await request(app)
      .post('/api/create-pokemon-team')
      .send({
        name: 'Any_name',
        pokemons: [],
      })

    await request(app)
      .post('/api/remove-pokemon-team')
      .send({
        id: response.body.id
      })
      .expect(200)
  })
})
