import taoCarousel from './lib/tao-carousel';

const config = {
    // activeClass: 'active',
    // carouselBox: '.carousel-box',
    // carouselContent: '.carousel-content',
    // carouselItem: '.carousel-item',
};
const $el = document.querySelector('.carousel');
const carousel = new taoCarousel($el, config);

const carouselJuan = new taoCarousel('.juan');
const carouselThiago = new taoCarousel('.thiago');
// setTimeout(() => {
//     carousel.destroy();
// }, 5000);
// taoCarousel.create($el, config);