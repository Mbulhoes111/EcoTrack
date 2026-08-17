# EcoTrack

Projeto front-end simples para demonstrar uma interface de acompanhamento de impacto ambiental.

Como usar

- Abra `index.html` em um navegador moderno.
- Para rodar os testes básicos (Node.js v14+):

```bash
npm run test
```

Melhorias adicionadas

- Responsividade (media queries) e foco acessível no `styles.css`.
- Código refatorado em `app.js` com lógica pura exportada para testes.
- Testes simples em `test/test.js`.
- Configurações iniciais de `eslint` e `prettier`.
- Suporte PWA: `manifest.json` e `service-worker.js` para modo offline.
- Workflow de CI: `.github/workflows/ci.yml` executa lint e testes.

Converter e otimizar imagens

1. Instale `sharp` (recomendado globalmente ou no projeto):

```bash
npm install --save-dev sharp
```

2. Coloque imagens em `assets/` (ex.: `assets/illustration.svg`).

3. Rode o script para gerar `webp`/`png` otimizados:

```bash
npm run images
```

4. Para gerar múltiplos tamanhos (320/640/1280) e atualizar `srcset` automaticamente no HTML:

```bash
npm run images:responsive
```

Isso cria arquivos `assets/nome-320.webp`, `assets/nome-640.webp`, `assets/nome-1280.webp` e atualiza `index.html` com atributos `srcset` e `sizes`.

O script `scripts/convert-images.js` converte arquivos `.svg`, `.png`, `.jpg` em `assets/` para `webp` e `png` otimizados e deixa os arquivos prontos para uso em `<picture>`/`srcset`.

## Deploy

O EcoTrack está configurado para deploy automático em 3 plataformas principais. Escolha a que preferir:

### 🚀 Opção 1: GitHub Pages (Gratuito, nativo do GitHub)

1. **Ative GitHub Pages no repositório:**
   - Vá para Settings → Pages
   - Selecione "Deploy from a branch"
   - Branch: `main` (ou `master`)
   - Pasta: `/ (root)`
   - Salve

2. **O workflow de deploy vai rodar automaticamente:**
   - A cada push em `main`, o workflow `.github/workflows/deploy.yml` executa
   - Valida testes e lint
   - Faz deploy automático para `https://seu-usuario.github.io/ecotrack`

3. **Ou faça deploy manual:**
   ```bash
   npm run predeploy
   git push origin main
   ```

**URL final:** `https://seu-usuario.github.io/ecotrack`

---

### 🌐 Opção 2: Netlify (Fácil, com previews de PRs)

1. **Conecte seu repositório:**
   - Acesse [netlify.com](https://netlify.com)
   - Clique "Add new site" → "Import an existing project"
   - Selecione seu repositório GitHub
   - Branch: `main`
   - Build command: deixe vazio (projeto estático)
   - Publish directory: `.`

2. **Netlify detectará o arquivo `netlify.toml` automaticamente**

3. **Pronto!** Seu site sai do ar em poucos segundos
   - URL: `https://seu-site.netlify.app`
   - Previews automáticos para PRs

---

### ⚡ Opção 3: Vercel (Rápido, performance otimizada)

1. **Conecte seu repositório:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique "Add New..." → "Project"
   - Selecione seu repositório GitHub
   - Vercel detectará o `vercel.json` automaticamente

2. **Configure (opcional):**
   - Environment: Production
   - Branch: main

3. **Deploy:**
   - Clique "Deploy"
   - URL: `https://seu-projeto.vercel.app`

---

### 📋 Pré-Deploy Checklist

Antes de fazer deploy, execute:

```bash
npm run predeploy
```

Isso roda:
1. ✅ Testes unitários (`npm test`)
2. ✅ Linter de código (`npm run lint`)
3. ✅ Validação de recursos críticos (PWA, accessibility, etc)

---

### 🔄 Entrega Contínua (CI/CD)

O projeto inclui 3 workflows automáticos:

- **`.github/workflows/ci.yml`** - Lint + testes em cada push
- **`.github/workflows/deploy.yml`** - Deploy automático em GitHub Pages
- **`.github/workflows/images-optimize.yml`** - Otimiza imagens para release

---

### 📱 Checklist Pós-Deploy

Após deploy, verifique:

- [ ] Site carrega corretamente em desktop e mobile
- [ ] Service worker está registrado (veja em DevTools → Application → Service Workers)
- [ ] Modo offline funciona (desative internet e recarregue)
- [ ] Tema escuro ativa corretamente
- [ ] Calculadora simula impactos sem erros
- [ ] Meta tags e SEO estão corretos

Teste com:
```bash
npm start
# Abra em http://localhost:8000
```

