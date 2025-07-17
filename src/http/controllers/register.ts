import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repositories'
import { UserAlreadyExist } from '@/use-case/errors/user-already-exist-error'
import { RegisterUseCase } from '@/use-case/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, reply: FastifyReply) {
    const usersBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = usersBodySchema.parse(req.body)

    try {
        const userRepository = new PrismaUserRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        await registerUseCase.execute({
            name, email, password
        })

    } catch (err) {
        if (err instanceof UserAlreadyExist) {
            return reply.status(409).send({ message: err.message })
        }

        return reply.status(500).send()
    }

    return reply.status(201).send()
}