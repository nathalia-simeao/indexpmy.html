
// --- 1. LÓGICA DO MODO NOTURNO ---
const inputCheck = document.querySelector('#modo-noturno');
const elemento = document.querySelector('body');

if (inputCheck) {
    inputCheck.addEventListener('click', () => {
        const modo = inputCheck.checked ? 'dark' : 'light';
        elemento.setAttribute("data-bs-theme", modo);
    });
}


// --- 2. LÓGICA DE FORMATAÇÃO DE MOEDA ---

/**
 * Função para formatar um número como moeda em um locale específico.
 * @param {number} amount - O valor numérico (base em EUR, neste caso).
 * @param {string} currencyCode - O código ISO da moeda (ex: 'EUR', 'USD').
 * @param {string} locale - O código do locale (ex: 'pt-PT', 'en-US').
 * @returns {string} O valor formatado como moeda.
 */
function formatCurrency(amount, currencyCode, locale) {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2, 
    });
    return formatter.format(amount);
}

/**
 * Aplica a formatação de moeda aos elementos .tour-price.
 */
function applyCurrencyFormatting() {
    // === CONFIGURAÇÃO GLOBAL DE MOEDA ===
    // Define as preferências do usuário
    // Exemplo: Simulando um cliente dos EUA que quer ver preços em USD
    const targetLocale = 'en-US'; 
    const targetCurrency = 'USD'; 
    // Para ver em Euros (Europa):
    // const targetLocale = 'pt-PT'; 
    // const targetCurrency = 'EUR'; 
    // ====================================

    const priceElements = document.querySelectorAll('.tour-price');

    priceElements.forEach(element => {
        // Pega o valor base em EUR do atributo data-price-eur
        const basePrice = parseFloat(element.getAttribute('data-price-eur'));
        
        if (!isNaN(basePrice)) {
            // Aplica a formatação
            element.textContent = formatCurrency(basePrice, targetCurrency, targetLocale);
        }
    });
}

// Aguarda o carregamento completo do documento
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializa o Swiper para a seção 'Nossos Guias'
    const swiper = new Swiper('.guides-swiper', {
        
        slidesPerView: 1, 
        spaceBetween: 20, 
        
        // NOVO: Habilita a transição automática
        autoplay: {
            delay: 5000, // Tempo de espera entre os slides (5000ms = 5 segundos)
            disableOnInteraction: false, // O carrossel não para se o usuário interagir (clicar ou arrastar)
        },
        
        // Ativa a paginação (as bolinhas)
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Mantém o loop
        loop: true, 
    });
});

// Aplicação do modo noturno 

document.addEventListener('DOMContentLoaded', () => {
    // Referência ao checkbox/switch do modo noturno
    const themeToggle = document.getElementById('modo-noturno');
    const body = document.body;
    
    // 1. Carregar a preferência salva (ou usar 'light' como padrão)
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-bs-theme', savedTheme);
    
    // Se o tema salvo for 'dark', marcar o checkbox
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }

    // 2. Ouvir o evento de mudança no switch
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Ativa o Modo Noturno (dark)
            body.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // Ativa o Modo Claro (light)
            body.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});


