import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
    findById(id: string) : Promise<Gym | null>
    searchMany(search: string, page: number) : Promise<Gym[]>
    create(data: Prisma.GymCreateInput) : Promise<Gym>
}