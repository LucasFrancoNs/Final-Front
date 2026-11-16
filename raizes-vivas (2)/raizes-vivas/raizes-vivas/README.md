# Raízes Vivas — One Page (SPA)

Projeto final da unidade curricular de Front-end.

**Link do projeto publicado:** _(cole aqui a URL do GitHub Pages / Netlify / Vercel)_

## Tema

**Raízes Vivas** é um projeto social fictício de hortas comunitárias: transforma terrenos ociosos em hortas que geram alimento saudável, renda extra e convivência entre vizinhos. A página apresenta o projeto, seu impacto, as atividades e permite que visitantes entrem em contato para ser voluntários ou doar.

> Para usar com uma iniciativa real, troque os textos, o endereço, o e-mail e os números em `index.html`.

## Tecnologias

- HTML5 semântico (`header/nav`, `main`, `section`, `footer`)
- CSS3 (variáveis, gradientes, animações, tema escuro)
- JavaScript ES6+ (sem bibliotecas além do Bootstrap)
- Bootstrap 5.3 e Bootstrap Icons via CDN
- Formspree para envio do formulário por e-mail

## Componentes Bootstrap usados

Navbar responsiva (com scrollspy), Grid, Cards, Accordion, Carousel, Modal, Buttons, Forms e Alerts.

## Recursos em JavaScript

1. **Modo claro/escuro**, com preferência salva no navegador.
2. **Contadores numéricos animados**, iniciados quando a seção aparece na tela.
3. **Animações de rolagem** (elementos surgem ao entrar na tela, via IntersectionObserver).
4. **Filtro da galeria** por categoria, com **modal** preenchido dinamicamente.
5. **Formulário com validação dinâmica** (campos obrigatórios, formato de e-mail, telefone com DDD) e mensagens de sucesso/erro.
6. Botão "voltar ao topo" e fechamento automático do menu mobile.

## Configurando o envio do formulário (Formspree)

1. Crie uma conta gratuita em <https://formspree.io> e um novo formulário com o seu e-mail.
2. Copie a URL do formulário (`https://formspree.io/f/xxxxxxx`).
3. Em `js/main.js`, substitua o valor da constante `FORMSPREE_URL`.

Enquanto a constante estiver com o valor padrão, o envio é apenas simulado (aparece a mensagem de sucesso, mas nada é enviado).

## Estrutura

```
raizes-vivas/
├── index.html
├── css/style.css
├── js/main.js
├── img/logo.svg
└── README.md
```

## Como publicar (GitHub Pages)

1. Crie um repositório e envie estes arquivos.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. Aguarde alguns minutos e copie o link para este README.

## Como rodar localmente

Basta abrir o `index.html` no navegador.

## Créditos das imagens

Fotos ilustrativas obtidas no Wikimedia Commons, todas livres para uso:

- *Temescal Community Garden*, de Mx. Granger (CC0)
- Voluntários plantando no People's Garden do USDA, de USDA / Lance Cheung (domínio público)
- *Fresh From the Market*, de Anne Preble, via Unsplash (CC0)

As imagens são carregadas direto do Commons. Para a versão final, baixe-as para a pasta `img/` (ou, melhor, use fotos do seu próprio projeto) e troque os endereços no `index.html` e no `css/style.css`.
