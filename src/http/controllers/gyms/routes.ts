import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/hook/verify-jwt'

import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'

export default async function gymsRoutes(app: FastifyInstance) { // separando controller de usuários e de academias
    app.addHook('onRequest', verifyJWT) // todas as rotas aqui vão chamar o hook do JWT

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)

    app.post('/gyms', create)
}
