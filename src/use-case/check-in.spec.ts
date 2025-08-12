import { expect, describe, it, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory-database/in-memory-database-checkin'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInRepository)

        vi.useFakeTimers() // antes usa datas ficticias (mock)
    })

    afterEach(() => {
        vi.useRealTimers() // depois usa as datas reais (no mock)
    })

    it('possivel mostrar fazer check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })
             
        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('não é possivel fazer check in duas vezes no mesmo dia', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0)) // ano mes dia hora, min, sec (setando uma data para o teste rodar)

    await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
    })
             
    await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })
        ).rejects.toBeInstanceOf(Error)
    })

    it('possivel fazer check in duas vezes em dias diferentes', async () => {
    vi.setSystemTime(new Date(2025, 0, 20, 8, 0, 0)) // ano mes dia hora, min, sec (setando uma data para o teste rodar)

    await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
    })

    vi.setSystemTime(new Date(2025, 0, 21, 8, 0, 0))
             
    const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})
