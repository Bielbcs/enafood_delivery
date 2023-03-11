# 🛵 Enafood Delivery 🛵

<summary><h3>Propósito</h3></summary>
Projeto feito durante o processo seletivo da <a href="https://www.enacom.com.br/">Enacom</a> e tem como objetivo avaliar habilidades técnicas atravez da construção de uma API para um sistema de Delivery usando NodeJs e MongoDB.

<summary><h3>Sobre</h3></summary>
Um sistema de Delivery onde a API deve: Retornar todos os produtos disponiveis, armazenar o produto que o usuário selecionou no seu carrinho, permitir que seja feita a alteração da quantidade de um produto e também a remoção do mesmo. Também foi implementado o sistema de cadastro e login de usuário para de cada usuário possa criar sua conta e ter seu carrinho individual, por isso, o usuário logado só consegue fazer alterações em seu proprio carrinho.

<summary><h3>Tecnologias</h3></summary>
  Projeto feito com base na arquitetura <i>Model-Service-Controller</i>.
  </br></br>
  
   <details>
    <summary>Justificativas</summary>
  <b>- NodeJs</b>: Tecnologia base do projeto, é o que permite a execução de JavaScript fora de um navegador web.</br></br>
  <b>- ExpressJs</b>: É o framework que facilita a criação da API, pois já vem com muitas funcionalidades prontas. Foi optado pelo uso do Express pois sua utilização é mais simples e ideal para pequenos projetos.</br></br>
  <b>- Mongoose</b>: É um ODM (Object Data Modeling) para MongoDB, que foi responsável por fazer a conexão entre o banco Mongo e o restante da aplicação.</br></br>
  <b>- Docker</b>: Docker foi utilizado para a criação do container do banco MongoDB, caso quem queira executar o projeto não o tenha baixado.</br></br>
  <b>- Json Web Token</b>: Jwt foi utilizado para fazer a validação de usuário, todas as rotas exceto as rotas de cadastro e registro, exigem que um token esteja presente nos headers da requisição.</br></br>
  <b>- Dotenv</b>: Foi utilizada para que seja possível utilizar as variáveis de ambiente presentes no arquivo `.env`</br></br>
  <b>- Mocha</b>: Mocha é o responsável por executar os testes de integração feitos para o projeto.</br></br>
  <b>- Chai</b>: Chai é a biblioteca responsável pela asserção dos testes, é utilizado em conjunto com o Mocha.</br></br>
  <b>- Chai-http</b>: É uma biblioteca de apoio ao Chai que permite que os testes façam requisições para API de forma isolada, sem a necessidade de que a API esteja funcionando de fato.</br></br>
  </details>
  
   <table>
    <tr>
      <td>
        <ul>
          <li>NodeJs</li>
          <li>Express</li>
          <li>Mongoose</li>
          <li>Docker</li>
          <li>JWT</li>
          <li>Dotenv</li>
          <li>Mocha</li>
          <li>Chai</li>
          <li>Chai-http</li>
        </ul>
      </td>
    </tr>
  </table>
    
  <details>
  <summary><h3>Funcionamento</h3></summary>
  
  #### `POST /user` (Cadastro de usuário):
  Espera que no body da requisição venha os dados do usuário e os insere na tabela `users` do banco de dados.</br>
  <details>
  <summary><b>Exemplo</b></summary>

  ```json
    {
      "username": "Usuário",
      "email": "usuario@email.com",
      "password": "senhaDoUsuario"
    }
  ```
  </details>
  
  #### `POST /user/login` (Realiza o login do usuário):
  Espera que no body da requisição venha os dados do usuário, verifica se condizem com um usuário do banco e retorna um `token` de acesso.</br>
  
  <details>
  <summary><b>Exemplo</b></summary>

  ```json
    {
      "email": "usuario@email.com",
      "password": "senhaDoUsuario"
    }
  ```
  </details>
  
  #### `GET /product` (Retorna todos os produtos disponíveis):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `authorization`</br>
  
  <details>
  <summary><b>Exemplo de retorno</b></summary>
  
  ```json
  [
    {
      "_id": "640b8e147bdb3a158371f2a7",
      "name": "Hamburguer",
      "price": 12,
      "image_url": "http://localhost:3001/images/hamburguer.jpg"
    },
    {
      "_id": "640b8e147bdb3a158371f2a8",
      "name": "Pizza de Calabreza",
      "price": 35,
      "image_url": "http://localhost:3001/images/pizza.jpg"
    }...
   ]
   ```
   </details>
  
  #### `GET /cart` (Retorna o carrinho do usuário):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `authorization`</br>
  
  <details>
  <summary><b>Exemplo de retorno</b></summary>
  
  ```json
  {
    "_id": "640ba7adb9e80500397adfbd",
    "user_id": "640ba7adb9e80500397adfbb",
    "products": [],
    "__v": 0
  }
  ```
  </details>
  
  #### `POST /cart/:id` (Insere o produto):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `authorization`</br>
  Insere o produto que corresponde ao Id da url no carrinho do usuário. </br>
  
  <details>
  <summary><b>Exemplo de retorno da URL `/cart/640b8e147bdb3a158371f2a7`</b></summary>
  
   ```json
    {
      "_id": "640ba7adb9e80500397adfbd",
      "user_id": "640ba7adb9e80500397adfbb",
      "products": [
        {
          "name": "Hamburguer",
          "price": 12,
          "image_url": "http://localhost:3001/images/hamburguer.jpg",
          "quantity": 1,
          "_id": "640b8e147bdb3a158371f2a7"
        }
      ],
      "__v": 1
    }
  ```
  </details>
  
  #### `PUT /cart/:id/:quantity` (Altera a quantidade):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `authorization`</br>
  
  Altera a chave quantity do produto especificado na URL da requisição, para a quantity que está na URL. </br>
  
  <details>
  <summary><b>Exemplo de retorno da URL `/cart/640b8e147bdb3a158371f2a7/6`</b></summary>
  
   ```json
    {
      "_id": "640ba7adb9e80500397adfbd",
      "user_id": "640ba7adb9e80500397adfbb",
      "products": [
        {
          "name": "Hamburguer",
          "price": 12,
          "image_url": "http://localhost:3001/images/hamburguer.jpg",
          "quantity": 6,
          "_id": "640b8e147bdb3a158371f2a7"
        }
      ],
      "__v": 1
    }
  ```
  </details>
  
  #### `DELETE /cart/:id` (Remove o produto):
  Essa requisição espera conter o token gerado no `login` em seu header na chave `authorization`</br>
  Remove o produto especificado pela URL. </br>
  
  <details>
  <summary><b>Exemplo de retorno da URL `/cart/640b8e147bdb3a158371f2a7`</b></summary>
  
  ```json
  {
    "_id": "640ba7adb9e80500397adfbd",
    "user_id": "640ba7adb9e80500397adfbb",
    "products": [],
    "__v": 0
  }
  ```
  </details>
  </details>
  
  <summary><h3>Como rodar localmente 👨‍💻</h3></summary></br>
  
  ⚠️ Necessário Docker e Docker-Compose ⚠️

1) Clone o repositório

```bash
$ git clone git@github.com:Bielbcs/enafood_delivery.git
```

2) Entre na pasta raíz do projeto

```bash
$ cd enafood_delivery
```

3) Instale as dependencias

```bash
$ npm install
```

4) Renomeie o arquivo `.env.example` para `.env` (caso já possua um banco mongo local personalize as variáveis e ignore o passo 5)

```bash
$ mv .env.example .env
```

5) Suba o container com o banco mongo já configurado

```bash
$ docker-compose up -d
```

6) Inicie a API

```bash
$ npm start
```
ou
```bash
$ npm run dev
```

  
