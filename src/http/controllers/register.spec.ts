import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
    beforeAll( async () => {
        await app.ready() // esperar que o app esteja pronto para rodar
    })

    afterAll( async () => {
        await app.close() // depois que tudo rodar espero que o app encerre
    })

    it('possível registrar', async () => {
        const response = await request(app.server)
        .post('/users')
        .send({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(201)
    })
})
