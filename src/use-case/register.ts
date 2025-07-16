import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUseCaseRegister {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private userRepository: any) {}

    async execute({ name, email, password,}: RegisterUseCaseRegister) {

    const password_hash = await hash(password, 6) // hash da senha 6 rounds

    const userWithSameEmail = await prisma.user.findUnique({ // verificando se o email existe
        where: {
            email,
        }
    })

    if (userWithSameEmail) {
        throw new Error('Este email já existe!')
    }

    await this.userRepository.create({
        name,
        email,
        password_hash,
    })
    }
}