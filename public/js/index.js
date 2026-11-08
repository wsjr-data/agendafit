// ===================================================
//  MENU MOBILE (hambúrguer)
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    const botaoMenu = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu-principal');

    if (botaoMenu && menu) {
        const alternarMenu = (abrir) => {
            botaoMenu.setAttribute('aria-expanded', String(abrir));
            botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
            menu.classList.toggle('aberto', abrir);
        };

        botaoMenu.addEventListener('click', () => {
            alternarMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
        });

        // fecha o menu ao clicar em um link de navegação
        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => alternarMenu(false));
        });

        // fecha o menu com a tecla Esc
        document.addEventListener('keydown', (evento) => {
            if (evento.key === 'Escape') alternarMenu(false);
        });
    }

    iniciarFormularioContato();
});

// ===================================================
//  FORMULÁRIO DE CONTATO (com validação)
// ===================================================
function iniciarFormularioContato() {
    const form = document.getElementById('form-contato');
    if (!form) return;

    const feedback = document.getElementById('form-feedback');
    const contador = document.getElementById('contador-mensagem');
    const mensagem = document.getElementById('mensagem');

    const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const REGEX_NOME = /^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]+$/;

    // Regras de validação de cada campo. Retorna uma mensagem de erro ou '' se estiver válido.
    const regras = {
        nome: (valor) => {
            const limpo = valor.trim();
            if (!limpo) return 'Informe seu nome.';
            if (limpo.length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
            if (!REGEX_NOME.test(limpo)) return 'Use apenas letras no nome.';
            return '';
        },
        email: (valor) => {
            const limpo = valor.trim();
            if (!limpo) return 'Informe seu e-mail.';
            if (!REGEX_EMAIL.test(limpo)) return 'Informe um e-mail válido, como nome@dominio.com.';
            return '';
        },
        telefone: (valor) => {
            const digitos = valor.replace(/\D/g, '');
            if (!digitos) return ''; // campo opcional
            if (digitos.length !== 10 && digitos.length !== 11) {
                return 'Informe o DDD e o número (10 ou 11 dígitos).';
            }
            return '';
        },
        assunto: (valor) => (valor ? '' : 'Selecione um assunto.'),
        mensagem: (valor) => {
            const limpo = valor.trim();
            if (!limpo) return 'Escreva uma mensagem.';
            if (limpo.length < 10) return 'A mensagem deve ter pelo menos 10 caracteres.';
            if (limpo.length > 500) return 'A mensagem deve ter no máximo 500 caracteres.';
            return '';
        }
    };

    const campos = Object.keys(regras).map((id) => document.getElementById(id));

    const mostrarErro = (campo, texto) => {
        const erro = document.getElementById(`erro-${campo.id}`);
        campo.setAttribute('aria-invalid', texto ? 'true' : 'false');
        campo.classList.toggle('invalido', Boolean(texto));
        if (erro) erro.textContent = texto;
    };

    const validarCampo = (campo) => {
        const texto = regras[campo.id](campo.value);
        mostrarErro(campo, texto);
        return !texto;
    };

    // Valida apenas os campos que já foram tocados, para não gritar com o usuário antes da hora
    campos.forEach((campo) => {
        campo.addEventListener('blur', () => {
            campo.dataset.tocado = 'true';
            validarCampo(campo);
        });

        campo.addEventListener('input', () => {
            if (campo.dataset.tocado === 'true') validarCampo(campo);
        });
    });

    // Contador de caracteres da mensagem
    mensagem.addEventListener('input', () => {
        contador.textContent = `${mensagem.value.length}/500`;
    });

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        let primeiroInvalido = null;
        campos.forEach((campo) => {
            campo.dataset.tocado = 'true';
            const valido = validarCampo(campo);
            if (!valido && !primeiroInvalido) primeiroInvalido = campo;
        });

        if (primeiroInvalido) {
            mostrarFeedback('Revise os campos destacados antes de enviar.', 'erro');
            primeiroInvalido.focus();
            return;
        }

        // Não há endpoint de envio configurado ainda: apenas confirma para o usuário.
        mostrarFeedback('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'sucesso');
        form.reset();
        contador.textContent = '0/500';
        campos.forEach((campo) => {
            delete campo.dataset.tocado;
            mostrarErro(campo, '');
        });
    });

    function mostrarFeedback(texto, tipo) {
        feedback.textContent = texto;
        feedback.className = `form-feedback ${tipo}`;
        feedback.hidden = false;
    }
}
