import { disablePageScroll, enablePageScroll } from 'scroll-lock';

document.querySelectorAll('[id^="Details-"] .summary').forEach((summary) => {
    if (!summary.parentNode.hasAttribute('collapse')) return;

    summary.setAttribute('role', 'button');
    summary.setAttribute(
        'aria-expanded',
        summary.parentNode.hasAttribute('open')
    );
    if (summary.nextElementSibling.getAttribute('id')) {
        summary.setAttribute('aria-controls', summary.nextElementSibling.id);
    }

    summary.addEventListener('click', (event) => {
        event.currentTarget.setAttribute(
            'aria-expanded',
            !event.currentTarget.closest('.details').hasAttribute('open')
        );
        if (event.currentTarget.closest('.details').hasAttribute('open')) {
            event.currentTarget.closest('.details').removeAttribute('open');
        } else {
            event.currentTarget.closest('.details').setAttribute('open', '');
        }
        const panel = event.currentTarget.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });
});

const hamburger = document.querySelector('.header__hamburger');
const menu = document.querySelector('.header__menu');
if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');

        if (hamburger.classList.contains('is-active')) {
            disablePageScroll();
            menu.classList.add('open');
            menu.classList.remove('close');
        } else {
            enablePageScroll();
            menu.classList.remove('open');
            menu.classList.add('close');
        }
    });
}
