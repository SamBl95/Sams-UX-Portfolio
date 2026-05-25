document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successPanel = document.querySelector('.form__success');
  const errorPanel = document.querySelector('.form__error');
  const submitBtn = form.querySelector('[type="submit"]');
  const honeypot = form.querySelector('[name="_honey"]');

  const nameInput    = form.querySelector('#contact-name');
  const emailInput   = form.querySelector('#contact-email');
  const messageInput = form.querySelector('#contact-message');
  const nameError    = document.getElementById('contact-name-error');
  const emailError   = document.getElementById('contact-email-error');
  const messageError = document.getElementById('contact-message-error');
  const fieldControls = [...form.querySelectorAll('.form__field, .form__submit')];

  function clearFieldError(input, errorEl) {
    errorEl.textContent = '';
    input.removeAttribute('aria-invalid');
    input.classList.remove('form__input--error', 'form__textarea--error');
  }

  nameInput.addEventListener('input',    () => clearFieldError(nameInput,    nameError));
  emailInput.addEventListener('input',   () => clearFieldError(emailInput,   emailError));
  messageInput.addEventListener('input', () => clearFieldError(messageInput, messageError));

  function validate(name, email, message) {
    let valid = true;
    let firstInvalid = null;
    if (!name) {
      nameError.textContent = 'Please enter your name';
      nameInput.setAttribute('aria-invalid', 'true');
      nameInput.classList.add('form__input--error');
      firstInvalid = firstInvalid || nameInput;
      valid = false;
    }
    if (!email) {
      emailError.textContent = 'Please enter your email address';
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.classList.add('form__input--error');
      firstInvalid = firstInvalid || emailInput;
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = 'Please enter a valid email address';
      emailInput.setAttribute('aria-invalid', 'true');
      emailInput.classList.add('form__input--error');
      firstInvalid = firstInvalid || emailInput;
      valid = false;
    }
    if (!message) {
      messageError.textContent = 'Please write a message';
      messageInput.setAttribute('aria-invalid', 'true');
      messageInput.classList.add('form__textarea--error');
      firstInvalid = firstInvalid || messageInput;
      valid = false;
    }
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (honeypot && honeypot.value) return;
    if (errorPanel) errorPanel.hidden = true;
    if (successPanel) successPanel.hidden = true;

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!validate(name, email, message)) return;

    form.classList.add('form--loading');
    form.setAttribute('aria-busy', 'true');
    submitBtn.disabled = true;

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: '8ac60d13-9d2a-42f1-ae11-d82c6bb32c8c', name, email, message }),
      });

      const json = await res.json();

      if (res.ok && json.success === true) {
        form.classList.remove('form--loading');
        form.setAttribute('aria-busy', 'false');
        fieldControls.forEach(control => {
          control.hidden = true;
        });
        successPanel.hidden = false;
        successPanel.focus();
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      form.classList.remove('form--loading');
      form.setAttribute('aria-busy', 'false');
      submitBtn.disabled = false;
      errorPanel.hidden = false;
      errorPanel.focus();
    }
  });
});
