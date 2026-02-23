# Kanban
Sistema Kanban com frontend em Angular e backend em NestJS.

## Pré‑requisitos
- Node.js
- npm (ou yarn)

## Instalação e Execução
### Backend

```bash
cd kanban\backend
npm install
npm run start:dev
```
A API estará disponível em http://localhost:3000.

### Frontend
```bash
cd kanban\frontend
npm install
npm start
```
A aplicação estará disponível em http://localhost:4200.

## Funcionalidades
- Criar, visualizar e excluir quadros.
- Adicionar e remover colunas em um quadro.
- Adicionar cartões com título e descrição.
- Excluir cartões.

## Tecnologias
- Frontend: Angular (standalone components), RxJS, Tailwind CSS
- Backend: NestJS

## Estrutura do Projeto
### Backend (NestJS)
- `boards (id, name)`: Endpoints para criar, listar todos e deletar.

- `columns (id, boardId, name)`: Endpoints para criar, listar por board e deletar (remove também os cartões vinculados).

- `cards (id, columnId, title, body?)`: Endpoints para criar, listar por coluna e deletar.

### Frontend (Angular)
- `board-list`: Componente que lista todos os boards. Permite criar um novo board e deletar existentes.

- `board-detail`: Componente de detalhes de um board. Exibe as colunas e gerencia a criação/remoção de colunas e cartões.

- `column`: Componente que representa uma coluna. Recebe a lista de cartões, exibe os cartões e permite adicionar/deletar cartões.

- `card`: Componente que exibe um cartão (título e corpo) e permite exclusão.

- `add-card-modal`: Modal para criar um novo cartão com título e descrição.