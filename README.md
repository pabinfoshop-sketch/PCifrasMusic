# PCifrasMusic

App PWA completo para violão em português brasileiro.

**Funcionalidades:**
- 🎤 **Afinador real** (Web Audio + autocorrelação, A4=440Hz)
- 🎸 **24 acordes** (12 gratuitos + 12 Premium) com diagramas SVG interativos
- 📏 **Escalas musicais** com som e diagramas
- ⏱️ **Metrônomo** com clique + visual + tap tempo
- ⭐ **Favoritos** + **Minhas Cifras personalizadas** (usuário adiciona suas próprias)
- 💎 **Premium simulado** (R$ 49,90/ano + 7 dias de trial via localStorage)

**Design:** Madeira escura + ouro (#2C2118, #D4AF37) – fiel ao estilo violão brasileiro.

**Splash screen:** Exato conforme solicitado ("SEJA BEM-VINDO", ícone central com guitarra + palheta "PC" + sanfona, título "PCifrasMusic", barra azul, rodapé "Criado com carinho por PauloC").

## Como usar

1. Abra o `index.html` no navegador (ou instale como PWA).
2. O splash aparece por ~2.8s (ou toque para pular).
3. Use a barra inferior para navegar: Início → Afinador → Acordes → Escalas → Favoritos → Premium.

**Instalação como PWA:**
- No celular (Chrome/Edge): Menu → "Instalar app" ou "Adicionar à tela inicial".
- Funciona offline após a primeira visita.

## Estrutura

```
pcifrasmusic/
├── index.html
├── manifest.json
├── sw.js
├── css/style.css
├── js/
│   ├── app.js
│   ├── tuner.js
│   ├── chords.js
│   ├── scales.js
│   ├── metronome.js
│   └── favorites.js
└── icons/ (192px, 512px, maskable)
```

## Deploy

### GitHub
```bash
git add .
git commit -m "update"
git push origin main --force
```

### Fly.io (Static)
```bash
fly launch --image flyio/static
# ou
fly deploy
```

O app é 100% estático (sem backend).

## Créditos
Criado com carinho por PauloC — PCifrasMusic.

---

**Nota para desenvolvedores:** Tudo em PT-BR. Premium é simulação (localStorage). Sem músicas fixas — o usuário adiciona suas próprias cifras.
