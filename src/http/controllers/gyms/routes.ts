import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/hook/verify-jwt'

export default async function gymsRoutes(app: FastifyInstance) { // separando controller de usuários e de academias
    app.addHook('onRequest', verifyJWT) // todas as rotas aqui vão chamar o hook do JWT


}