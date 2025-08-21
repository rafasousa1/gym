# App

GymPass style app.

## Requisitos Funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados do usuário logado;
- [x] Deve ser possível o usuário ver o histórico dos check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (10km);
- [x] Deve ser possível o usuários buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in do usuário;
- [x] Deve ser possível cadastrar uma academia;

## Regras de Negócio

- [x] O usuário não deve se cadastrar com um e-mail existente;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 min após criado;
- [ ] O check-in só pode ser validado por admininstradores !;
- [ ] A academia só pode ser cadastrada por administradores !;
 
## Requisitos não funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
