import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
    beforeAll( async () => {
        await app.ready() // esperar que o app esteja pronto para rodar
    })

    afterAll( async () => {
        await app.close() // depois que tudo rodar espero que o app encerre
    })

    it('possível retornar o perfil do usuário', async () => {
        await request(app.server) // criando a conta primeiro
        .post('/users')
        .send({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456'
        })

        const authResponse = await request(app.server) // validando login do usuário
        .post('/sessions')
        .send({
            email: 'horacio@email.com',
            password: '123456'
        })

        const { token } = authResponse.body // pego o token do login

        const profileResponse = await request(app.server)
        .get('/me')
        .set('Authorization', `Bearer ${token}`) // faço a chamada para o perfil
        .send()

        expect(profileResponse.statusCode).toEqual(200)
         expect(profileResponse.body).toEqual( // espero que na resposta do perfil, tenha o email do user validado
            expect.objectContaining({
            email: 'horacio@email.com',
         })
        )
    })
})
