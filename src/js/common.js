import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

window.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    
    if (link) {
        event.preventDefault();
        let href = link.getAttribute('href');
        
        let destinationURL;
        if (/^https?:\/\//.test(href)) {
            destinationURL = href;
        } else {
            destinationURL = new URL(href, window.location.origin).href;
        }
 
    }
}); 