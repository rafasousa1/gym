import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
    beforeAll( async () => {
        await app.ready() // esperar que o app esteja pronto para rodar
    })

    afterAll( async () => {
        await app.close() // depois que tudo rodar espero que o app encerre
    })

    it('possível autenticar o usuário', async () => {
        await request(app.server) // criando a conta primeiro
        .post('/users')
        .send({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456'
        })

        const response = await request(app.server) // validando login do usuário
        .post('/sessions')
        .send({
            email: 'horacio@email.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String) // espero que o token seja retornado
        })
    })
})
