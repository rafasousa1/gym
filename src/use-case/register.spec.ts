import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory-database/in-memory-database-users'
import { UserAlreadyExist } from './errors/user-already-exist-error'

describe('Register Use Case', () => {
    it('possivel de criar um usuário', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456',
    })
        expect(user.id).toEqual(expect.any(String))
    })

    it('possível de fazer o hash da senha', async () => {
       const usersRepository = new InMemoryUsersRepository()
       const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456',
        })
        
        const isPasswordHashed = await compare('123456', user.password_hash)
        expect(isPasswordHashed).toBe(true)
    })

    it('possivel de verificar se o email foi registrado duas vezes', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'horacio@email.com'

        await registerUseCase.execute({
            name: 'Horácio',
            email,
            password: '123456',
        })

        expect(() => 
            registerUseCase.execute({
                name: 'Horácio',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExist)
    })
})
