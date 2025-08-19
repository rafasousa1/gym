import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory-database/in-memory-database-checkin'
import { FetchUsersCheckInsHistoryUseCase } from './fetch-user-checkin-history'

let checkInRepository: InMemoryCheckInRepository
let sut: FetchUsersCheckInsHistoryUseCase

describe('Fetch User History Checkin Use Case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new FetchUsersCheckInsHistoryUseCase(checkInRepository)
    })

    it('possivel mostrar histórico dos check-ins', async () => {
        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1
        })
             
        expect(checkIns).toHaveLength(2)
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-01' }),
            expect.objectContaining({ gym_id: 'gym-02' })
        ])
    })

    it('possivel mostrar histórico dos check-ins paginado', async () => {
        for(let i = 1; i <= 22; i++) { // CRIO 22 CHECK-INS com o for
        await checkInRepository.create({
            gym_id: `gym-${i}`,
            user_id: 'user-01'
            })
        }

        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2
        })
             
        expect(checkIns).toHaveLength(2) // quero que na segunda página retorne os 2 últimos
        expect(checkIns).toEqual([
            expect.objectContaining({ gym_id: 'gym-21' }),
            expect.objectContaining({ gym_id: 'gym-22' })
        ])
    })
})