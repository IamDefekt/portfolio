'use strict';

// Menu burger mobile

const burger = document.getElementById('menuBurger');
const menu = document.getElementById('menu');
const desktop = window.matchMedia('(min-width: 1024px)');

burger.addEventListener('click', () => {
    menu.classList.toggle('open'); 
    burger.classList.toggle('open'); 
});

document.querySelectorAll('#menu a').forEach((link) => {
    link.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.classList.remove('open');
    });
});

desktop.addEventListener('change', (e) => {
    if (e.matches) {
        menu.classList.remove('open');
        burger.classList.remove('open');
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

    function openVideoModal(videoId) {
        videoFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        videoModal.hidden = false;
    }

    function closeVideoModal() {
        videoModal.hidden = true;
        videoFrame.src = '';
    }

    document.querySelectorAll('[data-video]').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openVideoModal(link.dataset.video);
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

    function openModal(card) {
        modalImg.src = card.dataset.full;
        modalImg.alt = card.querySelector('img').alt;
        modal.hidden = false;
    }

    function closeModal() {
        modal.hidden = true;
    }

    document.querySelectorAll('#maquettes .card').forEach((card) => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(card);
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });

    });

    modal.querySelectorAll('[data-close]').forEach((el) => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
}