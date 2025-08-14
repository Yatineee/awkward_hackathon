document.addEventListener('DOMContentLoaded', () => {
  const tosModal = document.getElementById('tos-modal');
  const acceptTosBtn = document.getElementById('accept-tos');
  const closeTosBtn = document.getElementById('tos-close');
  const submitBtn = document.getElementById('submit-btn');

  if (!tosModal || !acceptTosBtn || !closeTosBtn || !submitBtn) return;

  // Disable the submit button until terms are accepted
  submitBtn.disabled = true;

  function showTOS() {
    tosModal.style.display = 'block';
  }

  function closeTOS() {
    tosModal.style.display = 'none';
    submitBtn.disabled = false;
  }

  // Show after 8 seconds
  setTimeout(showTOS, 8000);

  acceptTosBtn.addEventListener('click', () => {
    closeTOS();
  });

  closeTosBtn.addEventListener('click', () => {
    closeTOS();
  });
});
