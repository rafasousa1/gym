import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) { // funçãp que cria e autentica o usuário, para não se repetir em todos os testes
    await request(app.server) // criando a conta primeiro
        .post('/users')
        .send({
            name: 'Horácio',
            email: 'horacio@email.com',
            password: '123456'
        })

    const authResponse = await request(app.server) // validando login do usuário
        .post('/sessions')
        .send({
            email: 'horacio@email.com',
            password: '123456'
    })

    const { token } = authResponse.body // pego o token do login

    return { token }
}
