# 🚀 Guia de Deploy do EcoTrack

## ⚡ Quick Start (5 minutos)

### Passo 1: Validar que tudo está pronto
```bash
npm run predeploy
```
Se tudo passar, você verá ✨ **Pre-deploy validation passed!**

### Passo 2: Escolher a plataforma

---

## 📊 Comparação de Plataformas

| Plataforma | Custo | Setup | Performance | CI/CD | Recomendado para |
|-----------|-------|-------|-------------|-------|------------------|
| **GitHub Pages** | Grátis | 2 min | ⭐⭐⭐ | Automático | Projetos open-source |
| **Netlify** | Grátis | 3 min | ⭐⭐⭐⭐ | Excelente | Startups/MVP |
| **Vercel** | Grátis | 3 min | ⭐⭐⭐⭐⭐ | Premium | Apps com alto tráfego |

---

## 🔧 Passo a Passo por Plataforma

### GitHub Pages

**Tempo: ~2 minutos**

1. Vá para seu repositório no GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `main` / Folder: `/ (root)`
5. **Deploy automático inicia!**
6. Acesse: `https://<seu-usuario>.github.io/ecotrack`

**Workflow automático:**
- Cada push em `main` → Testa → Faz deploy automaticamente

---

### Netlify

**Tempo: ~3 minutos**

1. Acesse [netlify.com](https://netlify.com)
2. **New site from Git**
3. Conecte seu repositório GitHub
4. Build settings (deixe vazio):
   - Branch: `main`
   - Build command: (nenhum)
   - Publish directory: `.`
5. **Deploy!**
6. Seu site ao vivo em ~30 segundos

**Features extras:**
- Preview automático para PRs
- Rollback com 1 clique
- Analytics e monitoring integrados

---

### Vercel

**Tempo: ~3 minutos**

1. Acesse [vercel.com](https://vercel.com)
2. **Add New → Project**
3. Selecione seu repositório GitHub
4. Vercel detecta `vercel.json` automaticamente
5. **Deploy**
6. URL: `https://<seu-projeto>.vercel.app`

**Performance:**
- Cache global automático
- Edge computing em 300+ locais
- 99.99% uptime SLA

---

## 📱 Testar Localmente Antes de Deploy

```bash
# Inicia servidor local
npm start

# Acesse em http://localhost:8000
# Abra DevTools → Application para ver Service Worker
```

### Checklist pré-deploy:
- [ ] Calculadora funciona sem erros
- [ ] Tema escuro ativa e persiste
- [ ] Modo offline funciona
- [ ] PWA instala no celular
- [ ] Testes passam: `npm test`
- [ ] Lint sem erros: `npm run lint`

---

## 🔄 Após Deploy

### Monitorar

**GitHub Pages:**
- Settings → Pages → Visit site (canto superior)
- Aguarde 2-3 minutos para propagação DNS

**Netlify:**
- Dashboard → Deployments → veja status ao vivo

**Vercel:**
- Dashboard → Deployments → veja métricas de performance

### Validar PWA

1. Abra a URL do seu deploy no navegador
2. DevTools → Application
3. Veja se Service Worker está "Active"
4. Offline → Recarregue → Deve funcionar

---

## 🚨 Troubleshooting

### "Service Worker não registra"
- Verifique que `service-worker.js` está na raiz
- Limpe cache do navegador (Ctrl+Shift+Del)

### "Tema escuro não persiste"
- Verificar localStorage em DevTools
- Testar em modo incógnito

### "Calculadora não funciona"
- Abrir DevTools → Console para ver erros
- Rodar `npm test` localmente para diagnosticar

### "Deploy falha no GitHub Actions"
- Verifique logs em Actions → workflow
- Rode `npm run predeploy` localmente

---

## 📈 Próximas Melhorias (Roadmap)

- [ ] Analytics com Plausible ou Fathom
- [ ] Email capture com SendGrid
- [ ] Banco de dados com Supabase
- [ ] Dashboard com Redash
- [ ] Mobile app com React Native

---

## 💡 Dicas de Performance

### Após deploy, optimize:

1. **Imagens responsivas:**
   ```bash
   npm run images:responsive
   ```

2. **Comprimir assets:**
   - Netlify/Vercel fazem automaticamente
   - Gzip + Brotli ativados por padrão

3. **Cache headers:**
   - Já configurados em `netlify.toml` e `vercel.json`
   - Service Worker cacheia assets estáticos

4. **Monitorar Core Web Vitals:**
   - PageSpeed Insights
   - WebPageTest.org

---

## 📞 Suporte

- GitHub Issues: abra uma issue no repositório
- Documentação Netlify: https://docs.netlify.com
- Documentação Vercel: https://vercel.com/docs
- GitHub Pages: https://pages.github.com

---

**Sucesso! Seu projeto está no ar! 🎉**
