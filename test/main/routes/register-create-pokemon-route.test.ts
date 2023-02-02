import request from 'supertest'

import app from '@/main/config/app'

describe('Register create pokemon route', () => {
  test('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/create-pokemon')
      .send({
        teamId: '',
        name: 'Any name',
        imageUrl: '',
        specie: 'any_specie',
      })
      .expect(201)
  })
})
