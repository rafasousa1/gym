import { makeFetchNearbyGymsUseCase } from '@/use-case/factories/make-fetch-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearby(req: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
        latitude: z.number().refine(value => { // me traz o valor, e passo ele ou não (true ou false)
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => { // me traz o valor, e passo ele ou não (true ou false)
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query)

        const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase() // como o caso de uso não tem nenhuma validação de erro, não coloco o try catch
        
        const { gyms } = await fetchNearbyGymUseCase.execute({
            userLatitude: latitude,
            userLongitude: longitude
        })

        return reply.status(200).send(
            gyms
        )
    }
