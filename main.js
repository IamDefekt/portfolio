'use strict';

// Menu burger mobile

const burger = document.getElementById('menuBurger');
const menu = document.getElementById('menu');
const desktop = window.matchMedia('(min-width: 1024px)');

burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open'); 
    burger.classList.toggle('open'); 
    burger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('#menu a').forEach((link) => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
    });
});

desktop.addEventListener('change', (e) => {
    if (e.matches) {
        menu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
    }
});

// Light/Dark mode

const root = document.documentElement;
const toggleTheme = document.getElementById('toggle-theme');

const saved = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme = saved ?? (systemDark ? 'dark' : 'light');

toggleTheme.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
});

// Pop-up pour les vidéos démo

const videoModal = document.getElementById('video-modal');

if (videoModal) {
    const videoFrame = videoModal.querySelector('.modal-video');

    let lastVideoTrigger = null;

    function openVideoModal(link) {
        lastVideoTrigger = link;
        videoFrame.src = `https://www.youtube-nocookie.com/embed/${link.dataset.video}?autoplay=1`;
        videoModal.hidden = false;
        videoModal.querySelector('.modal-close').focus();
    }

    function closeVideoModal() {
        videoModal.hidden = true;
        videoFrame.src = '';
        lastVideoTrigger?.focus();
    }

    document.querySelectorAll('[data-video]').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openVideoModal(link);
        });
    });

    videoModal.querySelectorAll('[data-close]').forEach((el) => {
        el.addEventListener('click', closeVideoModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !videoModal.hidden) closeVideoModal();
    });
}

// Pop-up pour les maquettes

const modal = document.getElementById('maquette-modal');

if (modal) {
    const modalImg = modal.querySelector('.modal-img');
    let lastTrigger = null;

    function openModal(link) {
        lastTrigger = link;
        modalImg.src = link.dataset.full;
        modalImg.alt = link.getAttribute('aria-label') ?? '';
        modal.hidden = false;
        modal.querySelector('.modal-close').focus();
    }

    function closeModal() {
        modal.hidden = true;
        modalImg.src = '';
        lastTrigger?.focus();
    }

    document.querySelectorAll('[data-full]').forEach((btn) => {
        btn.addEventListener('click', () => openModal(btn));
    });

    modal.querySelectorAll('[data-close]').forEach((el) => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
}