import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileUseRequest {
    userId: string
}

interface GetUserProfileUseResponse {
    user: User
}

export class GetUserProfile {
    constructor(private user: UserRepository) {}

    async execute ({ userId }: GetUserProfileUseRequest): Promise<GetUserProfileUseResponse> {
        const user = await this.user.findById(userId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        return { user }
    }
}
