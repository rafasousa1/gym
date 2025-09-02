import { makeSearchGymsUseCase } from '@/use-case/factories/make-search-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
        search: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { search, page } = searchGymsQuerySchema.parse(req.body)

        const createGymUseCase = makeSearchGymsUseCase() // como o caso de uso não tem nenhuma validação de erro, não coloco o try catch
        
        const { gyms } = await createGymUseCase.execute({
            search,
            page
        })

        return reply.status(200).send(
            gyms
        )
    }
