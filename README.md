# README.md

````md id="v8q2mx"
# 💬 Chat Corporativo Real-Time

Sistema de chat corporativo em tempo real desenvolvido com:

- React
- Node.js
- Express
- Socket.IO
- PostgreSQL
- JWT Authentication

O projeto permite:

✅ Login e cadastro de usuários  
✅ Conversas em grupo  
✅ Conversas privadas  
✅ Usuários online em tempo real  
✅ Criação dinâmica de grupos  
✅ Comunicação em tempo real com WebSocket  
✅ Interface moderna estilo Discord/WhatsApp  

---

# 📸 Preview

## Funcionalidades

- Chat em tempo real
- Mensagens privadas
- Sistema de grupos
- Usuários online
- Login com autenticação JWT
- Backend Node.js
- Banco PostgreSQL

---

# 🚀 Tecnologias Utilizadas

## Frontend

- React
- Vite
- Socket.IO Client
- React Router DOM
- Axios

## Backend

- Node.js
- Express
- Socket.IO
- PostgreSQL
- JWT
- bcryptjs
- cors
- dotenv

---

# 📂 Estrutura do Projeto

```bash
Chat-Trabalho-React/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── socket.js
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
````

---

# ⚙️ Instalação

# 1️⃣ Clonar o projeto

```bash
git clone https://github.com/SEU_USUARIO/chat-corporativo.git
```

---

# 2️⃣ Backend

Entrar na pasta:

```bash
cd backend
```

Instalar dependências:

```bash
npm install
```

---

# 3️⃣ Criar banco PostgreSQL

Criar banco:

```sql
CREATE DATABASE chat_empresa;
```

---

# 4️⃣ Criar tabela usuários

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);
```

---

# 5️⃣ Configurar .env

Criar arquivo:

```env
PORT=3001

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=chat_empresa

JWT_SECRET=chat_super_secreto
```

---

# 6️⃣ Rodar backend

```bash
npm run dev
```

Servidor:

```bash
http://localhost:3001
```

---

# 7️⃣ Frontend

Abrir outro terminal:

```bash
cd frontend
```

Instalar dependências:

```bash
npm install
```

---

# 8️⃣ Configurar socket e API

## socket.js

```js
import { io } from 'socket.io-client'

const socket = io(
  'http://SEU_IP:3001'
)

export default socket
```

---

## services/api.js

```js
import axios from 'axios'

const api = axios.create({
  baseURL:
    'http://SEU_IP:3001'
})

export default api
```

---

# 9️⃣ Rodar frontend

```bash
npm run dev -- --host
```

Frontend:

```bash
http://localhost:5173
```

Rede local:

```bash
http://SEU_IP:5173
```

---

# 🌐 Acesso em outra máquina

Para acessar de outro computador:

* Ambos devem estar na mesma rede
* Liberar porta 3001 no firewall
* Liberar porta 5173 no firewall

---

# 🔐 Autenticação

O sistema utiliza:

* JWT Token
* bcryptjs
* LocalStorage

---

# 💬 Funcionalidades do Chat

## Chat de Grupo

* Criar grupos
* Entrar em grupos
* Mensagens em tempo real

## Chat Privado

* Conversa 1x1
* Mensagens privadas
* Atualização instantânea

## Usuários Online

* Lista em tempo real
* Entrada e saída automática

---

# 📦 Scripts

## Backend

```bash
npm run dev
```

## Frontend

```bash
npm run dev -- --host
```

---

# 🔥 Melhorias Futuras

* Persistência de mensagens no banco
* Upload de arquivos
* Emoji picker
* Notificações sonoras
* Chamadas de vídeo
* Mensagens apagáveis
* Status online/offline
* Tema dark/light
* Docker
* Deploy VPS

---

# 👨‍💻 Autor

Desenvolvido por Gustavo Luiz 🚀

```
```
