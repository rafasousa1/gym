import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/hook/verify-jwt'

import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'

export default async function CheckInsRoutes(app: FastifyInstance) { // separando controller de usuários e de academias
    app.addHook('onRequest', verifyJWT) // todas as rotas aqui vão chamar o hook do JWT

    app.get('/check-ins/hisotry', history)
    app.get('/check-ins/metrics', metrics)

    app.post('/gyms/:gymId/check-ins', create) // procurando academia pelo id para fazer o check-in
    app.patch('/check-ins/:checkInId/validate', validate) // mudar só uma única informação, validando um check-in existente
}
