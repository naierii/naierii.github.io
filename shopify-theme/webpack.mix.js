let mix = require('laravel-mix');

const ASSET_DIR = 'assets';

mix.setPublicPath(ASSET_DIR);
mix.sass('src/scss/theme-base.scss', '');

// Global
mix.js('src/js/global.js', '');
mix.js('src/js/site.js', '');
mix.js('src/js/cart.js', '');
mix.js('src/js/media-gallery.js', '');
mix.js('src/js/product-addon.js', '');
mix.js('src/js/product-form.js', '');

// Components
mix.sass('src/scss/components/component-accordion.scss', '');
mix.sass('src/scss/components/component-card.scss', '');
mix.sass('src/scss/components/component-collection-hero.scss', '');
mix.sass('src/scss/components/component-newsletter.scss', '');
mix.sass('src/scss/components/component-pagination.scss', '');
mix.sass('src/scss/components/component-price.scss', '');
mix.sass('src/scss/components/component-sidebar-menu.scss', '');
mix.sass('src/scss/components/component-swiper.scss', '');

// Sections
mix.js('src/js/sections/section-customiser-steps.js', '').sass(
    'src/scss/sections/section-customiser-steps.scss',
    ''
);
mix.js('src/js/sections/section-featured-links.js', '').sass(
    'src/scss/sections/section-featured-links.scss',
    ''
);
mix.sass('src/scss/sections/section-image-banner.scss', '');
mix.sass('src/scss/sections/section-footer.scss', '');
mix.sass('src/scss/sections/section-main-page.scss', '');
mix.sass('src/scss/sections/section-main-product.scss', '');
mix.sass('src/scss/sections/section-newsletter.scss', '');
mix.sass('src/scss/sections/section-product-grid.scss', '');
mix.sass('src/scss/sections/section-rich-text.scss', '');
