'use strict';



/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * header & go top btn active on page scroll
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

// i. Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const errorEl = document.getElementById('email-error');
    
    if (validateEmail(email)) {
        errorEl.textContent = 'Valid email!';
        errorEl.style.color = 'green';
    } else {
        errorEl.textContent = 'Please enter a valid email with @';
        errorEl.style.color = 'var(--error-color)';
    }
});

// Real-time validation
document.getElementById('email').addEventListener('input', (e) => {
    const errorEl = document.getElementById('email-error');
    if (validateEmail(e.target.value)) {
        errorEl.textContent = '';
    } else {
        errorEl.textContent = 'Email must contain @ and domain';
    }
});

// ii. Shopping cart
let cart = { items: 0, total: 0 };

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const price = parseInt(e.target.dataset.price);
        cart.items++;
        cart.total += price;
        
        document.getElementById('cart-count').textContent = cart.items;
        document.getElementById('cart-total').textContent = cart.total;
        
        e.target.textContent = 'Added!';
        setTimeout(() => e.target.textContent = `Add to Cart ($${price})`, 1000);
    });
});

// iii & iv. Greeting, date, and theme (from previous)
function updateGreeting() {
    const now = new Date();
    const hours = now.getHours();
    let greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
    
    document.getElementById('greeting').textContent = `${greeting}!`;
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
}

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
    const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(saved);
}

themeToggle.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// Initialize everything
updateGreeting();
initTheme();
