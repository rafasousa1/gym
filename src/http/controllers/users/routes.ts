import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/hook/verify-jwt'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

export default async function usersRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    // Authenticated
    app.get('/me', { onRequest: [verifyJWT] }, profile)
}
