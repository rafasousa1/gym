import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gym-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
    public items: Gym[] = []

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id)

        if (!gym) {
            return null
        }

        return gym
    }

    async searchMany(search: string, page: number) {
        return this.items.filter(item => item.title.includes(search))
        .slice((page - 1) * 20, page * 20)
    }

    async create(data: Prisma.GymCreateInput) {
                const gym = {
                    id: data.id ?? randomUUID(), // se ja tiver id, usa ele, senão cria um novo
                    title: data.title,
                    description: data.description ?? null, // o prisma não aceita undefined, então se não existir vai ser nulo
                    phone: data.phone ?? null, // o prisma não aceita undefined, então se não existir vai ser nulo
                    latitude: new Prisma.Decimal(data.latitude.toString()), // tipo do prisma quando for um number
                    longitude: new Prisma.Decimal(data.longitude.toString()), // tipo do prisma quando for um number
                    created_at: new Date()
                }
    
                this.items.push(gym)
    
                return gym
        }
}
