/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!********************************!*\
  !*** ./src/js/product-form.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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



if (!customElements.get('product-form')) {
  customElements.define('product-form', /*#__PURE__*/function (_HTMLElement) {
    _inherits(ProductForm, _HTMLElement);

    var _super = _createSuper(ProductForm);

    function ProductForm() {
      var _this;

      _classCallCheck(this, ProductForm);

      _this = _super.call(this);
      _this.form = _this.querySelector('form');
      _this.form.querySelector('[name=id]').disabled = false;

      _this.form.addEventListener('submit', _this.onSubmitHandler.bind(_assertThisInitialized(_this)));

      _this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      _this.submitButton = _this.querySelector('[type="submit"]');
      if (document.querySelector('cart-drawer')) _this.submitButton.setAttribute('aria-haspopup', 'dialog');
      return _this;
    }

    _createClass(ProductForm, [{
      key: "onSubmitHandler",
      value: function onSubmitHandler(evt) {
        var _this2 = this;

        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
        this.handleErrorMessage();
        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading-overlay__spinner').classList.remove('hidden');
        var config = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.fetchConfig)('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];
        var formData = new FormData(this.form);

        if (this.cart) {
          formData.append('sections', this.cart.getSectionsToRender().map(function (section) {
            return section.id;
          }));
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }

        config.body = formData;
        fetch("".concat(routes.cart_add_url), config).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.status) {
            _this2.handleErrorMessage(response.description);

            var soldOutMessage = _this2.submitButton.querySelector('.sold-out-message');

            if (!soldOutMessage) return;

            _this2.submitButton.setAttribute('aria-disabled', true);

            _this2.submitButton.querySelector('span').classList.add('hidden');

            soldOutMessage.classList.remove('hidden');
            _this2.error = true;
            return;
          } else if (!_this2.cart) {
            window.location = window.routes.cart_url;
            return;
          }

          _this2.error = false;

          var quickAddModal = _this2.closest('quick-add-modal');

          if (quickAddModal) {
            document.body.addEventListener('modalClosed', function () {
              setTimeout(function () {
                _this2.cart.renderContents(response);
              });
            }, {
              once: true
            });
            quickAddModal.hide(true);
          } else {
            _this2.cart.renderContents(response);
          }
        })["catch"](function (e) {
          console.error(e);
        })["finally"](function () {
          _this2.submitButton.classList.remove('loading');

          if (_this2.cart && _this2.cart.classList.contains('is-empty')) _this2.cart.classList.remove('is-empty');
          if (!_this2.error) _this2.submitButton.removeAttribute('aria-disabled');

          _this2.querySelector('.loading-overlay__spinner').classList.add('hidden');
        });
      }
    }, {
      key: "handleErrorMessage",
      value: function handleErrorMessage() {
        var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');
        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }]);

    return ProductForm;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
}
})();

/******/ })()
;