export class LateCheckInValidationError extends Error {
    constructor() {
        super('Validação feita tarde demais, só pode ser validada até 20 minutos de sua criação')
    }
}