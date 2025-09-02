import { UserAlreadyExist } from '@/use-case/errors/user-already-exist-error'
import { makeRegisterUseCase } from '@/use-case/factories/make-register-use-case'
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
        const registerUseCase = makeRegisterUseCase()
        
        await registerUseCase.execute({
            name, email, password
        })

    } catch (err) {
        if (err instanceof UserAlreadyExist) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
    }

    return reply.status(201).send()
}
