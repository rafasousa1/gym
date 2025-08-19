import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-database/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
    beforeEach(() => {
            gymsRepository = new InMemoryGymsRepository()
            sut = new CreateGymUseCase(gymsRepository)
        })

    it('possivel de criar uma academia', async () => {
    const { gym } = await sut.execute({
        title: 'gym-js',
        description: null,
        phone: null,
        latitude: -27.6003306,
        longitude: -45.6744122
    })
    
        expect(gym.id).toEqual(expect.any(String))
    })
})