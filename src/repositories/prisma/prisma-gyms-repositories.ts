import { Gym, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FindManyNearby, GymsRepository } from '../gym-repository'

export class PrismaGymsRepositories implements GymsRepository {
    async findById(id: string) {
        const gym = await prisma.gym.findUnique({
            where: {
                id,
            }
        })

        return gym
    }
    async searchMany(search: string, page: number) {
        const gyms = await prisma.gym.findMany({
            where: {
                title: {
                    contains: search
                },
            },

            take: 20,
            skip: (page -1) * 20
        })

        return gyms
    }
    async findManyNearby({ latitude, longitude }: FindManyNearby) {
        const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }
    async create(data: Prisma.GymCreateInput) {
        const gym = await prisma.gym.create({
            data,
        })

        return gym
    }
}
