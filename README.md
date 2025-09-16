# API de Transferências

Esta API permite login, registro de usuários, consulta de usuários e transferência de valores, com regras básicas para aprendizado de testes e automação de API.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente.
2. Instale as dependências:

```bash
npm install express swagger-ui-express
```

## Como rodar

```bash
node src/server.js
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

- `POST /api/auth/login` — Login de usuário
- `POST /api/users/register` — Registro de usuário
- `GET /api/users` — Consulta de usuários
- `POST /api/transfer` — Transferência de valores
- `GET /api-docs` — Documentação Swagger

## Regras de negócio

- Login exige usuário e senha.
- Não é possível registrar usuários duplicados.
- Transferências para destinatários não favorecidos só podem ser realizadas se o valor for menor que R$ 5.000,00.
- Banco de dados em memória (variáveis).

## Testes

Para testar a API, utilize ferramentas como Postman, Insomnia ou scripts automatizados com Supertest.

## Documentação

Acesse `/api-docs` para visualizar e testar os endpoints via Swagger UI.

## API GraphQL

A API GraphQL está disponível em `/graphql` usando ApolloServer.

### Como rodar

```bash
node src/server.js
```

### Como acessar
- Playground GraphQL: http://localhost:3000/graphql

### Bibliotecas necessárias
Execute:
```bash
npm install apollo-server-express graphql
```

### Exemplos de queries e mutations

#### Listar usuários
```graphql
query {
  users {
    username
    favorecidos
    saldo
  }
}
```

#### Registrar usuário
```graphql
mutation {
  registerUser(username: "novo", password: "123456", favorecidos: ["alle"]) {
    username
    favorecidos
    saldo
  }
}
```

#### Login
```graphql
mutation {
  login(username: "alle", password: "123456")
}
```

#### Listar transferências
```graphql
query {
  transfers {
    from
    to
    amount
    date
  }
}
```

#### Realizar transferência
```graphql
mutation {
  transfer(from: "alle", to: "desa", amount: 100) {
    from
    to
    amount
    date
  }
}
```
