# Hours Counter
Esse repositório guarda os arquivos do projeto Hours Counter.

## Descrição

A ideia do projeto é ser um ambiente de estudo, desenvolvido durante o meu tempo livre, com o objetivo de construir uma API Rest para guardar o tempo que um usuário gasta para realizar uma determinada atividade, assim exercitando vários conceitos e boas práticas do desenvolvimento backend. 

## Como o projeto está atualmente
 Em desenvolvimento...

## Tecnologias utilizadas
1. NodeJS
2. NestJS
3. Typescript
4. MongoDB
5. Jest e Supertest - para testes
6. Docker

## Requisitos iniciais:

1. [X] - Usuário pode criar uma conta(email deve ser unico)
2. [X] - Usuário pode fazer o login
3. [x] - Usuário pode listar suas informações (falta adicionar necessidade de autenticação nessa rota)
4. [ ] - Usuário pode listar as atividades já cadastradas com o seu respectivo tempo e descrição
5. [ ] - Usuário pode cadastrar uma nova atividade junto do seu tempo de duração
6. [ ] - Usuário pode adicionar horas/minutos as atividades já cadastradas
7. [ ] - Usuário pode cadastrar uma nova categoria de atividade, assim como a descrição opicional e o tempo gasto nela
8. [ ] - Usuário pode ter tanto o total de horas gasto como o quanto foi gasto em qual dia. 

## Requisitos Futuros

1. [ ] - Usuário pode resetar a senha

## Rotas Iniciais
### 1. POST /user

Rota utilizada para criar um cliente no qual recebe os parametros abaixo no body:

```tsx
{
  "name": string,
  "email": string,
  "phone": string,
  "password": string
}
```

## 2. POST /user/login

Rota utilizada para autenticar usuário e devolver o token jwt para ser utilizado nas outras rotas protegidas. 

Parametros body: 

```tsx
{
  "email": string,
  "password": string
}
```

## 3. GET /user/activities

Rota utilizada para listar as atividades do cliente(retornar o total na resposta do body)

Parametros body: 

```tsx
{
  "page"?: number,
  "perPage"?: number, 
}
```

## 4. GET /user/:userId

Rota utilizada para pegar as informações do cliente, a identificação do usuário será feita pelo JWT token. 

## 5. POST /user/activities

Rota utilizada para cadastrar uma nova atividade

Parametros body: 

```tsx
{
  "name": string,
  "decription": string,
  "category": string, // DEVE SER UMA CATEGORIA JÀ CADASTRADA
  "timeSpend": number, // TEMPO EM MINUTOS
}
```

## 6. POST /user/activities/category

Rota utilizada para cadastrar uma nova categoria

Parametros body: 

```tsx
{
  "name": string,
  "decription": string,
}
```

## 7. PUT /user/activities/:id

Rota utilizada para atualizar uma atividade 

Parametros body: 

```tsx
{
  "name": string,
  "decription": string,
  "category": string, // DEVE SER UMA CATEGORIA JÀ CADASTRADA
  "timeSpend": string, // TEMPO EM MINUTOS 
}
```