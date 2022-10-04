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
/*!*********************************!*\
  !*** ./src/js/media-gallery.js ***!
  \*********************************/
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



if (!customElements.get('media-gallery')) {
  customElements.define('media-gallery', /*#__PURE__*/function (_HTMLElement) {
    _inherits(MediaGallery, _HTMLElement);

    var _super = _createSuper(MediaGallery);

    function MediaGallery() {
      var _this;

      _classCallCheck(this, MediaGallery);

      _this = _super.call(this);
      _this.elements = {
        liveRegion: _this.querySelector('[id^="GalleryStatus"]'),
        viewer: _this.querySelector('[id^="GalleryViewer"]'),
        thumbnails: _this.querySelector('[id^="GalleryThumbnails"]')
      };
      _this.mql = window.matchMedia('(min-width: 750px)');
      if (!_this.elements.thumbnails) return _possibleConstructorReturn(_this);

      _this.elements.viewer.addEventListener('slideChanged', (0,_utils__WEBPACK_IMPORTED_MODULE_0__.debounce)(_this.onSlideChanged.bind(_assertThisInitialized(_this)), 500));

      _this.elements.thumbnails.querySelectorAll('[data-target]').forEach(function (mediaToSwitch) {
        mediaToSwitch.querySelector('button').addEventListener('click', _this.setActiveMedia.bind(_assertThisInitialized(_this), mediaToSwitch.dataset.target, false));
      });

      if (_this.dataset.desktopLayout !== 'stacked' && _this.mql.matches) _this.removeListSemantic();
      return _this;
    }

    _createClass(MediaGallery, [{
      key: "onSlideChanged",
      value: function onSlideChanged(event) {
        var thumbnail = this.elements.thumbnails.querySelector("[data-target=\"".concat(event.detail.currentElement.dataset.mediaId, "\"]"));
        this.setActiveThumbnail(thumbnail);
      }
    }, {
      key: "setActiveMedia",
      value: function setActiveMedia(mediaId, prepend) {
        var _this2 = this;

        var activeMedia = this.elements.viewer.querySelector("[data-media-id=\"".concat(mediaId, "\"]"));
        this.elements.viewer.querySelectorAll('[data-media-id]').forEach(function (element) {
          element.classList.remove('is-active');
        });
        activeMedia.classList.add('is-active');

        if (prepend) {
          activeMedia.parentElement.prepend(activeMedia);

          if (this.elements.thumbnails) {
            var _activeThumbnail = this.elements.thumbnails.querySelector("[data-target=\"".concat(mediaId, "\"]"));

            _activeThumbnail.parentElement.prepend(_activeThumbnail);
          }

          if (this.elements.viewer.slider) this.elements.viewer.resetPages();
        }

        this.preventStickyHeader();
        window.setTimeout(function () {
          if (_this2.elements.thumbnails) {
            activeMedia.parentElement.scrollTo({
              left: activeMedia.offsetLeft
            });
          }

          if (!_this2.elements.thumbnails || _this2.dataset.desktopLayout === 'stacked') {
            activeMedia.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
        this.playActiveMedia(activeMedia);
        if (!this.elements.thumbnails) return;
        var activeThumbnail = this.elements.thumbnails.querySelector("[data-target=\"".concat(mediaId, "\"]"));
        this.setActiveThumbnail(activeThumbnail);
        this.announceLiveRegion(activeMedia, activeThumbnail.dataset.mediaPosition);
      }
    }, {
      key: "setActiveThumbnail",
      value: function setActiveThumbnail(thumbnail) {
        if (!this.elements.thumbnails || !thumbnail) return;
        this.elements.thumbnails.querySelectorAll('button').forEach(function (element) {
          return element.removeAttribute('aria-current');
        });
        thumbnail.querySelector('button').setAttribute('aria-current', true);
        if (this.elements.thumbnails.isSlideVisible(thumbnail, 10)) return;
        this.elements.thumbnails.slider.scrollTo({
          left: thumbnail.offsetLeft
        });
      }
    }, {
      key: "announceLiveRegion",
      value: function announceLiveRegion(activeItem, position) {
        var _this3 = this;

        var image = activeItem.querySelector('.product__modal-opener--image img');
        if (!image) return;

        image.onload = function () {
          _this3.elements.liveRegion.setAttribute('aria-hidden', false);

          _this3.elements.liveRegion.innerHTML = window.accessibilityStrings.imageAvailable.replace('[index]', position);
          setTimeout(function () {
            _this3.elements.liveRegion.setAttribute('aria-hidden', true);
          }, 2000);
        };

        image.src = image.src;
      }
    }, {
      key: "playActiveMedia",
      value: function playActiveMedia(activeItem) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pauseAllMedia)();
        var deferredMedia = activeItem.querySelector('.deferred-media');
        if (deferredMedia) deferredMedia.loadContent(false);
      }
    }, {
      key: "preventStickyHeader",
      value: function preventStickyHeader() {
        this.stickyHeader = this.stickyHeader || document.querySelector('sticky-header');
        if (!this.stickyHeader) return;
        this.stickyHeader.dispatchEvent(new Event('preventHeaderReveal'));
      }
    }, {
      key: "removeListSemantic",
      value: function removeListSemantic() {
        if (!this.elements.viewer.slider) return;
        this.elements.viewer.slider.setAttribute('role', 'presentation');
        this.elements.viewer.sliderItems.forEach(function (slide) {
          return slide.setAttribute('role', 'presentation');
        });
      }
    }]);

    return MediaGallery;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
}
})();

/******/ })()
;