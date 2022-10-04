export const swiperButtonWrapperLocked = {
    lock: function () {
        const wrapper = document.querySelector('.swiper-button-wrapper');
        if (wrapper) {
            wrapper.classList.add('swiper-button-wrapper-locked');
        }
    },
    unlock: function () {
        const wrapper = document.querySelector('.swiper-button-wrapper');
        if (wrapper) {
            wrapper.classList.remove('swiper-button-wrapper-locked');
        }
    },
};

export function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

export function fetchConfig(type = 'json') {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: `application/${type}`,
        },
    };
}

export function pauseAllMedia() {
    document.querySelectorAll('.js-youtube').forEach((video) => {
        video.contentWindow.postMessage(
            '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
            '*'
        );
    });
    document.querySelectorAll('.js-vimeo').forEach((video) => {
        video.contentWindow.postMessage('{"method":"pause"}', '*');
    });
    document.querySelectorAll('video').forEach((video) => video.pause());
    document.querySelectorAll('product-model').forEach((model) => {
        if (model.modelViewerUI) model.modelViewerUI.pause();
    });
}
