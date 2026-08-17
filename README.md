# EcoTrack

EcoTrack é uma landing page simples para mostrar o impacto ambiental de ações do dia a dia, como transporte, consumo de energia e hábitos sustentáveis.

## Como usar

1. Clone o repositório.
2. Abra a pasta do projeto.
3. Abra `index.html` no navegador ou use um servidor local simples.

Exemplo com Python:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Funcionalidades

- Calculadora visual de impacto ambiental
- Interface responsiva para desktop e mobile
- Tema escuro com foco em acessibilidade
- Suporte a PWA para uso offline
- Estrutura de testes e validação básica

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js para testes e scripts auxiliares

## Testes

```bash
npm run test
```

## Deploy

O projeto já inclui configuração para publicação em plataformas estáticas como GitHub Pages, Netlify e Vercel.

- `netlify.toml` para deploy no Netlify
- `vercel.json` para deploy na Vercel
- workflows em `.github/workflows` para CI e deploy

## Estrutura principal

- `index.html` - estrutura da página
- `styles.css` - visual e responsividade
- `app.js` - lógica da calculadora e interações
- `manifest.json` - configuração PWA
- `service-worker.js` - suporte offline
- `test/test.js` - testes básicos
- `scripts/` - utilitários para otimização e validação

## Observações

Este projeto foi pensado para ser fácil de rodar, fácil de entender e simples de adaptar para outras ideias de dashboard ambiental ou sustentabilidade.

