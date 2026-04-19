// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        nav.style.background = 'rgba(10, 14, 39, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
document.querySelectorAll('.section-header, .about-content, .music-card, .show-card, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a backend
    console.log('Form submitted:', formData);
    
    // Show success message (you can customize this)
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset form
    contactForm.reset();
});

// Music player simulation (placeholder functionality)
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Toggle play/pause icon
        const svg = btn.querySelector('svg');
        const currentPath = svg.querySelector('polygon');
        
        if (currentPath.getAttribute('points') === '5 3 19 12 5 21 5 3') {
            // Change to pause icon
            svg.innerHTML = `
                <rect x="6" y="4" width="4" height="16" fill="currentColor"></rect>
                <rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>
            `;
        } else {
            // Change to play icon
            svg.innerHTML = `
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
            `;
        }
        
        // Here you would integrate with a real music player
        console.log('Play button clicked');
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (hero && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
    }
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor effect (optional - can be removed if too heavy)
const createCursorTrail = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: rgba(255, 51, 102, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
};

// Uncomment to enable cursor trail
// createCursorTrail();

// Add stagger animation delay to music cards
const musicCards = document.querySelectorAll('.music-card');
musicCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Add stagger animation delay to show cards
const showCards = document.querySelectorAll('.show-card');
showCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll handlers
const throttledScroll = throttle(() => {
    // Your scroll handlers here
}, 100);

window.addEventListener('scroll', throttledScroll);

// Shop - Size and Color Selection
const sizeButtons = document.querySelectorAll('.size-btn');
const colorButtons = document.querySelectorAll('.color-btn');

sizeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active from siblings
        const siblings = this.parentElement.querySelectorAll('.size-btn');
        siblings.forEach(s => s.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');
    });
});

colorButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active from siblings
        const siblings = this.parentElement.querySelectorAll('.color-btn');
        siblings.forEach(s => s.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');
    });
});

// Shop - Buy Button
const buyButtons = document.querySelectorAll('.btn-buy');

buyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const productName = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.product-price').textContent;
        const selectedSize = card.querySelector('.size-btn.active');
        const selectedColor = card.querySelector('.color-btn.active');
        
        if (!selectedSize) {
            alert('Por favor, selecione um tamanho!');
            return;
        }
        
        if (!selectedColor) {
            alert('Por favor, selecione uma cor!');
            return;
        }
        
        const size = selectedSize.dataset.size;
        const color = selectedColor.dataset.color;
        
        // Here you would typically redirect to a checkout page or open a payment modal
        // For now, we'll show a confirmation
        const message = `Produto: ${productName}\nTamanho: ${size}\nCor: ${color}\nPreço: ${price}\n\nEm breve você será redirecionado para o checkout!`;
        alert(message);
        
        // You can integrate with payment platforms like:
        // - Stripe
        // - PayPal
        // - Mercado Pago
        // - PagSeguro
        // Example: window.location.href = 'checkout.html?product=' + productName + '&size=' + size + '&color=' + color;
    });
});

// Botão Voltar ao Topo
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let cart = JSON.parse(localStorage.getItem('hyperboreaCart')) || [];

// Atualiza contador
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Adicionar ao carrinho
function addToCart(id, name, price, sku, size) {
    if (!size) {
        alert("Por favor, escolha um tamanho antes de adicionar.");
        return;
    }

    const existing = cart.find(item => item.id === id && item.size === size);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            sku: sku,
            size: size,
            quantity: 1
        });
    }

    localStorage.setItem('hyperboreaCart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} (Tamanho ${size}) adicionado ao carrinho!`);
}

// Mostrar / esconder modal
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    renderCart();
}

// Renderizar itens do carrinho
function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:30px; color:#777;">Seu carrinho está vazio.</p>';
        document.getElementById('cart-total').textContent = '0,00';
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong> - ${item.size}<br>
                <small>R$ ${item.price.toFixed(2)} × ${item.quantity}</small>
            </div>
            <div style="text-align:right;">
                R$ ${subtotal.toFixed(2)}
                <button onclick="removeFromCart(${index})" style="margin-left:10px; color:#e74c3c; background:none; border:none; font-size:18px;">×</button>
            </div>
        `;
        container.appendChild(div);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Remover item
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('hyperboreaCart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Limpar carrinho
function clearCart() {
    if (confirm("Tem certeza que deseja limpar o carrinho?")) {
        cart = [];
        localStorage.setItem('hyperboreaCart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// Finalizar via WhatsApp
function finalizeOrder() {
    if (cart.length === 0) return;

    let message = "Olá! Quero fazer o seguinte pedido da Hyperborea:\n\n";
    
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.name} (${item.size}) - ${item.quantity} un. = R$ ${subtotal.toFixed(2)}\n`;
    });

    message += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
    message += "Por favor, me confirme o endereço de entrega e a forma de pagamento (PIX).";

    const whatsappNumber = "71984029024"; // ← Troque pelo seu número real (com DDD, sem espaços)
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    // Opcional: limpar carrinho após envio
    // clearCart();
}

// Inicializar
updateCartCount();

// ==================== PLAYER DE MÚSICA ====================
let currentAudio = null;
let currentButton = null;

document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const songId = this.getAttribute('data-song');
        if (!songId) return;

        const audio = document.getElementById(`audio-${songId}`);
        if (!audio) return;

        // Se for a mesma música que está tocando
        if (currentAudio === audio) {
            if (audio.paused) {
                audio.play();
                this.querySelector('.play-icon').innerHTML = `<rect x="6" y="4" width="4" height="16" fill="currentColor"></rect><rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>`;
            } else {
                audio.pause();
                this.querySelector('.play-icon').innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
            }
            return;
        }

        // Pausa a música anterior
        if (currentAudio) {
            currentAudio.pause();
            if (currentButton) {
                currentButton.querySelector('.play-icon').innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
            }
        }

        // Toca a nova música
        audio.play().catch(err => console.log("Erro ao reproduzir:", err));
        currentAudio = audio;
        currentButton = this;

        // Muda ícone para pause
        this.querySelector('.play-icon').innerHTML = `<rect x="6" y="4" width="4" height="16" fill="currentColor"></rect><rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>`;
    });
});

console.log('🎸 Hyperborea website loaded successfully!');
