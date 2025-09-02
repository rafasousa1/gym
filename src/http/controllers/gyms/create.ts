import { makeCreateGymUseCase } from '@/use-case/factories/make-create-gym-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => { // me traz o valor, e passo ele ou não (true ou false)
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine(value => { // me traz o valor, e passo ele ou não (true ou false)
            return Math.abs(value) <= 180
        })
    })

    const { title, description, phone, latitude, longitude } = createGymBodySchema.parse(req.body)

        const createGymUseCase = makeCreateGymUseCase() // como o caso de uso não tem nenhuma validação de erro, não coloco o try catch
        
        await createGymUseCase.execute({
           title,
           description,
           phone,
           latitude,
           longitude
        })

        return reply.status(201).send()
    }
