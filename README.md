# AgendaFit
 
**Gestão inteligente para personal trainers.**
 
O AgendaFit é uma plataforma web desenvolvida com o objetivo de facilitar e otimizar a rotina de personal trainers, oferecendo ferramentas para centralização e organização das atividades profissionais.
 
A proposta é reunir, em um único ambiente digital, recursos de gerenciamento de alunos, organização de agendas, criação e acompanhamento de treinos, além de funcionalidades de automação e integração com Inteligência Artificial.
 
## Objetivo
 
Desenvolver uma solução digital que reduza tarefas manuais, otimize o gerenciamento de alunos e proporcione mais organização e eficiência à rotina dos profissionais de educação física.
 
## Funcionalidades previstas
 
- Gerenciamento e cadastro de alunos;
- Organização de agendas e compromissos;
- Criação e gerenciamento de fichas de treino;
- Recursos de acompanhamento dos alunos;
- Automação de comunicações via WhatsApp;
- Assistente virtual com Inteligência Artificial;
- Apresentação de planos e serviços da plataforma.
## Público-alvo
 
Personal trainers autônomos e profissionais da área fitness que buscam otimizar sua gestão profissional por meio da tecnologia.
 
## Tecnologias
 
- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- Google Gemini API (SDK `@google/genai`)
- dotenv
## Integração com Inteligência Artificial
 
O site conta com o **Léo**, assistente virtual com persona própria, construído sobre a API do Google Gemini (modelo `gemini-3.5-flash-lite`).
 
- **Persona:** Léo é o assistente oficial do AgendaFit, com tom motivador, claro e amigável, em português do Brasil. A persona, o contexto (funcionalidades, planos, preços e contato) e as regras de comportamento ficam no arquivo `persona.js` e são enviados ao modelo como instrução de sistema.
- **Escopo:** o Léo responde apenas sobre o AgendaFit. Ele recusa prescrição de treinos ou dietas, conselhos médicos e assuntos fora do contexto da plataforma, e orienta o visitante ao formulário de contato quando não sabe a resposta.
- **Funcionamento:** o chat do site (`public/js/chat.js`) envia a mensagem e o histórico da conversa para o endpoint `POST /api/chat` do servidor (`server.js`). O servidor adiciona a persona, consulta o Gemini e devolve a resposta ao navegador.
- **Segurança da chave:** a chave da API fica somente no servidor, no arquivo `.env`, que não é enviado ao GitHub.
## Como instalar e executar
 
**Pré-requisitos:** [Node.js](https://nodejs.org/) 20 ou superior, Git e uma chave da API do Gemini (gratuita em [Google AI Studio](https://aistudio.google.com/apikey)).
 
```bash
# 1. Clone o repositório
git clone https://github.com/wsjr-data/agendafit.git
cd agendafit
 
# 2. Instale as dependências
npm install
 
# 3. Crie o arquivo .env a partir do modelo
cp .env.example .env        # no PowerShell: Copy-Item .env.example .env
 
# 4. Abra o .env e preencha a chave:
#    GEMINI_API_KEY=sua_chave_aqui
 
# 5. Inicie o servidor
node server.js
```
 
Depois, acesse **http://localhost:3000** no navegador.
 
Sem a `GEMINI_API_KEY`, o site funciona normalmente, mas o chat do Léo retorna erro.
 
## Estrutura de pastas
 
```
agendafit/
├── public/                  # Front-end, servido de forma estática pelo Express
│   ├── index.html           # Página única com as seções do site e o widget do chat
│   ├── css/
│   │   ├── index.css        # Estilos do site
│   │   └── chat.css         # Estilos do widget do assistente
│   ├── js/
│   │   ├── index.js         # Menu mobile e validação do formulário de contato
│   │   └── chat.js          # Lógica do chat com o Léo
│   └── fotos/               # Logomarca, imagem de destaque e avatar do Léo
├── server.js                # Servidor Express e endpoint POST /api/chat
├── persona.js               # Persona, contexto e regras do Léo
├── .env.example             # Modelo das variáveis de ambiente
├── .gitignore               # Ignora node_modules/ e .env
├── package.json             # Dependências e metadados do projeto
└── README.md
```
 
## Status do projeto
 
Em desenvolvimento.

## Limitações conhecidas

- O formulário de contato valida os dados no navegador, mas ainda não os envia a nenhum destino: ao enviar, apenas exibe uma confirmação de demonstração.
- O histórico do chat existe apenas enquanto a página está aberta.
- Os links de redes sociais, Termos de Uso e Privacidade do rodapé são ilustrativos.
- Os dados de contato, planos e preços são fictícios.
 
## Contexto acadêmico
 
Projeto desenvolvido em grupo como parte da avaliação da disciplina de Desenvolvimento Web para IA, do curso de Bacharelado em Inteligência Artificial.
 
## Integrantes
 
- Ana Julia Costa Campos de Sousa.
- Natalia Alves dos Santos.
- Werbert da Silva Junior.