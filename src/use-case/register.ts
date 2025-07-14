import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/prisma-user-repositories'

interface RegisterUseCaseRegister {
    name: string
    email: string
    password: string
}

export async function registerUseCase({
    name,
    email,
    password,
}: RegisterUseCaseRegister) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if (userWithSameEmail) {
        throw new Error('Este email já existe!')
    }

    const userRepository = new PrismaUserRepository()

    await userRepository.create({
        name,
        email,
        password_hash,
    })
}