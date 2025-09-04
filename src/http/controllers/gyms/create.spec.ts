import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'

describe('Create Gym (e2e)', () => {
    beforeAll( async () => {
        await app.ready() // esperar que o app esteja pronto para rodar
    })

    afterAll( async () => {
        await app.close() // depois que tudo rodar espero que o app encerre
    })

    it('possivel de criar academia', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const response = await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`) // faço a chamada para o perfil
        .send({
            title: 'Ts-Gym',
            description: 'description...',
            phone: '1199898',
            latitude: -27.6003306,
            longitude: -45.6744122
        })

        expect(response.statusCode).toEqual(201)
    })
})

