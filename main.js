'use strict';

// Menu burger mobile

const burger = document.getElementById('menuBurger');
const menu = document.getElementById('menu');

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