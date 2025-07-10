import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

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

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash
        }
    })
}