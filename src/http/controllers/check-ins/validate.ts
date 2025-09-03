import { makeChecInseCase } from '@/use-case/factories/make-check-in-use-case'
import { makeValidateCheckInUseCase } from '@/use-case/factories/make-validate-checkin-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function validate(req: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })

    const { checkInId } = validateCheckInParamsSchema.parse(req.params) // passando o id pelo parametro da URL

        const validateCheckInUseCase = makeValidateCheckInUseCase()
        
        await validateCheckInUseCase.execute({
            checkInId
        })

        return reply.status(204).send()
    }
