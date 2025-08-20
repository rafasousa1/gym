import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearby { // fica mais descritivel definir o que é latitude e o que é longitude
    latitude: number
    longitude: number
}

export interface GymsRepository {
    findById(id: string) : Promise<Gym | null>
    searchMany(search: string, page: number) : Promise<Gym[]>
    findManyNearby(params: FindManyNearby) : Promise<Gym[]>
    create(data: Prisma.GymCreateInput) : Promise<Gym>
}