import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database/in-memory-database-users'
import { UserAlreadyExist } from './errors/user-already-exist-error'

// const usersRepository = new InMemoryUsersRepository()
// const registerUseCase = new RegisterUseCase(usersRepository)

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    it('possivel de criar um usuário', async () => {
        beforeEach(() => {
            usersRepository = new InMemoryUsersRepository()
            sut = new RegisterUseCase(usersRepository)
        })

    const { user } = await sut.execute({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456',
    })
    
        expect(user.id).toEqual(expect.any(String))
    })

    it('possível de fazer o hash da senha', async () => {

        const { user } = await sut.execute({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456',
        })
        
        const isPasswordHashed = await compare('123456', user.password_hash)
        expect(isPasswordHashed).toBe(true)
    })

    it('possivel de verificar se o email foi registrado duas vezes', async () => {

        const email = 'horacio@email.com'

        await sut.execute({
            name: 'Horácio',
            email,
            password: '123456',
        })

        await expect(() => // sempre que tiver um reject devo colocar o await
            sut.execute({
                name: 'Horácio',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExist)
    })
})
