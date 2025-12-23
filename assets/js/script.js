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
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️'; // Sun for light mode
    } else {
        html.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙'; // Moon for dark mode
    }
    localStorage.setItem('theme', theme);
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToUse = saved || (prefersDark ? 'dark' : 'light');
    setTheme(themeToUse);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Initialize everything
updateGreeting();
initTheme();


// Initialize everything
updateGreeting();
initTheme();
