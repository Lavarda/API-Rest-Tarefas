<h1 align="center">
    <a>🔗 API registro de tarefas </a>
</h1>

<p align="center">API para registrar as tarefas</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#pré-requisitos">Pré-requisitos</a> •
  <a href="#rodando-a-api-com-docker">Rodando a API com docker</a> •
  <a href="#rodando-a-api-sem-docker">Rodando a API sem docker</a> •  
  <a href="#rotas"> Rotas </a>  •  
  <a href="#tecnologias">Tecnologias</a> •
  <a href="#autor">Autor</a>
</p>

### Features

- [x] Criar estrutura de cliente no db
- [x] Criar rotas para criar usuário, alterar usuário, listar usuários e deletar usuário
- [x] Criar estrutura de tarefas no db
- [x] Criar rotas para criar tarefas, alterar tarefas, buscar tarefas por status ou descrição podendo ordenar de ordem crescente e decrescente os campos responsável, status e data de criação, buscar tarefas de um determinado usuário, busca uma tarefa por id, buscar todas as tarefas e deletar tarefas. 
- [x] Criar rotas de indicadores entregando o desempenho geral dos usuários em um determinado periódo de tempo, número de tarefas concluídas, média de tarefas concluídas por usuário, tempo médio entre "aberto" e "fazendo" das tarefas e tempo médio entre "fazendo" e "finalizando" das tarefas.
- [x] Adicionar Docker ao projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js 12.19.0](https://nodejs.org/en/), [Docker 19.03.13](https://www.docker.com/get-started). 

### Rodando a API com docker

```bash
# Clone este repositório
$ git clone https://github.com/Lavarda/API-Rest-Tarefas.git

# Acesse a pasta do projeto no terminal ou cmd
$ cd API-Rest-Tarefas

# Vá para a pasta src
$ cd src

# Altere as configurações do banco de dados para o seu banco de dados no arquivo database/config/config.js

# Execute as migrations para a criação das tabelas
npx sequelize db:migrate

# Crie e rode a imagem do docker
$ docker-compose up -d

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

### Rodando a API sem docker

```bash
# Clone este repositório
$ git clone https://github.com/Lavarda/API-Rest-Tarefas.git

# Acesse a pasta do projeto no terminal ou cmd
$ cd API-Rest-Tarefas

# Vá para a pasta src
$ cd src

# Altere as configurações do banco de dados para o seu banco de dados no arquivo database/config/config.js e altere o host para 'localhost'

# Execute as migrations para a criação das tabelas
npx sequelize db:migrate

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

### Rotas

* **URL**

  `/users`

* **Method**

  `post`
  
* **Retorno**
  
  **Status Code:** 201
  
    ```json
      {
        "status": 201,
        "message": "User created successfully",
        "value": [
          {
            "id": 1,
            "name": "Vito",
            "email": "vitor@gmail.com"
          }
        ]
      },
    ``` 
-----

* **URL**

  `/users/list`

* **Method**

  `get`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
      {
        "status": 200,
        "message": "List of users",
        "value": [
          {
            "id": 1,
            "name": "Vitor",
            "email": "vitorlavarda.souza@gmail.com"
          },
          {
            "id": 2,
            "name": "Vitor Lavarda",
            "email": "vitorlavarda.souza@gmail.com"
          },
        ]
      }
    ``` 
-----

* **URL**

  `/users/:id/edit`

* **PARAMS**

   #### Id do usuário que deseja editar
  `:id`

   #### Dados que você deseja editar
   ```json
    {
      "nome": "Fazendo",
      "email": ""
    }
   ```
  
* **Method**

  `post`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
      {
        "status": 200,
        "message": "User edited successfully",
        "value": {
          "id": 1,
          "name": "Vitor",
          "email": "vitorlavarda.souza@gmail.com"
        }
      }
    ``` 
-----

* **URL**

  `/users/delete/:id`

* **PARAMS**

   # Id do usuário que deseja deletar
  `:id`

* **Method**

  `delete`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
      {
        "status": 200,
        "message": "User deleted successfully",
        "value": {
          "id": 1,
          "name": "Vitor",
          "email": "vitorlavarda.souza@gmail.com"
        }
      }
    ``` 
-----

* **URL**

  `/users/:user_id/tasks`

* **PARAMS**

   # Id do usuário que deseja atrelar a tarefa criada
  `:user_id`

* **Method**

  `post`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
      {
        "status": 200,
        "message": "Task created successfully",
        "value": {
          "id": 1,
          "user_id": "1",
          "description": "Criando banco",
          "responsable": "Vitor",
          "status": "Aberto",
          "dateStart": "2020-11-29 21:00:00",
          "dateFinish": "2020-11-30 21:00:00"
        }
      }
    ``` 
-----

* **URL**

  `/tasks/search_all`

* **Method**

  `get`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
     {
      "status": 200,
      "message": "Tasks found successfully",
      "value": [
        {
          "id": 6,
          "user_id": 1,
          "description": "Descrição da task 1",
          "responsable": "Vitor",
          "status": "Aberto",
          "dateStart": "2020-11-29 21:00:00",
          "dateFinish": "2020-12-01 21:00:00"
        },
        {
          "id": 7,
          "user_id": 1,
          "description": "Descrição da task 2",
          "responsable": "Vitor",
          "status": "Fazendo",
          "dateStart": "2020-11-29 21:00:00",
          "dateFinish": "2020-12-01 21:00:00"
        },
      ]
    }
    ``` 
-----

* **URL**

  `/tasks/user/:id`

* **PARAMS**

   # Id do usuário que deseja pesquisar as tarefas
  `:id`

* **Method**

  `post`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
      {
        "status": 200,
        "message": "User listed successfully",
        "value": {
          "id": 9,
          "name": "Vinicius",
          "email": "vinicius@gmail.com",
          "createdAt": "2020-12-02T00:20:18.000Z",
          "updatedAt": "2020-12-02T00:20:18.000Z",
          "responsable_task": [
            {
              "id": 24,
              "description": "Criando banco",
              "responsable": "Vinicius",
              "status": "Aberto",
              "dateStart": "2020-11-30T00:00:00.000Z",
              "dateFinish": "2020-12-01T00:00:00.000Z",
              "createdAt": "2020-12-02T16:02:04.000Z",
              "updatedAt": "2020-12-02T16:02:04.000Z",
              "user_id": 9
            }
          ]
        }
      }
    ``` 
-----
* **URL**

  `/tasks/:id`

* **PARAMS**

   # Id da tarefa que deseja pesquisar
  `:id`

* **Method**

  `post`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
     {
      "status": 200,
      "message": "Task finded successfully",
      "value": {
        "id": 6,
        "user_id": 1,
        "description": "Descrição da task 1",
        "responsable": "Vitor",
        "status": "Aberto",
        "dateStart": "2020-11-29 21:00:00",
        "dateFinish": "2020-12-01 21:00:00"
      }
    }
    ``` 
-----

* **URL**

  `/tasks/search/filtered`

* **PARAMS**

    # Ordenar filtrando descrição ou status e seleciando ordem crescente ou decrescente de responsable, status ou createdAt

  ```json
    {
      "description": {
        "filter": ""
      },
      "responsable": {
        "order": ""
      },
      "status":  {
        "filter": "Finalizado",
        "order": "ASC"
      },
      "createdAt": {
        "order": ""
      }
    }
  ```

* **Method**

  `post`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
     {
      "status": 200,
      "message": "Tasks found successfully",
      "value": [
        {
          "id": 8,
          "user_id": 1,
          "description": "Descrição da task 1",
          "responsable": "Vitor",
          "status": "Finalizado",
          "dateStart": "2020-11-29 21:00:00",
          "dateFinish": "2020-12-01 21:00:00"
        },
        {
          "id": 9,
          "user_id": 1,
          "description": "Descrição da task 2",
          "responsable": "Vitor",
          "status": "Finalizado",
          "dateStart": "2020-11-29 21:00:00",
          "dateFinish": "2020-12-01 21:00:00"
        },
      ]
    }
    ``` 
-----

* **URL**

  `/tasks/edit/:id`

* **PARAMS**

   # Id da tarefa que deseja editar
  `:id`


  # Dados que você deseja editar
  ```json
    {
      "status": "Fazendo",
      "dateStart": "",
      "dateFinish": ""
    }
  ```

* **Method**

  `post`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
     {
      "message": "Taks edit successfully",
      "status": 200,
      "value": {
        "id": 19,
        "user_id": 7,
        "description": "Criando banco",
        "responsable": "Vitor",
        "status": "Fazendo",
        "dateStart": "2020-12-01 21:00:00",
        "dateFinish": "2020-12-06 21:00:00"
      }
    }
    ``` 
-----
* **URL**

  `/tasks/delete/:id`

* **PARAMS**

   # Id da tarefa que deseja editar
  `:id`

* **Method**

  `delete`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
      {
        "status": 200,
        "message": "Task deleted successfully",
        "value": {
          "id": 7,
          "user_id": 1,
          "description": "Descrição da task 1",
          "responsable": "Vitor",
          "status": "Fazendo",
          "dateStart": "2020-11-29 21:00:00",
          "dateFinish": "2020-12-01 21:00:00"
        }
      }
    ``` 
-----

* **URL**

  `/indicators`

* **PARAMS**

  # Parametros para filtrar o desempenho dos usuários
  ```json
    {
      "dateStart": "2020-11-29 21:00:00",
      "dateFinish": "2019-12-31 21:00:00"
    }
    ```

* **Method**

  `post`
  
* **Retorno**
  
  **Status Code:** 200
  
    ```json
      {
        "status": 200,
        "message": "Data available",
        "value": {
          "performance": 41.67,
          "tasks_completed": 6,
          "average_tasks_completed_per_user": {
            "Vitor": 4,
            "Vitor Lavarda": 0,
            "Usuário 3": 1,
            "Vinicius": 0,
            "": 0,
            "Vini": 1,
            "Vinicius Zaramella 1": 0
          },
          "average_time": {
            "tasks_open_and_doing": "0.54 days",
            "tasks_doing_and_finishing": "0.10 days"
          }
        }
      }
    ``` 
-----

### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Mysql](https://www.mysql.com/)
- [Sequelize](https://sequelize.org)
- [Express](https://expressjs.com/pt-br/)

### Autor
---

<a href="github/Lavarda">
 <img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/43797265?s=400&u=e5b9bba154f27fb5572e5cf747dbb57d3ca923e6&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Vitor Lavarda</b></sub>
</a> 

Feito por Vitor Lavarda

[![Linkedin Badge](https://img.shields.io/badge/-Vitor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/vitor-lavarda-00a776177/)](https://www.linkedin.com/in/vitor-lavarda-00a776177/) 
[![Gmail Badge](https://img.shields.io/badge/-vitorlavarda.souza@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:vitorlavarda.souza@gmail.com)](mailto:vitorlavarda.souza@gmail.com)
