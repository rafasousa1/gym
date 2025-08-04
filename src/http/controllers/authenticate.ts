import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repositories'
import { Authenticate } from '@/use-case/authenticator'
import { InvalidCredentials } from '@/use-case/errors/invalid-credentials-error'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
    const usersBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = usersBodySchema.parse(req.body)

    try {
        const userRepository = new PrismaUserRepository()
        const authenticateUseCase = new Authenticate(userRepository)

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