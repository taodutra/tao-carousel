import taoCarousel from './lib/tao-carousel';

const config = {
    // carouselBox: '.carousel-box',
    // carouselContent: '.carousel-content',
    // carouselItem: '.carousel-item',
};
const $el = document.querySelector('.carousel');
const carousel = new taoCarousel($el, config);
// setTimeout(() => {
//     carousel.destroy();
// }, 5000);
// taoCarousel.create($el, config);