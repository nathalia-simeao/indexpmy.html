// --- 1. LÓGICA DO MODO NOTURNO ---
const inputCheck = document.querySelector('#modo-noturno');
const elemento = document.querySelector('body');

if (inputCheck) {
    inputCheck.addEventListener('click', () => {
        const modo = inputCheck.checked ? 'dark' : 'light';
        elemento.setAttribute("data-bs-theme", modo);
    });
}

// --- 1.5. TROCAR ÍCONES NO MODO NOTURNO ---
function updateIconsForTheme(theme) {
    const icons = document.querySelectorAll('.social-icon-img');
    
    icons.forEach(icon => {
        const lightSrc = icon.getAttribute('data-icon-light');
        const darkSrc = icon.getAttribute('data-icon-dark');

        if (lightSrc && darkSrc) {
            if (theme === 'dark') {
                icon.src = darkSrc;
            } else {
                icon.src = lightSrc;
            }
        }
    });
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
    updateIconsForTheme(savedTheme);
    
    // Se o tema salvo for 'dark', marcar o checkbox
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }

    // 2. Ouvir o evento de mudança no switch
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Ativa o Modo Noturno (dark)
            body.setAttribute('data-bs-theme', 'dark');
            updateIconsForTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // Ativa o Modo Claro (light)
            body.setAttribute('data-bs-theme', 'light');
            updateIconsForTheme('light');
            localStorage.setItem('theme', 'light');
        }
    });
});

//swiper galeria de fotos dos tours

document.addEventListener('DOMContentLoaded', function () {
    const tourPhotosSlider = new Swiper('.tour-photos-slider', {
        // Configurações do Swiper
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000, // Passa para o próximo slide a cada 3 segundos
            disableOnInteraction: false, // Continua o autoplay mesmo depois de interação manual
        },
    });
});
