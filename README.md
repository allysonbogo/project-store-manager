# Store Manager
#### _by [Allyson Belli Bogo](https://www.linkedin.com/in/allysonbogo/)_

## :page_with_curl: Sobre

O projeto consolida a utilização da ferramenta Docker, Arquitetura de Software seguindo o modelo MSC e a criação de APIs RESTful com CRUD completo. Como desafio, foi criada uma API CRUD de uma loja, em que é possível ler, criar, editar e deletar produtos e vendas do banco de dados.

Este projeto utiliza o banco de dados relacional MySQL, e para manipulá-lo fizemos uso da biblioteca mysql/promise para o Node.js, que fornece uma interface baseada em promessas para executar consultas e interagir com um banco de dados MySQL.

Os testes foram desenvolvidos utilizando as ferramentas Mocha, Chai e Sinon, com cobertura de 100% do projeto.


## :man_technologist: Habilidades desenvolvidas

* Docker
* MySQL
* Node.js
* Arquitetura de Software seguindo o modelo MSC
* Construção de uma API CRUD
* Testes unitários com: Mocha, Chai e Sinon


## 🛠️ Ferramentas Utilizadas

* Docker
* MySQL
* Node.js
* Express.js
* Mocha.js
* Chai.js
* Sinon.js


## ⚙️ Como Executar

Para executar este projeto é necessario ter o Docker instalado.

<details>
  <summary> Passo a passo </summary>
  <br>

1. Clone o repositório em uma pasta de preferência

```
git clone git@github.com:allysonbogo/project-store-manager.git
```

2. Entre na pasta raíz do projeto e instale todas as dependências

```
npm install
```

3. Para rodar o projeto é necessario executar o comando abaixo no diretório `backend` do projeto. Isso fará com que os containers docker sejam orquestrados e a aplicação esteja disponível

```
docker-compose up -d
```
4. O servidor será inicializado juntamente com a orquestração do docker. Para visualização da interface da API podem ser utilizados o Thunder Client, Postman, Insomnia ou alguma outra ferramenta de sua preferência

5. Para testar o projeto use os seguintes scripts no terminal em que o container foi orquestrado


```
npm run test:mocha
```
```
npm run test:coverage
```
</details>


## 📚 Documentação (endpoints)

### :package: Products
<details>
  <summary> Rotas </summary>
  <br>

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma lista de produtos cadastrados | `http://localhost:3001/products`

<details>
  <summary> A resposta da requisição é a seguinte com status 200  </summary>
  
```
[
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  ...
]
```
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna um produto através do id | `http://localhost:3001/products/:id`

<details>
  <summary> A resposta da requisição é a seguinte com status 200  </summary>
  
```
{
  "id": 1,
  "name": "Martelo de Thor"
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - É disparado o erro <code>404</code> <code>{ message: "Product not found" }</code>, caso o produto não esteja cadastrado no banco de dados; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o cadastro de um produto | `http://localhost:3001/products`

<details>
  <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

```
{
  name: "Elemento X"
}
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com status 201  </summary>
  
```
{
  "id": 24,
  "name": "Elemento X"
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>400</code> <code>{ "message": "\"name\" is required" }</code> ao tentar cadastrar um produto sem o campo nome; <br>
  - A rota retorna um erro <code>422</code> <code>{ "message": "\"name\" length must be at least 5 characters long" }</code> ao tentar cadastrar um produto com nome com quantidade de caracteres inferior a 5; <br>
  - A rota retorna um erro <code>422</code> <code>{ "message": "\"name\" must be a string" }</code> ao tentar cadastrar um produto com nome que não seja uma string; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `PUT` | Atualiza um produto através do id | `http://localhost:3001/products/:id`

<details>
  <summary> A estrutura do body da requisição deverá seguir o padrão abaixo: </summary>

```
{
  name: "Novo nome"
}
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com status 200  </summary>
  
```
{
  "id": 1,
  "name": "Novo nome"
}
```
</details>

<details></code>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>404</code> <code>{ "message": Product not found" }</code> ao tentar atualizar um produto não cadastrado no banco de dados; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "\"name\" is required" }</code> ao tentar atualizar um produto sem o campo nome; <br>
  - A rota retorna um erro <code>422</code> <code>{ "message": "\"name\" length must be at least 5 characters long" }</code> ao tentar atualizar um produto com o campo nome com quantidade de caracteres inferior a 5; <br>
  - A rota retorna um erro <code>422</code> <code>{ "message": "\"name\" must be a string" }</code> ao tentar atualizar um produto com o campo nome não sendo uma string; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `DELETE` | Deleta um produto através do id | `http://localhost:3001/products/:id`

* A resposta da requisição é 204 e sem body em caso de sucesso

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - É disparado o erro <code>404</code> <code>{ "message": "Product not found" }</code> caso o produto não esteja cadastrado no banco de dados; <br>
</details>
</details>


### :moneybag: Sales

<details>
  <summary> Rotas </summary>
  <br>

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma lista de vendas cadastradas | `http://localhost:3001/sales`

<details>
  <summary> A resposta da requisição é a seguinte com status 200  </summary>
  
```
[
  {
    "saleId": 1,
    "date": "2023-05-30T21:21:46.000Z",
    "productId": 1,
    "quantity": 5
  },
  ...
]

```
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `GET` | Retorna uma venda através do id | `http://localhost:3001/sales/:id`

<details>
  <summary> A resposta da requisição é a seguinte com status 200  </summary>
  
```
[
  {
    "date": "2023-05-30T21:21:46.000Z",
    "productId": 1,
    "quantity": 5
  },
  ...
]
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - É disparado o erro <code>404</code> <code>{ "message": "Sale not found" }</code>, caso a venda não esteja cadastrada no banco de dados; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza o cadastro de uma venda | `http://localhost:3001/sales`

<details>
  <summary> A estrutura do body da requisição deverá seguir o padrão abaixo:  </summary>
  
```
[
  {
    "productId": 1,
    "quantity": 5
  },
  ...
]
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com status 201  </summary>
  
```
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 5
    },
    ...
  ]
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>404</code> <code>{ "message": Product not found" }</code> ao tentar cadastrar uma venda com um produto não cadastrado no banco de dados; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "\"productId\" is required" }</code> ao tentar cadastrar uma venda sem o campo productId; <br>
  - A rota retorna um erro <code>422</code> <code>{ "message": "\"productId\" must be greater than or equal to 1" }</code> ao tentar cadastrar uma venda com o campo productId inferior a 1; <br>
  - A rota retorna um erro <code>400</code> <code>{ "message": "\"quantity\" is required" }</code> ao tentar cadastrar uma venda sem o campo quantity; <br>
  - A rota retorna um erro <code>422</code> <code>{ "message": "\"quantity\" must be greater than or equal to 1" }</code> ao tentar cadastrar uma venda com o campo quantity inferior a 1; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `PUT` | Atualiza a quantidade de um produto de uma venda | `http://localhost:3001/sales/:saleId/  products/:productId/quantity`

<details>
  <summary> A estrutura do body da requisição deverá seguir o padrão abaixo:  </summary>
  
```
{
  "quantity": 5
}
```
</details>

<details>
  <summary> A resposta da requisição é a seguinte com status 200  </summary>
  
```
{
  "date": "2023-05-31T00:21:46.000Z",
  "productId": 1,
  "quantity": 1,
  "saleId": 1
}
```
</details>

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - É disparado o erro <code>404</code> <code>{ "message": Sale not found" }</code> ao tentar atualizar uma venda não cadastrada no banco de dados; <br>
  - É disparado o erro <code>404</code> <code>{ "message": Product not found in sale" }</code> ao tentar atualizar um produto não cadastrado na venda; <br>
  - É disparado o erro <code>400</code> <code>{ "message": "\"quantity\" is required" }</code> ao tentar atualizar uma venda sem o campo quantity; <br>
  - É disparado o erro <code>422</code> <code>{ "message": "\"quantity\" must be greater than or equal to 1" }</code> ao tentar atualizar uma venda com o campo quantity inferior a 1; <br>
</details>
<br>

| Método | Funcionalidade | URL |
|---|---|---|
| `DELETE` | Deleta uma venda através do id | `http://localhost:3001/sales/:id`

* A resposta da requisição é 204 e sem body em caso de sucesso

<details>
  <summary> A requisição irá falhar nos seguintes casos: </summary>
  - A rota retorna um erro <code>404</code> <code>{ "message": "Sale not found" }</code> caso a venda não esteja cadastrada no banco de dados; <br>
</details>
</details>
<br>

###### _README inspired by [Italo Amaral](https://www.linkedin.com/in/italo-rockenbach-594082132/)_