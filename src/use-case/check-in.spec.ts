import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database/in-memory-database-users'
import { hash } from 'bcryptjs'
import { GetUserProfile } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryCheckInRepository } from '@/repositories/in-memory-database/in-memory-database-checkin'
import { CheckInUseCase } from './check-in'

let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository()
        sut = new CheckInUseCase(checkInRepository)
    })

    it('possivel mostrar fazer check in', async () => {
    const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })
             
        expect(checkIn.id).toEqual(expect.any(String))
    })
})
