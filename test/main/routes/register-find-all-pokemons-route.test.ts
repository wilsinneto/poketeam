import request from 'supertest'

import app from '@/main/config/app'

describe('Find all pokemons route', () => {
  test('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/find-all-pokemons')
      .expect(200)
  })
})
