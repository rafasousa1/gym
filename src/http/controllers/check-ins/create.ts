import { makeChecInseCase } from '@/use-case/factories/make-check-in-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine(value => { // me traz o valor, e passo ele ou não (true ou false)
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => { // me traz o valor, e passo ele ou não (true ou false)
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = createCheckInBodySchema.parse(req.body)
    const { gymId } = createCheckInParamsSchema.parse(req.params) // passando o id pelo parametro da URL

        const checkInUseCase = makeChecInseCase()
        
        await checkInUseCase.execute({
            gymId,
            userId: req.user.sub,
            userLatitude: latitude,
            userLongitude: longitude,
        })

        return reply.status(201).send()
    }
