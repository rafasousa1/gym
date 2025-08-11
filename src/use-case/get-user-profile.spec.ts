import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database/in-memory-database-users'
import { hash } from 'bcryptjs'
import { GetUserProfile } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfile

describe('Get User Profile Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfile(usersRepository)
    })

    it('possivel mostrar perfil de um usuário', async () => {
    const createdUser = await usersRepository.create({
        name: 'Horácio',
        email: 'horacio@email.com',
        password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
        userId: createdUser.id
    })

     expect(user.name).toEqual('Horácio')
    })

    it('não é possivel mostrar perfil de usuário com um id errado', async () => {

    await expect(() => 
        sut.execute({
        userId: 'non-existing-id'
     })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
