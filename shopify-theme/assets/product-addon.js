/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/js/product-addon.js ***!
  \*********************************/
var productAddonGroups = document.querySelectorAll('.product-addon-group');
productAddonGroups.forEach(function (group) {
  var productAddons = group.querySelectorAll('[data-addon-product]');
  var form = group.dataset.form;
  var parentProduct = group.dataset.parentProduct;
  var addonHidden = document.querySelector("form#".concat(form)).querySelector('.addon-hidden');
  var uniq = new Date().getTime();
  var getProductProperty = addonHidden.querySelector("input#product-property-".concat(parentProduct));

  if (!getProductProperty) {
    var productProperty = document.createElement('INPUT');
    productProperty.setAttribute('type', 'hidden');
    productProperty.setAttribute('name', "[properties][_parent]");
    productProperty.setAttribute('value', "".concat(parentProduct, "-").concat(uniq));
    productProperty.setAttribute('form', form);
    productProperty.setAttribute('id', "product-property-".concat(parentProduct));
    addonHidden.append(productProperty);
  }

  var getProductParentProperty = addonHidden.querySelector("input#product-parent-property-".concat(parentProduct));

  if (!getProductParentProperty) {
    var productParentProperty = document.createElement('INPUT');
    productParentProperty.setAttribute('type', 'hidden');
    productParentProperty.setAttribute('name', "[properties][_is_parent]");
    productParentProperty.setAttribute('value', true);
    productParentProperty.setAttribute('form', form);
    productParentProperty.setAttribute('id', "product-parent-property-".concat(parentProduct));
    addonHidden.append(productParentProperty);
  }

  productAddons.forEach(function (addon) {
    var product = addon.dataset.addonProduct;
    var index = addon.dataset.addonIndex;
    addon.addEventListener('input', function (e) {
      var getInput = addonHidden.querySelector("input#addon-".concat(product));
      var getProperty = addonHidden.querySelector("input#addon-property-".concat(product));

      if (e.target.value.length > 0 && !getInput) {
        var input = document.createElement('INPUT');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', "items[".concat(index, "][id]"));
        input.setAttribute('value', product);
        input.setAttribute('form', form);
        input.setAttribute('id', "addon-".concat(product));
        addonHidden.append(input);
        var property = document.createElement('INPUT');
        property.setAttribute('type', 'hidden');
        property.setAttribute('name', "items[".concat(index, "][properties][_parent]"));
        property.setAttribute('value', "".concat(parentProduct, "-").concat(uniq));
        property.setAttribute('form', form);
        property.setAttribute('id', "addon-property-".concat(product));
        addonHidden.append(property);
      } else if (e.target.value.length === 0) {
        getInput.remove();
        getProperty.remove();
      }
    });
  });
});
/******/ })()
;