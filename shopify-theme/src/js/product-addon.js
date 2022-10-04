const productAddonGroups = document.querySelectorAll('.product-addon-group');

productAddonGroups.forEach((group) => {
    const productAddons = group.querySelectorAll('[data-addon-product]');
    const form = group.dataset.form;
    const parentProduct = group.dataset.parentProduct;
    const addonHidden = document
        .querySelector(`form#${form}`)
        .querySelector('.addon-hidden');
    const uniq = new Date().getTime();
    const getProductProperty = addonHidden.querySelector(
        `input#product-property-${parentProduct}`
    );
    if (!getProductProperty) {
        const productProperty = document.createElement('INPUT');
        productProperty.setAttribute('type', 'hidden');
        productProperty.setAttribute('name', `[properties][_parent]`);
        productProperty.setAttribute('value', `${parentProduct}-${uniq}`);
        productProperty.setAttribute('form', form);
        productProperty.setAttribute('id', `product-property-${parentProduct}`);
        addonHidden.append(productProperty);
    }

    const getProductParentProperty = addonHidden.querySelector(
        `input#product-parent-property-${parentProduct}`
    );
    if (!getProductParentProperty) {
        const productParentProperty = document.createElement('INPUT');
        productParentProperty.setAttribute('type', 'hidden');
        productParentProperty.setAttribute('name', `[properties][_is_parent]`);
        productParentProperty.setAttribute('value', true);
        productParentProperty.setAttribute('form', form);
        productParentProperty.setAttribute(
            'id',
            `product-parent-property-${parentProduct}`
        );
        addonHidden.append(productParentProperty);
    }

    productAddons.forEach((addon) => {
        const product = addon.dataset.addonProduct;
        const index = addon.dataset.addonIndex;
        addon.addEventListener('input', (e) => {
            const getInput = addonHidden.querySelector(
                `input#addon-${product}`
            );
            const getProperty = addonHidden.querySelector(
                `input#addon-property-${product}`
            );
            if (e.target.value.length > 0 && !getInput) {
                const input = document.createElement('INPUT');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', `items[${index}][id]`);
                input.setAttribute('value', product);
                input.setAttribute('form', form);
                input.setAttribute('id', `addon-${product}`);
                addonHidden.append(input);

                const property = document.createElement('INPUT');
                property.setAttribute('type', 'hidden');
                property.setAttribute(
                    'name',
                    `items[${index}][properties][_parent]`
                );
                property.setAttribute('value', `${parentProduct}-${uniq}`);
                property.setAttribute('form', form);
                property.setAttribute('id', `addon-property-${product}`);
                addonHidden.append(property);
            } else if (e.target.value.length === 0) {
                getInput.remove();
                getProperty.remove();
            }
        });
    });
});
