import Swiper, { Navigation } from 'swiper';
import { swiperButtonWrapperLocked } from '../utils';

const swiper = new Swiper('.featured-collection__swiper', {
    modules: [Navigation],
    spaceBetween: 30,
    navigation: {
        nextEl: '.featured-collection .swiper-button-next',
        prevEl: '.featured-collection .swiper-button-prev',
    },
    slidesPerView: 1.2,
    breakpoints: {
        740: {
            slidesPerView: 2,
        },
        980: {
            slidesPerView: 3,
        },
    },
    on: {
        ...swiperButtonWrapperLocked,
    },
});
