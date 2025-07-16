import { InMemoryUsersRepository } from '@/repositories/in-memory-repositories'
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
        const userRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(userRepository)

        await registerUseCase.execute({
            name, email, password
        })

    } catch (err) {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}