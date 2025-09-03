import { makeGetUserMetricsUseCase } from '@/use-case/factories/make-get-user-metrics'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase()
        
    const { checkInsCount } = await getUserMetricsUseCase.execute({
        userId: req.user.sub
    })

    return reply.status(200).send(
        checkInsCount
    )
}
