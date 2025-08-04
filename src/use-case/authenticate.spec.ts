import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database/in-memory-database-users'
import { Authenticate } from './authenticator'
import { hash } from 'bcryptjs'
import { InvalidCredentials } from './errors/invalid-credentials-error'


describe('Register Use Case', () => {
    it('possivel autenticar um usuário', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new Authenticate(usersRepository)

    await usersRepository.create({
        name: 'Horácio',
        email: 'horacio@email.com',
        password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
        email: 'horacio@email.com',
        password: '123456',
    })
    
        expect(user.id).toEqual(expect.any(String))
    })

    it('não é possivel autenticar com um email errado', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new Authenticate(usersRepository)

    expect(() => 
        sut.execute({
        email: 'horacio@email.com',
        password: '123456',
     })
    ).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it('não é possivel autenticar com uma senha errada', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new Authenticate(usersRepository)

    await usersRepository.create({
        name: 'Horácio',
        email: 'horacio@email.com',
        password_hash: await hash('123456', 6)
    })

    expect(() => 
        sut.execute({
        email: 'horacio@email.com',
        password: '123123',
     })
    ).rejects.toBeInstanceOf(InvalidCredentials)
    })
})
