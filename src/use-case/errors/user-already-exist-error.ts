export class UserAlreadyExist extends Error {
    constructor() {
        super('Este email já existe!')
    }
}