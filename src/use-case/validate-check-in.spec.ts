import { expect, describe, it, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory-database/in-memory-database-checkin'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new ValidateCheckInUseCase(checkInRepository)

        vi.useFakeTimers() // antes usa datas ficticias (mock)

    })

    afterEach(() => {
        vi.useRealTimers() // depois usa as datas reais (no mock)
    })

    it('possivel mostrar fazer a validação do check in', async () => {
        const CreatedcheckIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkIn } = await sut.execute({
            checkInId: CreatedcheckIn.id
        })
             
        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it('não é possivel validar um check-in inexistente', async () => {
        await expect(() => 
            sut.execute({
                checkInId: 'inexistente'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('não é possivel o checkin ser validado depois de 20 min criado', async () => {
        vi.setSystemTime(new Date(2025, 0, 1, 13, 20)) // data criada

         const CreatedcheckIn = await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const twentyFourMinutesInsSec = 1000 * 60 * 24 // avançando 22 mintus da data criada

        vi.advanceTimersByTime(twentyFourMinutesInsSec)

        await expect(() => sut.execute({
            checkInId: CreatedcheckIn.id
        })).rejects.toBeInstanceOf(Error)
    })
})
