import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

window.addEventListener('click', (event) => {

    const link = event.target.closest('a');

    if (link) {
        event.preventDefault();
        let href = link.getAttribute('href');

        if (/^https?:\/\//.test(href)) {
            window.location.href = href;
        } else {
            window.location.href = new URL(href, window.location.origin).href;
        }
    }
}); 