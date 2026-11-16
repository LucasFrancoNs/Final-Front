'use strict';

/* ============================================================
   CONFIGURAÇÃO DO FORMULÁRIO (Formspree)
   1. Crie uma conta gratuita em https://formspree.io
   2. Crie um formulário apontando para o seu e-mail
   3. Cole abaixo a URL gerada (ex.: https://formspree.io/f/abcdwxyz)
   Enquanto o valor padrão estiver aqui, o envio é SIMULADO.
   ============================================================ */
const FORMSPREE_URL = 'https://formspree.io/f/SEU_ID_AQUI';

document.addEventListener('DOMContentLoaded', () => {
  iniciarTema();
  iniciarRevelacaoNaRolagem();
  iniciarContadores();
  iniciarFiltroGaleria();
  iniciarModalGaleria();
  iniciarBotaoTopo();
  iniciarFormulario();
  document.getElementById('ano').textContent = new Date().getFullYear();
});

/* ---------- 1. Modo claro/escuro (salvo no localStorage) ---------- */
function iniciarTema() {
  const botao = document.getElementById('btn-tema');
  const icone = botao.querySelector('i');
  const html = document.documentElement;

  const aplicar = (tema) => {
    html.setAttribute('data-bs-theme', tema);
    icone.className = tema === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  };

  let salvo = null;
  try { salvo = localStorage.getItem('tema'); } catch (e) { /* ignora */ }
  const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicar(salvo || (prefereEscuro ? 'dark' : 'light'));

  botao.addEventListener('click', () => {
    const novo = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    aplicar(novo);
    try { localStorage.setItem('tema', novo); } catch (e) { /* ignora */ }
  });
}

/* ---------- 2. Animação de elementos ao rolar ---------- */
function iniciarRevelacaoNaRolagem() {
  const itens = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    itens.forEach((el) => el.classList.add('visivel'));
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visivel');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  itens.forEach((el) => obs.observe(el));
}

/* ---------- 3. Contadores numéricos animados ---------- */
function iniciarContadores() {
  const contadores = document.querySelectorAll('.numero[data-meta]');

  const animar = (el) => {
    const meta = Number(el.dataset.meta);
    const duracao = 1800;
    const inicio = performance.now();
    const passo = (agora) => {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const suave = 1 - Math.pow(1 - progresso, 3); // ease-out
      el.textContent = Math.round(meta * suave);
      if (progresso < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  if (!('IntersectionObserver' in window)) {
    contadores.forEach((el) => { el.textContent = el.dataset.meta; });
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        animar(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  contadores.forEach((el) => obs.observe(el));
}

/* ---------- 4. Filtro da galeria ---------- */
function iniciarFiltroGaleria() {
  const botoes = document.querySelectorAll('#filtros button');
  const itens = document.querySelectorAll('.item-galeria');

  botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
      const filtro = botao.dataset.filtro;
      botoes.forEach((b) => {
        const ativo = b === botao;
        b.classList.toggle('active', ativo);
        b.classList.toggle('btn-verde', ativo);
        b.classList.toggle('btn-outline-success', !ativo);
      });
      itens.forEach((item) => {
        const mostrar = filtro === 'todos' || item.dataset.categoria === filtro;
        item.classList.toggle('oculto', !mostrar);
      });
    });
  });
}

/* ---------- Modal da galeria: preenche com os dados do item clicado ---------- */
function iniciarModalGaleria() {
  const modal = document.getElementById('modalFoto');
  modal.addEventListener('show.bs.modal', (evento) => {
    const gatilho = evento.relatedTarget;
    document.getElementById('modalFotoTitulo').textContent = gatilho.dataset.titulo;
    document.getElementById('modalFotoTexto').textContent = gatilho.dataset.texto;
    const img = document.getElementById('modalFotoImg');
    if (gatilho.dataset.imagem) {
      img.src = gatilho.dataset.imagem;
      img.alt = gatilho.dataset.titulo;
      img.classList.remove('d-none');
    } else {
      img.removeAttribute('src');
      img.classList.add('d-none');
    }
  });
}

/* ---------- Botão "voltar ao topo" + fechar menu mobile ao clicar ---------- */
function iniciarBotaoTopo() {
  const botao = document.getElementById('btn-topo');
  window.addEventListener('scroll', () => {
    botao.classList.toggle('visivel', window.scrollY > 400);
  }, { passive: true });
  botao.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const menu = document.getElementById('navLinks');
  document.querySelectorAll('#navLinks .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
}

/* ---------- 5. Formulário: validação + envio ---------- */
function iniciarFormulario() {
  const form = document.getElementById('form-contato');
  const feedback = document.getElementById('feedback-form');
  const botao = document.getElementById('btn-enviar');
  const campos = form.querySelectorAll('input, select, textarea');

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validarCampo = (campo) => {
    const valor = campo.value.trim();
    let valido = true;

    if (campo.required && valor === '') valido = false;
    else if (campo.minLength > 0 && valor.length < campo.minLength) valido = false;
    else if (campo.type === 'email' && !regexEmail.test(valor)) valido = false;
    else if (campo.type === 'tel') {
      const digitos = valor.replace(/\D/g, '');
      valido = digitos.length >= 10 && digitos.length <= 11;
    }

    campo.classList.toggle('is-invalid', !valido);
    campo.classList.toggle('is-valid', valido);
    return valido;
  };

  // Validação dinâmica enquanto o usuário digita/sai do campo
  campos.forEach((campo) => {
    campo.addEventListener('blur', () => validarCampo(campo));
    campo.addEventListener('input', () => {
      if (campo.classList.contains('is-invalid')) validarCampo(campo);
    });
  });

  const mostrarMensagem = (tipo, texto) => {
    feedback.innerHTML = '';
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} mb-0`;
    alerta.textContent = texto;
    feedback.appendChild(alerta);
  };

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    feedback.innerHTML = '';

    const todosValidos = Array.from(campos).map(validarCampo).every(Boolean);
    if (!todosValidos) {
      mostrarMensagem('danger', 'Revise os campos destacados em vermelho e tente novamente.');
      form.querySelector('.is-invalid')?.focus();
      return;
    }

    botao.disabled = true;
    const textoOriginal = botao.textContent;
    botao.textContent = 'Enviando...';

    try {
      if (FORMSPREE_URL.includes('SEU_ID_AQUI')) {
        // Modo simulado: formspree ainda não configurado
        await new Promise((resolve) => setTimeout(resolve, 900));
        console.info('Envio simulado. Dados:', Object.fromEntries(new FormData(form)));
      } else {
        const resposta = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        if (!resposta.ok) throw new Error('Falha no envio');
      }
      mostrarMensagem('success', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
      form.reset();
      campos.forEach((c) => c.classList.remove('is-valid', 'is-invalid'));
    } catch (erro) {
      mostrarMensagem('danger', 'Não foi possível enviar agora. Tente novamente ou escreva para contato@raizesvivas.org.');
    } finally {
      botao.disabled = false;
      botao.textContent = textoOriginal;
    }
  });
}
