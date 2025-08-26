import { InvalidCredentials } from '@/use-case/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-case/factories/make-authenticate-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
    const usersBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = usersBodySchema.parse(req.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        await authenticateUseCase.execute({
            email, password
        })

    } catch (err) {
        if (err instanceof InvalidCredentials) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }

    return reply.status(200).send()
}
