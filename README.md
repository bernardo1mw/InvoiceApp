```markdown
# Projeto de Gestão de Notas Fiscais

Este projeto é uma aplicação web para o gerenciamento de notas fiscais, incluindo upload, visualização e detalhamento de informações. O sistema é composto por um backend em Laravel, um frontend em React, e utiliza Docker para orquestração dos serviços.

## Funcionalidades

- **Upload de Notas Fiscais**: Permite o upload de arquivos XML contendo informações de notas fiscais.
- **Listagem de Notas Fiscais**: Exibe uma tabela com todas as notas fiscais, incluindo opções de filtragem e ordenação.
- **Filtragem de Notas Fiscais**: A listagem permite filtragem por diversos campos, como número da nota, emitente e destinatário.
- **Ordenação de Notas Fiscais**: A listagem permite ordenação da tabela por data, número da nota e valor total.
- **Detalhes da Nota Fiscal**: Exibe informações detalhadas sobre uma nota fiscal específica, incluindo emitente, destinatário, itens, pagamentos e transportes.
- **Download de Arquivos**: Permite o download dos arquivos XML das notas fiscais.

## Tecnologias

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Laravel, PHP 7
- **Banco de Dados**: MySQL

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [PHP](https://www.php.net/downloads) (versão 7.4 ou superior)
- [Composer](https://getcomposer.org/) ou utilize o arquivo composer.phar presente no repositório
- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [npm](https://www.npmjs.com/get-npm) ou [yarn](https://yarnpkg.com/)
- [MySQL](https://dev.mysql.com/downloads/) (versão 5.7 ou superior)


## Configuração do Backend

1. **Instalação das Dependências**

   Navegue até o diretório do backend e instale as dependências:

   ```bash
   cd backend
   composer install
   ```

2. **Configuração do Banco de Dados**

   Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente para o banco de dados:

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` para configurar as credenciais do banco de dados:

   ```
   APP_URL=http://localhost:8000
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nome_do_banco
   DB_USERNAME=usuario
   DB_PASSWORD=senha
   ```

3. **Criação do Banco de Dados e Execução das Migrações**

   Execute os seguintes comandos para criar o banco de dados e executar as migrações:

   ```bash
   php artisan migrate
   ```

4. **Executar o Servidor**

   Inicie o servidor backend:

   ```bash
   php artisan serve --host=localhost --port=8000
   ```

## Configuração do Frontend

1. **Instalação das Dependências**

   Navegue até o diretório do frontend e instale as dependências:

   ```bash
   cd frontend
   npm install
   ```

2. **Configuração da URL da API**

   Edite o arquivo `src/api/invoiceApi.ts` para garantir que a URL da API esteja correta:

   ```typescript
   const API_BASE_URL = 'http://localhost:8000/api';
   ```

3. **Executar o Frontend**

   Inicie o servidor de desenvolvimento do frontend:

   ```bash
   npm start
   ```


## Endpoints da API

- **GET** `/api/invoices` - Lista todas as notas fiscais com paginação.
- **POST** `/api/invoices/upload` - Faz o upload de um arquivo XML de nota fiscal.
- **GET** `/api/invoices/{id}` - Obtém os detalhes de uma nota fiscal específica.
- **GET** `/api/download/{filename}` - Faz o download de uma nota fiscal específica.

## Endpoints da API

- `GET /api/invoices`: Retorna a lista de notas fiscais com paginação.
- `GET /api/invoices/{id}`: Retorna os detalhes de uma nota fiscal específica.
- `POST /api/invoices/upload`: Permite o upload de um arquivo XML.


## Estrutura de Diretórios

- **`backend/`**: Contém o código fonte do backend em Laravel.
- **`frontend/`**: Contém o código fonte do frontend em React.


## Funcionalidades

- **Upload de Arquivos XML**: Permite o upload de arquivos XML das notas fiscais.
- **Listagem de Notas Fiscais**: Exibe uma lista de notas fiscais com opções de filtragem e ordenação.
- **Detalhes da Nota Fiscal**: Exibe informações detalhadas de uma nota fiscal específica, incluindo itens, transportes, pagamentos e informações adicionais.
- **Download de Arquivos XML**: Permite o download dos arquivos XML das notas fiscais.


## Contribuição

Para contribuir com o projeto, faça um fork do repositório e envie um pull request com suas alterações.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE).

```

Esse `README.md` inclui instruções completas para configurar e executar o projeto localmente, testar a API com cURL, e informações sobre contribuições e licença. Se precisar de mais detalhes ou ajustes, estou à disposição!