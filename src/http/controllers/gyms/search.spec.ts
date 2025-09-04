import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'

describe('Search Gyms (e2e)', () => {
    beforeAll( async () => {
        await app.ready() // esperar que o app esteja pronto para rodar
    })

    afterAll( async () => {
        await app.close() // depois que tudo rodar espero que o app encerre
    })

    it('possivel de buscar academia', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`) // faço a chamada para o perfil
        .send({
            title: 'Typescript Gym',
            description: 'description...',
            phone: '1199898',
            latitude: -27.6003306,
            longitude: -45.6744122
        })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`) // faço a chamada para o perfil
        .send({
            title: 'Js Gym',
            description: 'description...',
            phone: '1199898',
            latitude: -27.6003306,
            longitude: -45.6744122
        })

        const response = await request(app.server)
        .get('/gyms/search')
        .query({
            search: 'Typescript',
        })
        .set('Authorization', `Bearer ${token}`)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Typescript Gym'
            })
        ])
    })
})
