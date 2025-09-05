import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-auth-user'
import { prisma } from '@/lib/prisma'

describe('Check-in Metrics (e2e)', () => {
    beforeAll( async () => {
        await app.ready() // esperar que o app esteja pronto para rodar
    })

    afterAll( async () => {
        await app.close() // depois que tudo rodar espero que o app encerre
    })

    it('possivel de ver métricas de check-ins', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -27.6003306,
                longitude: -45.6744122
            }
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
                {
                    gym_id: gym.id,
                    user_id: user.id
                }
            ]
        })

        const response = await request(app.server)
        .get('/check-ins/metrics')
        .set('Authorization', `Bearer ${token}`) // faço a chamada para o perfil
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(2)
    })
})
