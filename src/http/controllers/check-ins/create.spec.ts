import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
    beforeAll( async () => {
        await app.ready() // esperar que o app esteja pronto para rodar
    })

    afterAll( async () => {
        await app.close() // depois que tudo rodar espero que o app encerre
    })

    it('possivel de criar check-in', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data: {
                title: 'Js-Gym',
                latitude: -27.6003306,
                longitude: -45.6744122
            }
        })

        const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
        .set('Authorization', `Bearer ${token}`) // faço a chamada para o perfil
        .send({
            latitude: -27.6003306,
            longitude: -45.6744122
        })

        expect(response.statusCode).toEqual(201)
    })
})
