import { prisma } from '@/lib/prisma'
import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

function generateDataBaseURL(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Coloque primeiro a URL do banco de dados!')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema', schema)

    return url.toString()
}

export default <Environment> {
    name: 'prisma', 
    transformMode: 'ssr',
    async setup() {
        const schema = randomUUID()
        const databaseUrl = generateDataBaseURL(schema)

        console.log(databaseUrl)

        process.env.DATABASE_URL = databaseUrl // setando o schema

        execSync('npx prisma migrate deploy') // executa todas as migratinos dentro deste novo bd

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

                await prisma.$disconnect()
            }
        }
    }
}
