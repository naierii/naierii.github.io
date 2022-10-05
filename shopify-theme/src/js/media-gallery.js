import { pauseAllMedia } from './utils';

if (!customElements.get('media-gallery')) {
    customElements.define(
        'media-gallery',
        class MediaGallery extends HTMLElement {
            constructor() {
                super();
                this.elements = {
                    viewer: this.querySelector('[id^="GalleryViewer"]'),
                    thumbnails: this.querySelector('[id^="GalleryThumbnails"]'),
                };
                if (!this.elements.thumbnails) return;

                this.elements.thumbnails
                    .querySelectorAll('[data-target]')
                    .forEach((mediaToSwitch) => {
                        mediaToSwitch
                            .querySelector('button')
                            .addEventListener(
                                'click',
                                this.setActiveMedia.bind(
                                    this,
                                    mediaToSwitch.dataset.target,
                                    false
                                )
                            );
                    });
            }

            setActiveMedia(mediaId, prepend) {
                const activeMedia = this.elements.viewer.querySelector(
                    `[data-media-id="${mediaId}"]`
                );
                this.elements.viewer
                    .querySelectorAll('[data-media-id]')
                    .forEach((element) => {
                        element.classList.remove('is-active');
                    });
                activeMedia.classList.add('is-active');

                this.playActiveMedia(activeMedia);

                if (!this.elements.thumbnails) return;

                const activeThumbnail = this.elements.thumbnails.querySelector(
                    `[data-media-id="${mediaId}"]`
                );
                this.setActiveThumbnail(activeThumbnail);
            }

            setActiveThumbnail(thumbnail) {
                if (!this.elements.thumbnails || !thumbnail) return;
                this.elements.thumbnails
                    .querySelectorAll('[data-media-id]')
                    .forEach((element) => {
                        element.classList.remove('is-active');
                    });
                thumbnail.classList.add('is-active');
                // this.elements.thumbnails
                //     .querySelectorAll('button')
                //     .forEach((element) =>
                //         element.removeAttribute('aria-current')
                //     );
                // thumbnail
                //     .querySelector('button')
                //     .setAttribute('aria-current', true);
            }

            playActiveMedia(activeItem) {
                pauseAllMedia();
                const deferredMedia =
                    activeItem.querySelector('.deferred-media');
                if (deferredMedia) deferredMedia.loadContent(false);
            }
        }
    );
}
