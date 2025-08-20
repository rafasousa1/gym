import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory-database/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'


let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchGymsUseCase(gymsRepository)
    })

    it('possivel buscar uma academia', async () => {
        await gymsRepository.create({
            title: 'JS-Gym',
            description: null,
            phone: null,
            latitude: -27.6003306,
            longitude: -45.6744122
        })

        await gymsRepository.create({
            title: 'TS-Gym',
            description: null,
            phone: null,
            latitude: -27.6003306,
            longitude: -45.6744122
        })

        const { gyms } = await sut.execute({
            search: 'JS',
            page: 1
        })
             
        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JS-Gym', }),
        ])
    })

    it('possivel mostrar busca paginada das academias', async () => {
        for(let i = 1; i <= 22; i++) {
        await gymsRepository.create({
            title: `TS-Gym ${i}`,
            description: null,
            phone: null,
            latitude: -27.6003306,
            longitude: -45.6744122
            })
        }

        const { gyms } = await sut.execute({
            search: 'TS',
            page: 2
        })
             
        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'TS-Gym 21' }),
            expect.objectContaining({ title: 'TS-Gym 22' }),
        ])
    })
})