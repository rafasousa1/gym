import { makeGetUserCheckInHistoryUseCase } from '@/use-case/factories/make-fetch-user-check-in-history-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryQuerySchema.parse(req.query)

        const fetchUserCheckInHistory = makeGetUserCheckInHistoryUseCase()
        
        const { checkIns } = await fetchUserCheckInHistory.execute({
            userId: req.user.sub,
            page
        })

        return reply.status(200).send(
            checkIns
        )
    }
