/**
 * anno-image.js — Annotated image system.
 * Builds the legend from tooltip markup, handles pin toggle on click
 * and keyboard, enforces one-open-at-a-time, and dismisses on outside
 * click, frame tap, and Escape.
 *
 * Mobile (< 768px): pin tap opens a centred overlay modal.
 * Desktop (768px+): pin tap/hover shows the inline tooltip.
 */

(function initAnnoImages() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tipCounter = 0;
  var modal = createModal();
  var modalLastPin = null;
  var closeHandler = null;

  document.querySelectorAll('.anno-image').forEach(function (figure) {
    buildLegend(figure);
    bindCallouts(figure);
  });


  /* -----------------------------------------------------------------------
     MOBILE DETECTION — evaluated at click time so it responds to resize.
     ----------------------------------------------------------------------- */

  function isMobile() {
    return window.matchMedia('(max-width: 767px)').matches;
  }


  /* -----------------------------------------------------------------------
     MODAL — single shared element, reused for all pins on the page.
     ----------------------------------------------------------------------- */

  function createModal() {
    var el = document.createElement('div');
    el.className = 'anno-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.hidden = true;

    var backdrop = document.createElement('div');
    backdrop.className = 'anno-modal__backdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    var panel = document.createElement('div');
    panel.className = 'anno-modal__panel';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'anno-modal__close';
    closeBtn.setAttribute('aria-label', 'Close annotation');
    closeBtn.innerHTML = '&#215;';

    var pinCircle = document.createElement('span');
    pinCircle.className = 'anno-modal__pin';
    pinCircle.setAttribute('aria-hidden', 'true');

    var titleEl = document.createElement('p');
    titleEl.className = 'anno-modal__title';

    var bodyEl = document.createElement('p');
    bodyEl.className = 'anno-modal__body';

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
    var panel = modal.querySelector('.anno-modal__panel');

    /* Cancel any in-progress close animation */
    if (closeHandler) {
      panel.removeEventListener('animationend', closeHandler);
      closeHandler = null;
    }

    var isNeg    = callout.classList.contains('anno-image__callout--negative');
    var titleNode = callout.querySelector('.anno-image__tooltip-title');
    var bodyNode  = callout.querySelector('.anno-image__tooltip-body');
    var titleText = titleNode ? titleNode.textContent.trim() : '';
    var bodyText  = bodyNode  ? bodyNode.textContent.trim()  : '';

    var pinNum = '';
    var siblings = callout.closest('.anno-image').querySelectorAll('.anno-image__callout');
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] === callout) { pinNum = String(i + 1); break; }
    }

    var pinCircle = modal.querySelector('.anno-modal__pin');
    var titleEl   = modal.querySelector('.anno-modal__title');
    var bodyEl    = modal.querySelector('.anno-modal__body');

    pinCircle.textContent = pinNum;
    pinCircle.className   = 'anno-modal__pin anno-modal__pin--' + (isNeg ? 'negative' : 'positive');
    titleEl.textContent   = titleText;
    bodyEl.textContent    = bodyText;
    modal.setAttribute('aria-label', titleText);

    modalLastPin = pin;
    modal.hidden = false;
    void modal.offsetWidth; /* reflow so animation restarts cleanly */
    modal.classList.remove('anno-modal--closing');
    modal.classList.add('anno-modal--open');

    modal.querySelector('.anno-modal__close').focus();
  }

  function doCloseModal() {
    if (modal.hidden) return;

    var panel = modal.querySelector('.anno-modal__panel');
    modal.classList.remove('anno-modal--open');
    modal.classList.add('anno-modal--closing');

    closeHandler = function () {
      closeHandler = null;
      modal.classList.remove('anno-modal--closing');
      modal.hidden = true;
      var pin = modalLastPin;
      modalLastPin = null;
      if (pin) pin.focus();
    };
    panel.addEventListener('animationend', closeHandler, { once: true });
  }

  function trapFocus(e, panel) {
    var focusables = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last  = focusables[focusables.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }


  /* -----------------------------------------------------------------------
     LEGEND BUILD
     Reads tooltip content from the DOM so it only lives once in the HTML.
     ----------------------------------------------------------------------- */

  function buildLegend(figure) {
    var legend   = figure.querySelector('.anno-image__legend');
    var callouts = figure.querySelectorAll('.anno-image__callout');
    if (!legend || !callouts.length) return;

    var ul = document.createElement('ul');
    ul.className = 'anno-image__legend-list';

    callouts.forEach(function (callout, i) {
      var isNeg   = callout.classList.contains('anno-image__callout--negative');
      var pin     = callout.querySelector('.anno-image__pin');
      var titleEl = callout.querySelector('.anno-image__tooltip-title');
      var bodyEl  = callout.querySelector('.anno-image__tooltip-body');
      var title   = titleEl ? titleEl.textContent.trim() : '';
      var body    = bodyEl  ? bodyEl.textContent.trim()  : '';

      /* Accessible pin label — CSS counter content isn't reliably announced */
      if (pin && title) {
        pin.setAttribute('aria-label', 'Annotation ' + (i + 1) + ': ' + title);
      }

      var li = document.createElement('li');
      li.className = 'anno-image__legend-item anno-image__legend-item--' +
        (isNeg ? 'negative' : 'positive');

      var dot = document.createElement('span');
      dot.className = 'anno-image__legend-dot';
      dot.setAttribute('aria-hidden', 'true');
      dot.textContent = String(i + 1);

      var text = document.createElement('span');
      text.className = 'anno-image__legend-text';

      var strong = document.createElement('strong');
      strong.textContent = title;
      text.appendChild(strong);

      if (body) {
        text.appendChild(document.createTextNode(' — ' + body));
      }

      li.appendChild(dot);
      li.appendChild(text);

      ul.appendChild(li);
    });

    legend.appendChild(ul);
  }


  /* -----------------------------------------------------------------------
     CALLOUT INTERACTION
     ----------------------------------------------------------------------- */

  function bindCallouts(figure) {
    var frame = figure.querySelector('.anno-image__frame');

    /* Wire aria-describedby for each pin → tooltip pair */
    figure.querySelectorAll('.anno-image__callout').forEach(function (callout) {
      var pin     = callout.querySelector('.anno-image__pin');
      var tooltip = callout.querySelector('.anno-image__tooltip');
      if (pin && tooltip) {
        var id = 'anno-tip-' + (++tipCounter);
        tooltip.id = id;
        pin.setAttribute('aria-describedby', id);
      }
    });

    /* Pin click — mobile opens modal; desktop toggles inline tooltip */
    figure.querySelectorAll('.anno-image__pin').forEach(function (pin) {
      var callout = pin.closest('.anno-image__callout');
      pin.addEventListener('click', function () {
        if (isMobile()) {
          closeAll(figure);
          doOpenModal(pin, callout);
        } else {
          var isOpen = pin.getAttribute('aria-expanded') === 'true';
          closeAll(figure);
          if (!isOpen) openPin(pin);
        }
      });
    });

    /* Tap anywhere on the image (not a pin) closes any open tooltip */
    if (frame) {
      frame.addEventListener('click', function (e) {
        if (!e.target.closest('.anno-image__pin')) closeAll(figure);
      });
    }

    /* Escape closes within this figure */
    figure.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll(figure);
    });

    /* Outside click or tap closes this figure's tooltips */
    document.addEventListener('click', function (e) {
      if (!figure.contains(e.target)) closeAll(figure);
    });

    document.addEventListener('touchstart', function (e) {
      if (!figure.contains(e.target)) closeAll(figure);
    }, { passive: true });
  }


  /* -----------------------------------------------------------------------
     STATE HELPERS
     ----------------------------------------------------------------------- */

  function openPin(pin) {
    pin.setAttribute('aria-expanded', 'true');
  }

  function closeAll(figure) {
    figure.querySelectorAll('.anno-image__pin[aria-expanded="true"]').forEach(function (p) {
      p.setAttribute('aria-expanded', 'false');
    });
  }

  function pulsePin(pin) {
    if (prefersReducedMotion) return;
    pin.classList.remove('anno-image__pin--pulsing');
    void pin.offsetWidth; /* force reflow to restart the animation */
    pin.classList.add('anno-image__pin--pulsing');
    pin.addEventListener('animationend', function () {
      pin.classList.remove('anno-image__pin--pulsing');
    }, { once: true });
  }

})();
