# INFO SISTEMAS - DESAFIO

A api foi gerada seguindo os padrões do Clean Architecture, criando assim uma aplicação escalavel e de facil manutenção.

## Começando

---

### Instale as dependencias

```js
yarn install
```

### Inicie o servidor

```js
yarn dev
```

## Rotas disponíveis

---

- Lista de Veículos

```rest
  GET /vehicles
```

- Ver dados de um Veículo pelo id

```rest
  GET /vehicles/:id
```

- Alterar dados de veículo pelo id

```rest
  PUT /vehicles/:id
  {
    "placa": "XXX9999",
    "chassi": "XXXXXXXXXXXXXXXXX",
    "renavam": "99999999999",
    "modelo": "nome do modelo",
    "marca": "nome da marca",
    "ano": 2014,
  }
```

- Criar novos registros de veículo

```rest
  POST /vehicles/:id
  {
    "placa": "XXX9999",
    "chassi": "XXXXXXXXXXXXXXXXX",
    "renavam": "99999999999",
    "modelo": "nome do modelo",
    "marca": "nome da marca",
    "ano": 2014,
  }
```

- Remover veículo pelo id

```rest
  DELETE /vehicles/:id
```
