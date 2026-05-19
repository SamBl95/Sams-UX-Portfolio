document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const successPanel = document.querySelector('.form__success');
  const errorPanel = document.querySelector('.form__error');
  const submitBtn = form.querySelector('[type="submit"]');
  const honeypot = form.querySelector('[name="_honey"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (honeypot && honeypot.value) return;

    form.classList.add('form--loading');
    submitBtn.disabled = true;

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_key: '8ac60d13-9d2a-42f1-ae11-d82c6bb32c8c', name, email, message }),
      });

      const json = await res.json();

      if (res.ok && json.success === true) {
        form.hidden = true;
        successPanel.hidden = false;
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      form.classList.remove('form--loading');
      submitBtn.disabled = false;
      errorPanel.hidden = false;
    }
  });
});
