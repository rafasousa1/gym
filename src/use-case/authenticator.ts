import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { InvalidCredentials } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateUseRequest {
    email: string
    password: string
}

interface AuthenticateUseResponse {
    user: User
}

export class Authenticate {
    constructor(private user: UserRepository) {}

    async execute ({ email, password }: AuthenticateUseRequest): Promise<AuthenticateUseResponse> {
        const user = await this.user.findByEmail(email)

        if (!user) {
            throw new InvalidCredentials()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentials()
        }

        return { user }
    }
}