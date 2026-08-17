# 🚀 Ativar GitHub Pages — Guia Visual

Seu repositório: **https://github.com/Mbulhoes111/EcoTrackk**

## ⚡ 3 Passos para Ativar Deploy Automático

### Passo 1️⃣ - Abra as Configurações

1. Vá para: https://github.com/Mbulhoes111/EcoTrackk
2. Clique na aba **Settings** (no topo)
3. No menu esquerdo, role até encontrar **Pages** (ou clique direto em https://github.com/Mbulhoes111/EcoTrackk/settings/pages)

### Passo 2️⃣ - Ative GitHub Pages

Em **Build and deployment**:

```
Source: 🔘 Deploy from a branch (já selecionado)
Branch: main
Folder: / (root)
```

**Clique em Save** ✅

### Passo 3️⃣ - Aguarde o Deploy

- GitHub Actions vai rodar automaticamente
- Vá para **Actions** para ver o progresso
- Em ~2 minutos você verá a URL pronta:

```
Your site is live at: https://Mbulhoes111.github.io/EcoTrackk/
```

---

## 📊 O que está Acontecendo?

O workflow **`.github/workflows/deploy.yml`** vai:

1. ✅ Fazer checkout do código
2. ✅ Rodar `npm install`
3. ✅ Executar `npm test` (valida lógica)
4. ✅ Executar `npm run lint` (verifica código)
5. ✅ Executar `node scripts/pre-deploy.js` (valida PWA, accessibility, etc)
6. ✅ Fazer deploy automático para GitHub Pages

---

## 🎯 Resultado Final

Depois de ~2 minutos, seu projeto estará acessível em:

**🌐 https://Mbulhoes111.github.io/EcoTrackk/**

---

## ✨ Próximas Atualizações Automáticas

Sempre que você fizer `git push` em `main`:

```bash
git commit -m "feat: melhorias no EcoTrack"
git push origin main
```

O workflow vai:
- Rodar testes automaticamente
- Se tudo passar → Faz deploy instantaneamente
- Se falhar → Para o deploy e avisa o erro

---

## 🔍 Verificar Status de Deploy

### No GitHub:
- Vá para **Actions** no repositório
- Veja todos os deploys históricos
- Clique em qualquer deploy para ver logs detalhados

### URLs Úteis:
- 🏠 Seu site: https://Mbulhoes111.github.io/EcoTrackk/
- 📝 Settings → Pages: https://github.com/Mbulhoes111/EcoTrackk/settings/pages
- ⚙️ Actions: https://github.com/Mbulhoes111/EcoTrackk/actions
- 📦 Releases: https://github.com/Mbulhoes111/EcoTrackk/releases

---

## 🧪 Testar o Site ao Vivo

1. Abra: https://Mbulhoes111.github.io/EcoTrackk/
2. Teste:
   - ✅ Calculadora de impacto
   - ✅ Tema escuro (botão no topo)
   - ✅ Desconectar internet e recarregar (PWA offline)
   - ✅ Abrir DevTools → Application → Service Workers

---

## 🚨 Se Algo Não Funcionar

### Deploy não aparece
- Volte para https://github.com/Mbulhoes111/EcoTrackk/settings/pages
- Verifique se **Branch** é `main` e **Folder** é `/ (root)`
- Clique **Save** de novo

### Vê erro nos logs
- Vá para **Actions**
- Clique no workflow que falhou
- Veja a aba **Logs** para diagnosticar

### Site não carrega
- Aguarde 5 minutos (propagação DNS)
- Limpe cache (Ctrl+Shift+Delete)
- Teste em navegação privada

---

## 🎉 Sucesso!

Seu site está agora:
- ✅ **Ao vivo** na internet
- ✅ **Automático** — cada push = novo deploy
- ✅ **Validado** — testes + lint rodando
- ✅ **Offline** — PWA cacheando dados
- ✅ **Seguro** — HTTPS nativo do GitHub

Compartilhe a URL: **https://Mbulhoes111.github.io/EcoTrackk/**

---

**Parabéns! 🚀 Seu projeto está online!**
