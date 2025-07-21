import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
    it('possível de fazer o hash da senha', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null
            },

            async create(data) {
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }
            },
        })

        const { user } = await registerUseCase.execute({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456',
        })
        
        const isPasswordHashed = await compare('123456', user.password_hash)
        expect(isPasswordHashed).toBe(true)
    })
})