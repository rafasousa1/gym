import { hash } from 'bcryptjs'
import { UserRepository } from '@/repositories/user-repository'
import { UserAlreadyExist } from './errors/user-already-exist-error'

interface RegisterUseCaseRegister {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ name, email, password,}: RegisterUseCaseRegister) {

    const password_hash = await hash(password, 6) // hash da senha 6 rounds

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
        throw new UserAlreadyExist()
    }

    await this.userRepository.create({
        name,
        email,
        password_hash,
    })
    }
}