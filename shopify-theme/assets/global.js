/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/global.js":
/*!**************************!*\
  !*** ./src/js/global.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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



function getFocusableElements(container) {
  return Array.from(container.querySelectorAll("summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"));
}

document.querySelectorAll('[id^="Details-"] summary').forEach(function (summary) {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

  if (summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }

  summary.addEventListener('click', function (event) {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });
  if (summary.closest('header-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});
var trapFocusHandlers = {};

function trapFocus(container) {
  var elementToFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : container;
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];
  removeTrapFocus();

  trapFocusHandlers.focusin = function (event) {
    if (event.target !== container && event.target !== last && event.target !== first) return;
    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function () {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function (event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.

    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    } //  On the first focusable element and tab backward, focus the last element.


    if ((event.target === container || event.target === first) && event.shiftKey) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);
  elementToFocus.focus();
} // Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.


try {
  document.querySelector(':focus-visible');
} catch (e) {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  var navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN'];
  var currentFocusedElement = null;
  var mouseClick = null;
  window.addEventListener('keydown', function (event) {
    if (navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });
  window.addEventListener('mousedown', function (event) {
    mouseClick = true;
  });
  window.addEventListener('focus', function () {
    if (currentFocusedElement) currentFocusedElement.classList.remove('focused');
    if (mouseClick) return;
    currentFocusedElement = document.activeElement;
    currentFocusedElement.classList.add('focused');
  }, true);
}

function removeTrapFocus() {
  var elementToFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);
  if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;
  var openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;
  var summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}

var QuantityInput = /*#__PURE__*/function (_HTMLElement) {
  _inherits(QuantityInput, _HTMLElement);

  var _super = _createSuper(QuantityInput);

  function QuantityInput() {
    var _this;

    _classCallCheck(this, QuantityInput);

    _this = _super.call(this);
    _this.input = _this.querySelector('input');
    _this.changeEvent = new Event('change', {
      bubbles: true
    });

    _this.querySelectorAll('button').forEach(function (button) {
      return button.addEventListener('click', _this.onButtonClick.bind(_assertThisInitialized(_this)));
    });

    return _this;
  }

  _createClass(QuantityInput, [{
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var previousValue = this.input.value;
      event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
      if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
    }
  }]);

  return QuantityInput;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
  var _this2 = this;

  var t;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(t);
    t = setTimeout(function () {
      return fn.apply(_this2, args);
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
/*
 * Shopify Common JS
 *
 */


if (typeof window.Shopify == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function (fn, scope) {
  return function () {
    return fn.apply(scope, arguments);
  };
};

Shopify.setSelectorByValue = function (selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];

    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function (target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on' + eventName, callback);
};

Shopify.postLink = function (path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};
  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);

  for (var key in params) {
    var hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', params[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function (country_domid, province_domid, options) {
  this.countryEl = document.getElementById(country_domid);
  this.provinceEl = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);
  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this));
  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function initCountry() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },
  initProvince: function initProvince() {
    var value = this.provinceEl.getAttribute('data-default');

    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },
  countryHandler: function countryHandler(e) {
    var opt = this.countryEl.options[this.countryEl.selectedIndex];
    var raw = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);
    this.clearOptions(this.provinceEl);

    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = '';
    }
  },
  clearOptions: function clearOptions(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },
  setOptions: function setOptions(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

var ModalDialog = /*#__PURE__*/function (_HTMLElement2) {
  _inherits(ModalDialog, _HTMLElement2);

  var _super2 = _createSuper(ModalDialog);

  function ModalDialog() {
    var _this3;

    _classCallCheck(this, ModalDialog);

    _this3 = _super2.call(this);

    _this3.querySelector('[id^="ModalClose-"]').addEventListener('click', _this3.hide.bind(_assertThisInitialized(_this3), false));

    _this3.addEventListener('keyup', function (event) {
      if (event.code.toUpperCase() === 'ESCAPE') _this3.hide();
    });

    if (_this3.classList.contains('media-modal')) {
      _this3.addEventListener('pointerup', function (event) {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) _this3.hide();
      });
    } else {
      _this3.addEventListener('click', function (event) {
        if (event.target === _assertThisInitialized(_this3)) _this3.hide();
      });
    }

    return _this3;
  }

  _createClass(ModalDialog, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      if (this.moved) return;
      this.moved = true;
      document.body.appendChild(this);
    }
  }, {
    key: "show",
    value: function show(opener) {
      this.openedBy = opener;
      var popup = this.querySelector('.template-popup');
      document.body.classList.add('overflow-hidden');
      this.setAttribute('open', '');
      if (popup) popup.loadContent();
      trapFocus(this, this.querySelector('[role="dialog"]'));
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pauseAllMedia)();
    }
  }, {
    key: "hide",
    value: function hide() {
      document.body.classList.remove('overflow-hidden');
      document.body.dispatchEvent(new CustomEvent('modalClosed'));
      this.removeAttribute('open');
      removeTrapFocus(this.openedBy);
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pauseAllMedia)();
    }
  }]);

  return ModalDialog;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('modal-dialog', ModalDialog);

var ModalOpener = /*#__PURE__*/function (_HTMLElement3) {
  _inherits(ModalOpener, _HTMLElement3);

  var _super3 = _createSuper(ModalOpener);

  function ModalOpener() {
    var _this4;

    _classCallCheck(this, ModalOpener);

    _this4 = _super3.call(this);

    var button = _this4.querySelector('button');

    if (!button) return _possibleConstructorReturn(_this4);
    button.addEventListener('click', function () {
      var modal = document.querySelector(_this4.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
    return _this4;
  }

  return _createClass(ModalOpener);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('modal-opener', ModalOpener);

var DeferredMedia = /*#__PURE__*/function (_HTMLElement4) {
  _inherits(DeferredMedia, _HTMLElement4);

  var _super4 = _createSuper(DeferredMedia);

  function DeferredMedia() {
    var _this5;

    _classCallCheck(this, DeferredMedia);

    _this5 = _super4.call(this);

    var poster = _this5.querySelector('[id^="Deferred-Poster-"]');

    if (!poster) return _possibleConstructorReturn(_this5);
    poster.addEventListener('click', _this5.loadContent.bind(_assertThisInitialized(_this5)));
    return _this5;
  }

  _createClass(DeferredMedia, [{
    key: "loadContent",
    value: function loadContent() {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      (0,_utils__WEBPACK_IMPORTED_MODULE_0__.pauseAllMedia)();

      if (!this.getAttribute('loaded')) {
        var content = document.createElement('div');
        content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));
        this.setAttribute('loaded', true);
        var deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
        if (focus) deferredElement.focus();
      }
    }
  }]);

  return DeferredMedia;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('deferred-media', DeferredMedia);

var SliderComponent = /*#__PURE__*/function (_HTMLElement5) {
  _inherits(SliderComponent, _HTMLElement5);

  var _super5 = _createSuper(SliderComponent);

  function SliderComponent() {
    var _this6;

    _classCallCheck(this, SliderComponent);

    _this6 = _super5.call(this);
    _this6.slider = _this6.querySelector('[id^="Slider-"]');
    _this6.sliderItems = _this6.querySelectorAll('[id^="Slide-"]');
    _this6.enableSliderLooping = false;
    _this6.currentPageElement = _this6.querySelector('.slider-counter--current');
    _this6.pageTotalElement = _this6.querySelector('.slider-counter--total');
    _this6.prevButton = _this6.querySelector('button[name="previous"]');
    _this6.nextButton = _this6.querySelector('button[name="next"]');
    if (!_this6.slider || !_this6.nextButton) return _possibleConstructorReturn(_this6);

    _this6.initPages();

    var resizeObserver = new ResizeObserver(function (entries) {
      return _this6.initPages();
    });
    resizeObserver.observe(_this6.slider);

    _this6.slider.addEventListener('scroll', _this6.update.bind(_assertThisInitialized(_this6)));

    _this6.prevButton.addEventListener('click', _this6.onButtonClick.bind(_assertThisInitialized(_this6)));

    _this6.nextButton.addEventListener('click', _this6.onButtonClick.bind(_assertThisInitialized(_this6)));

    return _this6;
  }

  _createClass(SliderComponent, [{
    key: "initPages",
    value: function initPages() {
      this.sliderItemsToShow = Array.from(this.sliderItems).filter(function (element) {
        return element.clientWidth > 0;
      });
      if (this.sliderItemsToShow.length < 2) return;
      this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
      this.slidesPerPage = Math.floor((this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset);
      this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
      this.update();
    }
  }, {
    key: "resetPages",
    value: function resetPages() {
      this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
      this.initPages();
    }
  }, {
    key: "update",
    value: function update() {
      var previousPage = this.currentPage;
      this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;

      if (this.currentPageElement && this.pageTotalElement) {
        this.currentPageElement.textContent = this.currentPage;
        this.pageTotalElement.textContent = this.totalPages;
      }

      if (this.currentPage != previousPage) {
        this.dispatchEvent(new CustomEvent('slideChanged', {
          detail: {
            currentPage: this.currentPage,
            currentElement: this.sliderItemsToShow[this.currentPage - 1]
          }
        }));
      }

      if (this.enableSliderLooping) return;

      if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
        this.prevButton.setAttribute('disabled', 'disabled');
      } else {
        this.prevButton.removeAttribute('disabled');
      }

      if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
        this.nextButton.setAttribute('disabled', 'disabled');
      } else {
        this.nextButton.removeAttribute('disabled');
      }
    }
  }, {
    key: "isSlideVisible",
    value: function isSlideVisible(element) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
      return element.offsetLeft + element.clientWidth <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var step = event.currentTarget.dataset.step || 1;
      this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + step * this.sliderItemOffset : this.slider.scrollLeft - step * this.sliderItemOffset;
      this.slider.scrollTo({
        left: this.slideScrollPosition
      });
    }
  }]);

  return SliderComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('slider-component', SliderComponent);

var SlideshowComponent = /*#__PURE__*/function (_SliderComponent) {
  _inherits(SlideshowComponent, _SliderComponent);

  var _super6 = _createSuper(SlideshowComponent);

  function SlideshowComponent() {
    var _this7;

    _classCallCheck(this, SlideshowComponent);

    _this7 = _super6.call(this);
    _this7.sliderControlWrapper = _this7.querySelector('.slider-buttons');
    _this7.enableSliderLooping = true;
    if (!_this7.sliderControlWrapper) return _possibleConstructorReturn(_this7);
    _this7.sliderFirstItemNode = _this7.slider.querySelector('.slideshow__slide');
    if (_this7.sliderItemsToShow.length > 0) _this7.currentPage = 1;
    _this7.sliderControlLinksArray = Array.from(_this7.sliderControlWrapper.querySelectorAll('.slider-counter__link'));

    _this7.sliderControlLinksArray.forEach(function (link) {
      return link.addEventListener('click', _this7.linkToSlide.bind(_assertThisInitialized(_this7)));
    });

    _this7.slider.addEventListener('scroll', _this7.setSlideVisibility.bind(_assertThisInitialized(_this7)));

    _this7.setSlideVisibility();

    if (_this7.slider.getAttribute('data-autoplay') === 'true') _this7.setAutoPlay();
    return _this7;
  }

  _createClass(SlideshowComponent, [{
    key: "setAutoPlay",
    value: function setAutoPlay() {
      this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay');
      this.autoplaySpeed = this.slider.dataset.speed * 1000;
      this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this));
      this.addEventListener('mouseover', this.focusInHandling.bind(this));
      this.addEventListener('mouseleave', this.focusOutHandling.bind(this));
      this.addEventListener('focusin', this.focusInHandling.bind(this));
      this.addEventListener('focusout', this.focusOutHandling.bind(this));
      this.play();
      this.autoplayButtonIsSetToPlay = true;
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      _get(_getPrototypeOf(SlideshowComponent.prototype), "onButtonClick", this).call(this, event);

      var isFirstSlide = this.currentPage === 1;
      var isLastSlide = this.currentPage === this.sliderItemsToShow.length;
      if (!isFirstSlide && !isLastSlide) return;

      if (isFirstSlide && event.currentTarget.name === 'previous') {
        this.slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length;
      } else if (isLastSlide && event.currentTarget.name === 'next') {
        this.slideScrollPosition = 0;
      }

      this.slider.scrollTo({
        left: this.slideScrollPosition
      });
    }
  }, {
    key: "update",
    value: function update() {
      _get(_getPrototypeOf(SlideshowComponent.prototype), "update", this).call(this);

      this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
      this.prevButton.removeAttribute('disabled');
      if (!this.sliderControlButtons.length) return;
      this.sliderControlButtons.forEach(function (link) {
        link.classList.remove('slider-counter__link--active');
        link.removeAttribute('aria-current');
      });
      this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
      this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
    }
  }, {
    key: "autoPlayToggle",
    value: function autoPlayToggle() {
      this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
      this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
      this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
    }
  }, {
    key: "focusOutHandling",
    value: function focusOutHandling(event) {
      var focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
      if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) return;
      this.play();
    }
  }, {
    key: "focusInHandling",
    value: function focusInHandling(event) {
      var focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);

      if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
        this.play();
      } else if (this.autoplayButtonIsSetToPlay) {
        this.pause();
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.slider.setAttribute('aria-live', 'off');
      clearInterval(this.autoplay);
      this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.slider.setAttribute('aria-live', 'polite');
      clearInterval(this.autoplay);
    }
  }, {
    key: "togglePlayButtonState",
    value: function togglePlayButtonState(pauseAutoplay) {
      if (pauseAutoplay) {
        this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
      } else {
        this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
      }
    }
  }, {
    key: "autoRotateSlides",
    value: function autoRotateSlides() {
      var slideScrollPosition = this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.slider.querySelector('.slideshow__slide').clientWidth;
      this.slider.scrollTo({
        left: slideScrollPosition
      });
    }
  }, {
    key: "setSlideVisibility",
    value: function setSlideVisibility() {
      var _this8 = this;

      this.sliderItemsToShow.forEach(function (item, index) {
        var button = item.querySelector('a');

        if (index === _this8.currentPage - 1) {
          if (button) button.removeAttribute('tabindex');
          item.setAttribute('aria-hidden', 'false');
          item.removeAttribute('tabindex');
        } else {
          if (button) button.setAttribute('tabindex', '-1');
          item.setAttribute('aria-hidden', 'true');
          item.setAttribute('tabindex', '-1');
        }
      });
    }
  }, {
    key: "linkToSlide",
    value: function linkToSlide(event) {
      event.preventDefault();
      var slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
      this.slider.scrollTo({
        left: slideScrollPosition
      });
    }
  }]);

  return SlideshowComponent;
}(SliderComponent);

customElements.define('slideshow-component', SlideshowComponent);

var VariantSelects = /*#__PURE__*/function (_HTMLElement6) {
  _inherits(VariantSelects, _HTMLElement6);

  var _super7 = _createSuper(VariantSelects);

  function VariantSelects() {
    var _this9;

    _classCallCheck(this, VariantSelects);

    _this9 = _super7.call(this);

    _this9.addEventListener('change', _this9.onVariantChange);

    return _this9;
  } // connectedCallback() {
  //     this.toggleAddButton(true, '', false);
  // }


  _createClass(VariantSelects, [{
    key: "onVariantChange",
    value: function onVariantChange() {
      this.updateOptions();
      this.updateMasterId();
      this.toggleAddButton(true, '', false);
      this.updatePickupAvailability();
      this.removeErrorMessage();

      if (!this.currentVariant) {
        this.toggleAddButton(true, '', true);
        this.setUnavailable();
      } else {
        this.updateMedia();
        this.updateURL();
        this.updateVariantInput();
        this.renderProductInfo();
        this.updateShareUrl();
      }
    }
  }, {
    key: "updateOptions",
    value: function updateOptions() {
      this.options = Array.from(this.querySelectorAll('select'), function (select) {
        return select.value;
      });
    }
  }, {
    key: "updateMasterId",
    value: function updateMasterId() {
      var _this10 = this;

      this.currentVariant = this.getVariantData().find(function (variant) {
        return !variant.options.map(function (option, index) {
          return _this10.options[index] === option;
        }).includes(false);
      });
    }
  }, {
    key: "updateMedia",
    value: function updateMedia() {
      if (!this.currentVariant) return;
      if (!this.currentVariant.featured_media) return;
      var mediaGallery = document.getElementById("MediaGallery-".concat(this.dataset.section));
      mediaGallery.setActiveMedia("".concat(this.dataset.section, "-").concat(this.currentVariant.featured_media.id), true);
      var modalContent = document.querySelector("#ProductModal-".concat(this.dataset.section, " .product-media-modal__content"));
      if (!modalContent) return;
      var newMediaModal = modalContent.querySelector("[data-media-id=\"".concat(this.currentVariant.featured_media.id, "\"]"));
      modalContent.prepend(newMediaModal);
    }
  }, {
    key: "updateURL",
    value: function updateURL() {
      if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
      window.history.replaceState({}, '', "".concat(this.dataset.url, "?variant=").concat(this.currentVariant.id));
    }
  }, {
    key: "updateShareUrl",
    value: function updateShareUrl() {
      var shareButton = document.getElementById("Share-".concat(this.dataset.section));
      if (!shareButton || !shareButton.updateUrl) return;
      shareButton.updateUrl("".concat(window.shopUrl).concat(this.dataset.url, "?variant=").concat(this.currentVariant.id));
    }
  }, {
    key: "updateVariantInput",
    value: function updateVariantInput() {
      var _this11 = this;

      var productForms = document.querySelectorAll("#product-form-".concat(this.dataset.section, ", #product-form-installment-").concat(this.dataset.section));
      productForms.forEach(function (productForm) {
        var input = productForm.querySelector('input[name="id"]');
        input.value = _this11.currentVariant.id;
        input.dispatchEvent(new Event('change', {
          bubbles: true
        }));
      });
    }
  }, {
    key: "updatePickupAvailability",
    value: function updatePickupAvailability() {
      var pickUpAvailability = document.querySelector('pickup-availability');
      if (!pickUpAvailability) return;

      if (this.currentVariant && this.currentVariant.available) {
        pickUpAvailability.fetchAvailability(this.currentVariant.id);
      } else {
        pickUpAvailability.removeAttribute('available');
        pickUpAvailability.innerHTML = '';
      }
    }
  }, {
    key: "removeErrorMessage",
    value: function removeErrorMessage() {
      var section = this.closest('section');
      if (!section) return;
      var productForm = section.querySelector('product-form');
      if (productForm) productForm.handleErrorMessage();
    }
  }, {
    key: "renderProductInfo",
    value: function renderProductInfo() {
      var _this12 = this;

      fetch("".concat(this.dataset.url, "?variant=").concat(this.currentVariant.id, "&section_id=").concat(this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section)).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var html = new DOMParser().parseFromString(responseText, 'text/html');
        var destination = document.getElementById("price-".concat(_this12.dataset.section));
        var source = html.getElementById("price-".concat(_this12.dataset.originalSection ? _this12.dataset.originalSection : _this12.dataset.section));
        if (source && destination) destination.innerHTML = source.innerHTML;
        var price = document.getElementById("price-".concat(_this12.dataset.section));
        if (price) price.classList.remove('visibility-hidden');

        _this12.toggleAddButton(!_this12.currentVariant.available, window.variantStrings.soldOut);
      });
    }
  }, {
    key: "toggleAddButton",
    value: function toggleAddButton() {
      var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var text = arguments.length > 1 ? arguments[1] : undefined;
      var modifyClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var productForm = document.getElementById("product-form-".concat(this.dataset.section));
      if (!productForm) return;
      var addButton = productForm.querySelector('[name="add"]');
      var addButtonText = productForm.querySelector('[name="add"] > span');
      if (!addButton) return;

      if (disable) {
        addButton.setAttribute('disabled', 'disabled');
        if (text) addButtonText.textContent = text;
      } else {
        addButton.removeAttribute('disabled');
        addButtonText.textContent = window.variantStrings.addToCart;
      }

      if (!modifyClass) return;
    }
  }, {
    key: "setUnavailable",
    value: function setUnavailable() {
      var button = document.getElementById("product-form-".concat(this.dataset.section));
      var addButton = button.querySelector('[name="add"]');
      var addButtonText = button.querySelector('[name="add"] > span');
      var price = document.getElementById("price-".concat(this.dataset.section));
      if (!addButton) return;
      addButtonText.textContent = window.variantStrings.unavailable;
      if (price) price.classList.add('visibility-hidden');
    }
  }, {
    key: "getVariantData",
    value: function getVariantData() {
      this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }
  }]);

  return VariantSelects;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('variant-selects', VariantSelects);

var VariantRadios = /*#__PURE__*/function (_VariantSelects) {
  _inherits(VariantRadios, _VariantSelects);

  var _super8 = _createSuper(VariantRadios);

  function VariantRadios() {
    _classCallCheck(this, VariantRadios);

    return _super8.call(this);
  }

  _createClass(VariantRadios, [{
    key: "updateOptions",
    value: function updateOptions() {
      var fieldsets = Array.from(this.querySelectorAll('fieldset'));
      this.options = fieldsets.map(function (fieldset) {
        return Array.from(fieldset.querySelectorAll('input')).find(function (radio) {
          return radio.checked;
        }).value;
      });
    }
  }]);

  return VariantRadios;
}(VariantSelects);

customElements.define('variant-radios', VariantRadios);

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

/***/ }),

/***/ "./src/scss/components/component-pagination.scss":
/*!*******************************************************!*\
  !*** ./src/scss/components/component-pagination.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/components/component-price.scss":
/*!**************************************************!*\
  !*** ./src/scss/components/component-price.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/components/component-sidebar-menu.scss":
/*!*********************************************************!*\
  !*** ./src/scss/components/component-sidebar-menu.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/components/component-swiper.scss":
/*!***************************************************!*\
  !*** ./src/scss/components/component-swiper.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-customiser-steps.scss":
/*!*********************************************************!*\
  !*** ./src/scss/sections/section-customiser-steps.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-featured-links.scss":
/*!*******************************************************!*\
  !*** ./src/scss/sections/section-featured-links.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-image-banner.scss":
/*!*****************************************************!*\
  !*** ./src/scss/sections/section-image-banner.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-footer.scss":
/*!***********************************************!*\
  !*** ./src/scss/sections/section-footer.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-main-page.scss":
/*!**************************************************!*\
  !*** ./src/scss/sections/section-main-page.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-main-product.scss":
/*!*****************************************************!*\
  !*** ./src/scss/sections/section-main-product.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-newsletter.scss":
/*!***************************************************!*\
  !*** ./src/scss/sections/section-newsletter.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-product-grid.scss":
/*!*****************************************************!*\
  !*** ./src/scss/sections/section-product-grid.scss ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/sections/section-rich-text.scss":
/*!**************************************************!*\
  !*** ./src/scss/sections/section-rich-text.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/theme-base.scss":
/*!**********************************!*\
  !*** ./src/scss/theme-base.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/components/component-accordion.scss":
/*!******************************************************!*\
  !*** ./src/scss/components/component-accordion.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/components/component-card.scss":
/*!*************************************************!*\
  !*** ./src/scss/components/component-card.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/components/component-collection-hero.scss":
/*!************************************************************!*\
  !*** ./src/scss/components/component-collection-hero.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scss/components/component-newsletter.scss":
/*!*******************************************************!*\
  !*** ./src/scss/components/component-newsletter.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/global": 0,
/******/ 			"component-newsletter": 0,
/******/ 			"component-collection-hero": 0,
/******/ 			"component-card": 0,
/******/ 			"component-accordion": 0,
/******/ 			"theme-base": 0,
/******/ 			"section-rich-text": 0,
/******/ 			"section-product-grid": 0,
/******/ 			"section-newsletter": 0,
/******/ 			"section-main-product": 0,
/******/ 			"section-main-page": 0,
/******/ 			"section-footer": 0,
/******/ 			"section-image-banner": 0,
/******/ 			"section-featured-links": 0,
/******/ 			"section-customiser-steps": 0,
/******/ 			"component-swiper": 0,
/******/ 			"component-sidebar-menu": 0,
/******/ 			"component-price": 0,
/******/ 			"component-pagination": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkboxxerworld_shopify_theme"] = self["webpackChunkboxxerworld_shopify_theme"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/js/global.js")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/theme-base.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/components/component-accordion.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/components/component-card.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/components/component-collection-hero.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/components/component-newsletter.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/components/component-pagination.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/components/component-price.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/components/component-sidebar-menu.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/components/component-swiper.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-customiser-steps.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-featured-links.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-image-banner.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-footer.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-main-page.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-main-product.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-newsletter.scss")))
/******/ 	__webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-product-grid.scss")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["component-newsletter","component-collection-hero","component-card","component-accordion","theme-base","section-rich-text","section-product-grid","section-newsletter","section-main-product","section-main-page","section-footer","section-image-banner","section-featured-links","section-customiser-steps","component-swiper","component-sidebar-menu","component-price","component-pagination"], () => (__webpack_require__("./src/scss/sections/section-rich-text.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;