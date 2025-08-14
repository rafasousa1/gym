import { expect, describe, it, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory-database/in-memory-database-checkin'
import { InMemoryGymsRepository } from '@/repositories/in-memory-database/in-memory-gyms-repository'
import { CheckInUseCase } from './check-in'
import { Decimal } from '@prisma/client/runtime/library'


let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        gymsRepository = new InMemoryGymsRepository()
        
        sut = new CheckInUseCase(checkInRepository, gymsRepository)

        vi.useFakeTimers() // antes usa datas ficticias (mock)

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'js-gym',
            description: '',
            phone: '11',
            latitude: new Decimal(0),
            longitude: new Decimal(0)
        })  
    })

    afterEach(() => {
        vi.useRealTimers() // depois usa as datas reais (no mock)
    })

    it('possivel mostrar fazer check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })
             
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('não é possivel fazer check in duas vezes no mesmo dia', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0)) // ano mes dia hora, min, sec (setando uma data para o teste rodar)

    await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
    })
             
    await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })
        ).rejects.toBeInstanceOf(Error)
    })

    it('possivel fazer check in duas vezes em dias diferentes', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0)) // ano mes dia hora, min, sec (setando uma data para o teste rodar)

    await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
    })

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))
             
    const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('possivel mostrar fazer check in', async () => {
         gymsRepository.items.push({
            id: 'gym-02',
            title: 'js-gym',
            description: '',
            phone: '11',
            latitude: new Decimal(-23.6003306),
            longitude: new Decimal(-46.6744122)
        })
                   
        await expect(() => sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -27.6003306,
            userLongitude: -45.6744122
        })
        ).rejects.toBeInstanceOf(Error)
    })
})