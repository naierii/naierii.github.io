/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/currency.js":
/*!****************************!*\
  !*** ./src/js/currency.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatMoney": () => (/* binding */ formatMoney)
/* harmony export */ });
/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */
var moneyFormat = '${{amount}}';
/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */

function formatMoney(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }

  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = format || moneyFormat;

  function formatWithDelimiters(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var thousands = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
    var decimal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

    if (isNaN(number) || number == null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);
    var parts = number.split('.');
    var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1".concat(thousands));
    var centsAmount = parts[1] ? decimal + parts[1] : '';
    return dollarsAmount + centsAmount;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;

    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;

    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;

    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
}

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": () => (/* binding */ debounce),
/* harmony export */   "fetchConfig": () => (/* binding */ fetchConfig),
/* harmony export */   "pauseAllMedia": () => (/* binding */ pauseAllMedia),
/* harmony export */   "swiperButtonWrapperLocked": () => (/* binding */ swiperButtonWrapperLocked)
/* harmony export */ });
var swiperButtonWrapperLocked = {
  lock: function lock() {
    var wrapper = document.querySelector('.swiper-button-wrapper');

    if (wrapper) {
      wrapper.classList.add('swiper-button-wrapper-locked');
    }
  },
  unlock: function unlock() {
    var wrapper = document.querySelector('.swiper-button-wrapper');

    if (wrapper) {
      wrapper.classList.remove('swiper-button-wrapper-locked');
    }
  }
};
function debounce(fn, wait) {
  var _this = this;

  var t;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(t);
    t = setTimeout(function () {
      return fn.apply(_this, args);
    }, wait);
  };
}
function fetchConfig() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'json';
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/".concat(type)
    }
  };
}
function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach(function (video) {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach(function (video) {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach(function (video) {
    return video.pause();
  });
  document.querySelectorAll('product-model').forEach(function (model) {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/cart.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _currency__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currency */ "./src/js/currency.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var CartRemoveButton = /*#__PURE__*/function (_HTMLElement) {
  _inherits(CartRemoveButton, _HTMLElement);

  var _super = _createSuper(CartRemoveButton);

  function CartRemoveButton() {
    var _this;

    _classCallCheck(this, CartRemoveButton);

    _this = _super.call(this);

    _this.addEventListener('click', function (event) {
      event.preventDefault();

      var cartItems = _this.closest('cart-items') || _this.closest('cart-drawer-items');

      if (_this.dataset.customId) {
        var productAddons = cartItems.querySelectorAll("input[data-custom-id='".concat(_this.dataset.customId, "']"));
        var updates = {};
        productAddons.forEach(function (addon) {
          var key = addon.dataset.key;
          updates = _objectSpread(_objectSpread({}, updates), {}, _defineProperty({}, key, 0));
        });
        cartItems.updateQuantity(null, null, null, updates);
      } else {
        cartItems.updateQuantity(_this.dataset.index, 0);
      }
    });

    return _this;
  }

  return _createClass(CartRemoveButton);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('cart-remove-button', CartRemoveButton);

var CartItems = /*#__PURE__*/function (_HTMLElement2) {
  _inherits(CartItems, _HTMLElement2);

  var _super2 = _createSuper(CartItems);

  function CartItems() {
    var _this2;

    _classCallCheck(this, CartItems);

    _this2 = _super2.call(this);
    _this2.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');
    _this2.currentItemCount = Array.from(_this2.querySelectorAll('[name="updates[]"]')).reduce(function (total, quantityInput) {
      return total + parseInt(quantityInput.value);
    }, 0);
    _this2.debouncedOnChange = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounce)(function (event) {
      _this2.onChange(event);
    }, 300);

    _this2.addEventListener('change', _this2.debouncedOnChange.bind(_assertThisInitialized(_this2)));

    return _this2;
  }

  _createClass(CartItems, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.mergeAddons();
    }
  }, {
    key: "mergeAddons",
    value: function mergeAddons() {
      var _this3 = this;

      var parents = Array.from(this.querySelectorAll('tr[isparent]'));
      parents.forEach(function (parent) {
        var customId = parent.dataset.customId;
        var price = Number(parent.dataset.price);
        var addons = Array.from(_this3.querySelectorAll("tr[data-custom-id='".concat(customId, "']:not([isparent])")));
        var addonTotal = addons.map(function (addon) {
          return Number(addon.dataset.price);
        }).reduce(function (partialSum, a) {
          return partialSum + a;
        }, 0);
        parent.querySelectorAll('.price').forEach(function (priceElement) {
          priceElement.innerHTML = (0,_currency__WEBPACK_IMPORTED_MODULE_1__.formatMoney)(price + addonTotal);
        });
      });
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      if (event.target.dataset.customId) {
        console.log(event.target);
        var productAddons = this.querySelectorAll("input[data-custom-id='".concat(event.target.dataset.customId, "']"));
        var updates = {};
        productAddons.forEach(function (addon) {
          var key = addon.dataset.key;

          if (key === event.target.dataset.key) {
            updates = _objectSpread(_objectSpread({}, updates), {}, _defineProperty({}, key, event.target.value));
          } else {
            var originalQty = addon.dataset.quantity;
            var newQty = originalQty / (1 / event.target.value);
            updates = _objectSpread(_objectSpread({}, updates), {}, _defineProperty({}, key, newQty));
          }
        });
        console.log(updates);
        this.updateQuantity(null, event.target.value, document.activeElement.getAttribute('name'), updates);
      } else {
        this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
      }
    }
  }, {
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents'
      }, {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }, {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      }, {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents'
      }];
    }
  }, {
    key: "updateQuantity",
    value: function updateQuantity(line, quantity, name, updates) {
      var _this4 = this;

      this.enableLoading(line);
      var body = JSON.stringify({
        line: line,
        updates: updates,
        quantity: quantity,
        sections: this.getSectionsToRender().map(function (section) {
          return section.section;
        }),
        sections_url: window.location.pathname
      });
      var url = line ? routes.cart_change_url : routes.cart_update_url;
      fetch("".concat(url), _objectSpread(_objectSpread({}, (0,_utils__WEBPACK_IMPORTED_MODULE_0__.fetchConfig)()), {
        body: body
      })).then(function (response) {
        return response.text();
      }).then(function (state) {
        var parsedState = JSON.parse(state);

        _this4.classList.toggle('is-empty', parsedState.item_count === 0);

        var cartDrawerWrapper = document.querySelector('cart-drawer');
        var cartFooter = document.getElementById('main-cart-footer');
        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        _this4.getSectionsToRender().forEach(function (section) {
          var elementToReplace = document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML = _this4.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        });

        _this4.updateLiveRegions(line, parsedState.item_count);

        var lineItem = document.getElementById("CartItem-".concat(line)) || document.getElementById("CartDrawer-Item-".concat(line));

        if (lineItem && lineItem.querySelector("[name=\"".concat(name, "\"]"))) {
          cartDrawerWrapper ? trapFocus(cartDrawerWrapper, lineItem.querySelector("[name=\"".concat(name, "\"]"))) : lineItem.querySelector("[name=\"".concat(name, "\"]")).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'));
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'));
        }

        _this4.mergeAddons();

        _this4.disableLoading();
      })["catch"](function () {
        _this4.querySelectorAll('.loading-overlay').forEach(function (overlay) {
          return overlay.classList.add('hidden');
        });

        var errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;

        _this4.disableLoading();
      });
    }
  }, {
    key: "updateLiveRegions",
    value: function updateLiveRegions(line, itemCount) {
      if (this.currentItemCount === itemCount) {
        var lineItemError = document.getElementById("Line-item-error-".concat(line)) || document.getElementById("CartDrawer-LineItemError-".concat(line));
        var quantityElement = document.getElementById("Quantity-".concat(line)) || document.getElementById("Drawer-quantity-".concat(line));
        lineItemError.querySelector('.cart-item__error-text').innerHTML = window.cartStrings.quantityError.replace('[quantity]', quantityElement.value);
      }

      this.currentItemCount = itemCount;
      this.lineItemStatusElement.setAttribute('aria-hidden', true);
      var cartStatus = document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
      cartStatus.setAttribute('aria-hidden', false);
      setTimeout(function () {
        cartStatus.setAttribute('aria-hidden', true);
      }, 1000);
    }
  }, {
    key: "getSectionInnerHTML",
    value: function getSectionInnerHTML(html, selector) {
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: "enableLoading",
    value: function enableLoading(line) {
      var mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
      mainCartItems.classList.add('cart__items--disabled');
      var cartItemElements = this.querySelectorAll("#CartItem-".concat(line, " .loading-overlay"));
      var cartDrawerItemElements = this.querySelectorAll("#CartDrawer-Item-".concat(line, " .loading-overlay"));
      [].concat(_toConsumableArray(cartItemElements), _toConsumableArray(cartDrawerItemElements)).forEach(function (overlay) {
        return overlay.classList.remove('hidden');
      });
      document.activeElement.blur();
      this.lineItemStatusElement.setAttribute('aria-hidden', false);
    }
  }, {
    key: "disableLoading",
    value: function disableLoading() {
      var mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
      mainCartItems.classList.remove('cart__items--disabled');
    }
  }]);

  return CartItems;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define('cart-note', /*#__PURE__*/function (_HTMLElement3) {
    _inherits(CartNote, _HTMLElement3);

    var _super3 = _createSuper(CartNote);

    function CartNote() {
      var _this5;

      _classCallCheck(this, CartNote);

      _this5 = _super3.call(this);

      _this5.addEventListener('change', (0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounce)(function (event) {
        var body = JSON.stringify({
          note: event.target.value
        });
        fetch("".concat(routes.cart_update_url), _objectSpread(_objectSpread({}, (0,_utils__WEBPACK_IMPORTED_MODULE_0__.fetchConfig)()), {
          body: body
        }));
      }, 300));

      return _this5;
    }

    return _createClass(CartNote);
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
}
})();

/******/ })()
;