import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory-database/in-memory-database-checkin'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
    beforeEach(async () => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new GetUserMetricsUseCase(checkInRepository)
    })

    it('possivel mostrar contagem de check-ins feitos', async () => {
        await checkInRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        })
             
        expect(checkInsCount).toEqual(2)
    })
})