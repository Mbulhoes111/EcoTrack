# 🌱 EcoTrack

> Uma interface simples, rápida e consciente para acompanhar o seu impacto ambiental.

O **EcoTrack** é um projeto front-end desenvolvido para transformar métricas de impacto ecológico em visualizações simples e acessíveis. O objetivo principal é oferecer uma experiência fluida, leve e intuitiva — demonstrando boas práticas de desenvolvimento web moderno, acessibilidade e performance.

---

## ✨ O que este projeto traz de bom?

* 📱 **100% Responsivo & Acessível:** Funciona bem em qualquer tela e prioriza a navegação por teclado e leitores de tela.
* ⚡ **Modo PWA (Offline First):** Graças ao Service Worker e Manifest, você pode instalar e usar a aplicação mesmo sem conexão.
* 🛠️ **Código Limpo & Testado:** Lógica isolada em `app.js` com testes unitários automáticos e padrões de código garantidos via ESLint e Prettier.
* 🔄 **CI/CD Integrado:** Workflows automatizados no GitHub Actions para garantir qualidade a cada alteração.
* 🖼️ **Otimização de Mídias:** Scripts prontos para conversão e geração de imagens responsivas (`WebP`/`srcset`).

---

## 🚀 Como rodar na sua máquina

Quer testar localmente? É bem simples!

### 1. Visualização direta
Basta abrir o arquivo `index.html` no seu navegador de preferência.

### 2. Rodando os testes
Se quiser verificar se está tudo funcionando como esperado (requer **Node.js v14+**):

```bash
npm run test
📸 Otimizando Imagens e Performance
Para manter o site super leve, utilizamos o sharp para converter e redimensionar imagens automaticamente.

Instale as dependências de desenvolvimento:

Bash
npm install --save-dev sharp
Adicione suas imagens originais na pasta assets/ (ex.: assets/illustration.svg).

Gere as versões otimizadas:

Bash
# Gera versões leves em WebP e PNG
npm run images

# Gera múltiplos tamanhos (320px, 640px, 1280px) com suporte a srcset
npm run images:responsive
💡 O script cria automaticamente os arquivos responsivos (assets/nome-320.webp, assets/nome-640.webp, assets/nome-1280.webp) e atualiza as tags no index.html.

☁️ Publicando o Projeto (Deploy)
O EcoTrack está pronto para ser publicado em questão de minutos. Escolha a plataforma que preferir:

Vá em Settings → Pages no seu repositório do GitHub.

Em Source, selecione Deploy from a branch.

Escolha a branch main (ou master) e a pasta / (root).

Clique em Save.

Deploy Automático: A cada novo push na branch principal, o workflow .github/workflows/deploy.yml fará o teste e o deploy automático em https://seu-usuario.github.io/ecotrack.

Deploy Manual:

Bash
npm run predeploy
git push origin main
Entre no netlify.com e selecione Add new site → Import an existing project.

Conecte com seu GitHub e selecione este repositório.

Como o projeto é estático, deixe o campo Build command em branco e o Publish directory como ..

O Netlify lerá a configuração do arquivo netlify.toml automaticamente e disponibilizará o site em https://seu-site.netlify.app.

Acesse o painel da vercel.com e clique em Add New... → Project.

Importe o repositório. O arquivo vercel.json será detectado sozinho.

Clique em Deploy e seu site estará no ar em https://seu-projeto.vercel.app.

⚙️ Entrega Contínua (CI/CD)
O projeto conta com 3 workflows automáticos do GitHub Actions:

.github/workflows/ci.yml - Executa lint e testes em cada push.

.github/workflows/deploy.yml - Realiza o deploy automático no GitHub Pages.

.github/workflows/images-optimize.yml - Otimiza as imagens para release.

🧪 Checklist antes e depois do Deploy
📋 Antes de enviar o código (Pre-Deploy)
Execute o comando abaixo para garantir que nada quebrará em produção:

Bash
npm run predeploy
Isso roda os testes unitários (npm test), valida o estilo do código (npm run lint) e checa recursos críticos (PWA, acessibilidade, etc).

📱 Checklist de verificação rápida (Pós-Deploy)
Após subir o site, vale a pena dar uma conferida nestes pontos:

[ ] Site carrega corretamente em desktop e mobile

[ ] Service worker está registrado (DevTools → Application → Service Workers)

[ ] Modo offline funciona ao desligar a conexão

[ ] Tema escuro ativa corretamente

[ ] Calculadora simula impactos sem erros

[ ] Meta tags e SEO estão corretos

Para testar o servidor local idêntico ao de produção:

Bash
npm start
# Acesse em http://localhost:8000
