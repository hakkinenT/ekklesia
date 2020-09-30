# Ekklesia API

O software Ekklesia já foi desenvolvido em Delphi, por Tawanna Hakkinen e por Arthur D'Avila, para o TCC (Trabalho de Conclusão de Curso) do curso Técnico em Informatica da Pio X, no ano de 2011. O Ekklesia API é uma nova versão do antigo projeto, desenvolvido em javascript e com algumas alterações no diagrama de classe.

# Tabela de conteúdos

- [Sobre o projeto](#sobre)
- [Status do projeto](#status-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pre-requisitos)
- [Como rodar a aplicação](#como-rodar)
- [Licença](#licenca)
- [Autor](#autor)

## Sobre o projeto

O Ekklesia é um software que tem por objetivo facilitar o gerenciamento de igrejas. Este software permite não só o cadastro da igreja, mas também de seus membros, grupos, departamentos e cargos. Além do gerenciamento do seu patrimônio, da Escola Biblica Dominical (EBD) e do setor financeiro.

## Status do projeto

Em desenvolvimento

## Funcionalidades

- [x] Autenticação de usuário
- [x] Gerenciamento da igreja
  - [x] Cadastrar a igreja
  - [x] Mostrar os dados da igreja
  - [x] Atualizar os dados da igreja
  - [x] Excluir a igreja
- [x] Gerenciamento dos membros da igreja
  - [x] Cadastrar os membros de uma igreja
  - [x] Pesquisar por um membro
  - [x] Listar todos os membros
  - [x] Atualizar os dados de um membro
  - [x] Excluir um membro
- [x] Gerenciamento de usuários
  - [x] Criar um usuário para um membro
  - [x] Pesquisar por um usuário
  - [x] Listar todos os usuários
  - [x] Atualizar os dados de um usuário
  - [x] Excluir um usuário
- [x] Filtros de pesquisa
  - [x] Pesquisar todos os membros que são batizados
  - [x] Pesquisar todos os membros que não são batizados
  - [x] Pesquisar todos os membros que moram na mesma rua
  - [x] Pesquisat todos os membros que moram no mesmo bairro
  - [x] Pesquisar todos os membros que foram batizados em um determinado intervalo de tempo
  - [x] Pesquisar todos os membros que se converteram em um determinado intervalo de tempo
  - [x] Pesquisar todos os membros que tem um usuário cadastrado
  - [x] Pesquisar todos os membros que possuem uma determinada profissão
- [ ] Permitir que um membro cadastre uma foto
- [ ] Enviar e-mail de confirmação de cadastro para a igreja
- [ ] Recuperação de senha
- [ ] Gerenciamento dos cargos da igreja
  - [ ] Cadastrar os cargos da igreja
  - [ ] Alocar um membro em um cargo
  - [ ] Listar todos os cargos
  - [ ] Atualizar os dados de um cargo
  - [ ] Excluir um cargo
- [ ] Gerenciamento dos grupos da igreja
  - [ ] Cadastrar os grupos da igreja
  - [ ] Alocar um membro em um grupo
  - [ ] Listar todos os grupos
  - [ ] Atualizar os dados de um grupo
  - [ ] Excluir um grupo
- [ ] Gerenciamento dos cargos dos grupos
  - [ ] Cadastrar um cargo ou alocar um existente em um grupo
  - [ ] Alocar um membro a um cargo do grupo
  - [ ] Listar todos os cargos de um grupo
  - [ ] Atualizar os dados de um cargo
  - [ ] Excluir um cargo de um grupo
- [ ] Gerenciamento dos departamentos da igreja
  - [ ] Cadastrar os departamentos da igreja
  - [ ] Pesquisar por um departamento
  - [ ] Listar todos os departamentos
  - [ ] Atualizar os dados de um departamento
  - [ ] Excluir um departamento
- [ ] Gerenciamento dos cargos dos departamentos
  - [ ] Cadastrar um cargo ou alocar um existente em um departamento
  - [ ] Alocar um membro a um cargo do departamento
  - [ ] Listar todos os cargos de um departamento
  - [ ] Atualizar os dados de um departamento
  - [ ] Excluir um cargo de um departamento
- [ ] Gerenciamento da EBD (Escola Biblica Dominical)
- [ ] Gerenciamento do patrimônio da igreja (imóveis, móveis, eletrônicos e etc)
- [ ] Gerenciamento do setor financeiro da uma igreja

## Tecnologias

As seguintes tecnologias foram usadas na construção do projeto até o momento:

> Veja o arquivo [package.json](https://github.com/hakkinenT/ekklesia/blob/master/package.json)

- **[express](https://expressjs.com/pt-br/)**
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)**
- **[cors](https://github.com/expressjs/cors)**
- **[dotenv](https://github.com/motdotla/dotenv)**
- **[cpf-cnpj-validator](https://github.com/carvalhoviniciusluiz/cpf-cnpj-validator)**
- **[express-validator](https://express-validator.github.io/docs/)**
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**
- **[sequelize](https://sequelize.org/v5/manual/getting-started.html)**
- **[swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)**

## Pré-requisitos

É necessário instalar as seguintes ferramentas:

- [Node.js: ^12.14.1](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/) ou outro editor
- [PostgreSQL](https://www.postgresql.org/download/)
- [Insomnia](https://insomnia.rest/)

## Como testar a API

1. Clone este repositório
   `git clone https://github.com/hakkinenT/ekklesia.git`
2. Abra o projeto no editor da sua escolha
3. Abra o terminal do seu editor
4. Instale as dependências:
   `npm install`
5. Depois que as dependências forem instaladas, digite o seguinte comando:
   `yarn dev`
6. O servidor será iniciado e uma mensagem dizendo: **Rodando na porta 3333** deve aparecer
7. Abra a documentação da API em um browser:
   `http://localhost:3333/doc/`
8. Abra o Insomnia
9. Crie as rotas de acordo com a documentação colocando como url base o endereço:
   `http://localhost:3333`
10. Use a documentação para verficar os dados que devem ser passados em cada rota
11. Primeiro execute a funcionalidade de criar uma Igreja
12. Logo depois, faça o login com o email e a senha da igreja para obter um token de acesso
13. Use esse token para executar as outras funcionalidades

### Outra forma de testar a API

Também é possível testar a API diretamente na documentação. Acesse:
`http://localhost:3333/doc/`

1. Execute a funcionalidade de criar uma Igreja
2. Logo depois, execute o login para obter o token
3. Clique no botão Authorize, que fica no topo da página da documentação, digite a palavra Bearer e cole o token obtido no login. Como é mostrado abaixo:
   `Bearer <token>.`
4. No lugar do <token> informe o token obtido no login
5. Clique em Authorize
6. Observe se os cadeados mostrados nas rotas estão fechados e na cor preta
7. Depois, basta testar as rotas que desejar

## Licença

Este projeto está sobe a licença [MIT](./LICENSE).

## Autor

Tawanna Hakkinen Oliveira Leite e Arthur D'Avila
