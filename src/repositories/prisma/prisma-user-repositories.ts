import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class PrismaUserRepository implements UserRepository {
    
    findById(id: string): Promise<User | null> {
        throw new Error('Method not implemented.')
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({ // verificando se o email existe
        where: {
            email,
        }
    })
        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }
}