<h1 align="center">
    <a>🔗 API registro de tarefas </a>
</h1>

<p align="center">API para registrar as tarefas</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#pré-requisitos">Pré-requisitos</a> •
  <a href="#rodando-a-api-com-docker">Rodando a API com docker</a> •
  <a href="#rodando-a-api-sem-docker">Rodando a API sem docker</a> •  
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
