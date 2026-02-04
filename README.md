# 📇 Path Educ - Frontend

<p align="center">
  <strong>Aplicação React moderna para gestão de estudantes e bolsas</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

<br>

<img width="1343" height="611" alt="image" src="https://github.com/user-attachments/assets/7c2bea56-9305-4d9d-9375-bcb4647e05b8" />


## 👥 Equipe de Desenvolvimento

Este projeto foi desenvolvido pela equipe **Grupo 4** da **Turma JavaScript 10**:

- **Gabrieli Martins** - Membro
- **Kauã Gabriel de Farias** - Membro
- **Assis Pires Neto** - Membro
- **Lilia** - Membro
- **Patrícia Souza** - Membro

## 📝 Descrição

**Path Educ** é uma interface moderna e responsiva para gerenciamento de estudantes e controle de bolsas de estudo. Com uma experiência de usuário intuitiva, permite aos usuários cadastrar, editar, visualizar e deletar estudantes, além de identificar rapidamente quais possuem bolsas vinculadas.

### 🎯 Objetivos do Projeto

- Oferecer uma interface amigável para gerenciamento de estudantes
- Facilitar a visualização e associação de bolsas de estudo
- Proporcionar operações CRUD (Create, Read, Update, Delete) simplificadas
- Garantir responsividade em diferentes dispositivos

## ✨ Principais Funcionalidades

- ⚡ **Status do Estudante**: Ativar ou inativar estudantes com um clique
- 🎯 **Visualização de Bolsas**: Identificação rápida de estudantes com bolsa
- 📝 **Cadastro e Edição**: Formulário intuitivo para criar ou editar estudantes
- 🗑️ **Exclusão**: Remover estudantes facilmente
- 🚀 **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **UI Clean**: Design moderno com cards informativos e ícones interativos
- 🔄 **Hot Reload**: Desenvolvimento rápido com Vite

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para construção de interfaces dinâmicas
- **TypeScript** - Tipagem estática para segurança e manutenção
- **Vite** - Build tool ultrarrápido com desenvolvimento otimizado
- **TailwindCSS** - Framework utilitário para estilização moderna
- **React Router** - Navegação entre páginas

### Bibliotecas e Dependências
- **Axios** - Cliente HTTP para requisições ao backend
- **React Icons** - Ícones para ações (edição, exclusão, etc)
- **React Toastify** - Notificações elegantes ao usuário

### Ferramentas de Desenvolvimento
- **ESLint** - Análise estática de código
- **VSCode** - IDE recomendada
- **Git** - Controle de versão

## 📋 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** v16.0.0 ou superior
- **npm** v7.0.0 ou superior

Verifique as versões:
```bash
node --version   # v18.x.x ou superior
npm --version    # v9.x.x ou superior
```

## 📥 Instalação

### 1️⃣ Clone o repositório

```bash
git clone <url-do-repositorio>
cd crm-frontend
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000/api
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento

Inicie o servidor de desenvolvimento com hot reload:

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:5173**

### Modo Preview (Teste da Build)

```bash
npm run preview
```

## 📦 Scripts Disponíveis

| Comando | Descrição | Uso |
|---------|-----------|-----|
| `npm run dev` | 🔄 Dev com hot reload | Desenvolvimento local |
| `npm run build` | 📦 Build para produção | Gerar arquivos otimizados |
| `npm run preview` | 👀 Visualiza a build | Teste antes de deploy |
| `npm run lint` | ✅ Verifica qualidade | Análise de código |
| `npm run lint:fix` | 🔧 Corrige problemas | Autofix de issues |

## 📁 Estrutura do Projeto

```
crm-frontend/
│
├── src/
│   ├── components/
│   │   ├── estudante/
│   │   │   ├── cardestudante/
│   │   │   │   └── CardEstudante.tsx
│   │   │   └── formestudante/
│   │   │       └── FormEstudante.tsx
│   │   └── navbar/
│   │       └── Navbar.tsx
│   │
│   ├── pages/
│   │   ├── home/
│   │   │   └── Home.tsx
│   │   ├── listarestudantes/
│   │   │   └── ListarEstudantes.tsx
│   │   ├── editarestudante/
│   │   │   └── EditarEstudante.tsx
│   │   └── deletarestudante/
│   │       └── DeletarEstudante.tsx
│   │
│   ├── models/
│   │   ├── Estudante.ts
│   │   └── Bolsa.ts
│   │
│   ├── services/
│   │   ├── estudante.service.ts
│   │   └── bolsa.service.ts
│   │
│   ├── utils/
│   │   ├── ToastAlerta.ts
│   │   └── formatters.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── avatars/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
└── README.md
```

## 💡 Boas Práticas

### ✅ Convenções de Código

- 📝 **Componentes**: Use PascalCase (`CardEstudante.tsx`)
- 🏗️ **Estrutura de Pastas**: Organize por recurso/feature
- 🔤 **Tipagem**: Sempre use TypeScript com tipagem explícita
- 🎨 **Estilos**: Prefira Tailwind CSS para consistência
- 📤 **Exportações**: Use exportações nomeadas quando possível
- 📏 **Tamanho**: Mantenha componentes pequenos e focados em uma responsabilidade

### 🔍 Qualidade de Código

- Execute `npm run lint` regularmente
- Corrija issues automáticas com `npm run lint:fix`
- Teste componentes antes de fazer commit
- Escreva comentários apenas quando necessário (lógica complexa)

## 🔧 Configurações Importantes

### Vite

Servidor de desenvolvimento otimizado com hot module replacement. Configurado em `vite.config.ts`.

### TypeScript

Projeto em **strict mode**. Sempre adicione tipos para:
- Funções e parâmetros
- Componentes e suas props
- Variáveis de estado
- Retornos de funções

```typescript
interface IEstudante {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
  bolsa?: IBolsa;
}
```

### TailwindCSS

Estilos aplicados via classes utilitárias. Configure conforme necessário em `tailwind.config.js`.

```jsx
<div className="p-4 bg-blue-500 text-white rounded-lg">
  Botão Tailwind
</div>
```

### Axios

Cliente HTTP pré-configurado para comunicação com o backend:

```typescript
import api from '../services/api';

const response = await api.get('/estudantes');
```

## 📡 Conectando ao Backend

O frontend se comunica com a API NestJS através do Axios. Certifique-se de que:

1. O backend está rodando em `http://localhost:3000`
2. A variável de ambiente `VITE_API_URL` está corretamente configurada
3. O CORS está habilitado no backend

### Exemplo de Requisição

```typescript
import api from '../services/estudante.service';

const estudantes = await api.listarEstudantes();
const novoEstudante = await api.criarEstudante(dados);
```

## 🚀 Build e Deploy

### Gerar Build de Produção

```bash
npm run build
```

Isso cria uma pasta `dist/` otimizada para produção.

### Deploy em Servidor

1. Faça o build: `npm run build`
2. Copie a pasta `dist/` para seu servidor web
3. Configure um servidor (Nginx, Apache, Vercel, etc)

### Deploy com Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

## 🧪 Testando a Aplicação

### Testes Manuais

1. Acesse `http://localhost:5173`
2. Teste as operações CRUD:
   - Criar novo estudante
   - Editar estudante existente
   - Visualizar lista de estudantes
   - Deletar estudante
3. Verifique responsividade redimensionando a janela

### Checklist de QA

- [ ] Formulários validam corretamente
- [ ] Mensagens de sucesso/erro aparecem
- [ ] Interface responsiva em mobile
- [ ] Ícones e imagens carregam
- [ ] Navegação funciona em todas as páginas
- [ ] Dados persistem após atualização

## 🐛 Troubleshooting

### Porta 5173 já em uso

```bash
npm run dev -- --port 3001
```

### Erro de CORS

Verifique se o backend tem CORS habilitado:

```typescript
@EnableCors({
  origin: 'http://localhost:5173'
})
```

### Módulos não encontrados

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro com TypeScript

Verifique `tsconfig.json` e as definições de tipo:

```bash
npm run build
```

## 📚 Recursos e Documentação

- [Documentação React](https://react.dev)
- [Documentação Vite](https://vitejs.dev)
- [Documentação TypeScript](https://www.typescriptlang.org/docs)
- [Documentação Tailwind CSS](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)

## 🤝 Contribuindo

Este é um projeto colaborativo. Para contribuir:

1. Crie uma branch para sua feature: `git checkout -b feature/MinhaFeature`
2. Commit suas mudanças: `git commit -m 'Adiciona MinhaFeature'`
3. Push para a branch: `git push origin feature/MinhaFeature`
4. Abra um Pull Request com descrição detalhada

## 📄 Licença

Este projeto está licenciado sob a **MIT License** – veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<p align="center">
  Desenvolvido com ❤️ pela equipe Grupo 4 - Turma JavaScript 10
</p>
