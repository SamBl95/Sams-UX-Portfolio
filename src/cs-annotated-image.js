/**
 * cs-annotated-image.js - Annotated image system.
 * Wires accessible annotation pins and mobile modal behaviour.
 *
 * Mobile / burger breakpoint (< 905px): pin tap opens a centred modal.
 * Desktop (905px+): hover and keyboard focus show inline tooltip.
 * Desktop clicks do not create sticky state.
 */

(function initCsAnnotatedImages() {
  'use strict';

  var tipCounter = 0;
  var modal = createModal();
  var modalLastPin = null;
  var closeHandler = null;
  var mobileQuery = window.matchMedia('(max-width: 904px)');

  document.querySelectorAll('.cs-annotated-image').forEach(function (figure) {
    bindCallouts(figure);
  });

  function isMobile() {
    return mobileQuery.matches;
  }

  mobileQuery.addEventListener('change', function (e) {
    if (!e.matches) doCloseModal();
  });

  function createModal() {
    var el = document.createElement('div');
    el.className = 'cs-annotated-image-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.hidden = true;

    var backdrop = document.createElement('div');
    backdrop.className = 'cs-annotated-image-modal__backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    var panel = document.createElement('div');
    panel.className = 'cs-annotated-image-modal__panel';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'cs-annotated-image-modal__close';
    closeBtn.setAttribute('aria-label', 'Close annotation');
    closeBtn.innerHTML = '&#215;';

    var pinCircle = document.createElement('span');
    pinCircle.className = 'cs-annotated-image-modal__pin';
    pinCircle.setAttribute('aria-hidden', 'true');

    var titleEl = document.createElement('p');
    titleEl.className = 'cs-annotated-image-modal__title';

    var bodyEl = document.createElement('p');
    bodyEl.className = 'cs-annotated-image-modal__body';

    panel.appendChild(closeBtn);
    panel.appendChild(pinCircle);
    panel.appendChild(titleEl);
    panel.appendChild(bodyEl);
    el.appendChild(backdrop);
    el.appendChild(panel);
    document.body.appendChild(el);

    backdrop.addEventListener('click', function () { doCloseModal(); });
    closeBtn.addEventListener('click', function () { doCloseModal(); });

    el.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        doCloseModal();
        return;
      }
      if (e.key === 'Tab') trapFocus(e, panel);
    });

    return el;
  }

  function doOpenModal(pin, callout) {
    var panel = modal.querySelector('.cs-annotated-image-modal__panel');

    if (closeHandler) {
      panel.removeEventListener('animationend', closeHandler);
      closeHandler = null;
    }

    if (modalLastPin && modalLastPin !== pin) {
      modalLastPin.setAttribute('aria-expanded', 'false');
      var previousCallout = modalLastPin.closest('.cs-annotated-image__callout');
      if (previousCallout) previousCallout.style.zIndex = '';
    }

    var isNegative = callout.classList.contains('cs-annotated-image__callout--negative');
    var titleNode = callout.querySelector('.cs-annotated-image__tooltip-title');
    var bodyNode = callout.querySelector('.cs-annotated-image__tooltip-body');
    var titleText = titleNode ? titleNode.textContent.trim() : '';
    var bodyText = bodyNode ? bodyNode.textContent.trim() : '';
    var pinNum = getPinNumber(callout);

    var pinCircle = modal.querySelector('.cs-annotated-image-modal__pin');
    var titleEl = modal.querySelector('.cs-annotated-image-modal__title');
    var bodyEl = modal.querySelector('.cs-annotated-image-modal__body');

    pinCircle.textContent = pinNum;
    pinCircle.className = 'cs-annotated-image-modal__pin cs-annotated-image-modal__pin--' +
      (isNegative ? 'negative' : 'positive');
    titleEl.textContent = titleText;
    bodyEl.textContent = bodyText;
    modal.setAttribute('aria-label', titleText || 'Annotation detail');

    modalLastPin = pin;
    callout.style.zIndex = '100';
    pin.setAttribute('aria-expanded', 'true');
    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.remove('cs-annotated-image-modal--closing');
    modal.classList.add('cs-annotated-image-modal--open');

    modal.querySelector('.cs-annotated-image-modal__close').focus();
  }

  function doCloseModal() {
    if (modal.hidden) return;

    var panel = modal.querySelector('.cs-annotated-image-modal__panel');
    modal.classList.remove('cs-annotated-image-modal--open');
    modal.classList.add('cs-annotated-image-modal--closing');

    closeHandler = function () {
      closeHandler = null;
      modal.classList.remove('cs-annotated-image-modal--closing');
      modal.hidden = true;

      var pin = modalLastPin;
      modalLastPin = null;
      if (pin) {
        pin.setAttribute('aria-expanded', 'false');
        var callout = pin.closest('.cs-annotated-image__callout');
        if (callout) callout.style.zIndex = '';
        pin.focus();
      }
    };

    panel.addEventListener('animationend', closeHandler, { once: true });
  }

  function trapFocus(e, panel) {
    var focusables = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function bindCallouts(figure) {
    figure.querySelectorAll('.cs-annotated-image__callout').forEach(function (callout, index) {
      var pin = callout.querySelector('.cs-annotated-image__pin');
      var tooltip = callout.querySelector('.cs-annotated-image__tooltip');
      var title = callout.querySelector('.cs-annotated-image__tooltip-title');

      if (!pin || !tooltip) return;

      var id = 'cs-annotated-image-tip-' + (++tipCounter);
      tooltip.id = id;
      pin.setAttribute('aria-describedby', id);
      pin.setAttribute('aria-expanded', 'false');
      positionCallout(callout, tooltip);

      if (title) {
        pin.setAttribute('aria-label', 'Annotation ' + (index + 1) + ': ' + title.textContent.trim());
      }

      pin.addEventListener('mouseenter', function () {
        if (!isMobile()) openPin(figure, pin);
      });

      pin.addEventListener('focus', function () {
        if (!isMobile()) openPin(figure, pin);
      });

      callout.addEventListener('mouseleave', function () {
        if (!isMobile()) closeAll(figure);
      });

      pin.addEventListener('blur', function () {
        if (!isMobile()) closeAll(figure);
      });

      pin.addEventListener('click', function () {
        if (isMobile()) {
          doOpenModal(pin, callout);
        } else {
          openPin(figure, pin);
        }
      });
    });

    figure.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) doCloseModal();
    });
  }

  function openPin(figure, pin) {
    closeAll(figure);
    pin.setAttribute('aria-expanded', 'true');

    var callout = pin.closest('.cs-annotated-image__callout');
    if (callout) callout.style.zIndex = '100';
  }

  function closeAll(figure) {
    figure.querySelectorAll('.cs-annotated-image__pin').forEach(function (pin) {
      pin.setAttribute('aria-expanded', 'false');
    });

    figure.querySelectorAll('.cs-annotated-image__callout').forEach(function (callout) {
      callout.style.zIndex = '';
    });
  }

  function positionCallout(callout, tooltip) {
    var x = parseFloat(callout.dataset.x);
    var y = parseFloat(callout.dataset.y);

    if (!Number.isNaN(x)) callout.style.left = callout.dataset.x + '%';
    if (!Number.isNaN(y)) callout.style.top = callout.dataset.y + '%';

    tooltip.classList.remove(
      'cs-annotated-image__tooltip--left',
      'cs-annotated-image__tooltip--right',
      'cs-annotated-image__tooltip--above',
      'cs-annotated-image__tooltip--below'
    );

    tooltip.classList.add(x > 60 ? 'cs-annotated-image__tooltip--left' : 'cs-annotated-image__tooltip--right');
    tooltip.classList.add(y > 60 ? 'cs-annotated-image__tooltip--above' : 'cs-annotated-image__tooltip--below');
  }

  function getPinNumber(callout) {
    var siblings = callout.closest('.cs-annotated-image').querySelectorAll('.cs-annotated-image__callout');

    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] === callout) return String(i + 1);
    }

    return '';
  }
})();
