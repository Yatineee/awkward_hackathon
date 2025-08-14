// LiveValidation.js
document.addEventListener('DOMContentLoaded', () => {
  const passwordInput  = document.getElementById('password');
  const passwordFeedback = document.getElementById('password-feedback'); // <ul> or <div>
  const submitBtn      = document.getElementById('submit-btn');

  if (!passwordInput || !passwordFeedback) return;

  function updatePasswordFeedback(password) {
    // 显示/清空规则列表
    passwordFeedback.innerHTML = '';
    passwordFeedback.style.display = password ? 'block' : 'none';

    const rules = [
      { label: 'At least 12 characters',                 test: password.length >= 12 },
      { label: 'At least one uppercase letter',          test: /[A-Z]/.test(password) },
      { label: 'At least one lowercase letter',          test: /[a-z]/.test(password) },
      { label: 'At least one digit',                     test: /\d/.test(password) },
      { label: 'At least one special character',         test: /[\W_]/.test(password) },
      { label: 'No spaces',                              test: !/\s/.test(password) },
      { label: 'No three identical chars in a row',      test: !/(.)\1{2}/.test(password) },
    ];

    for (const r of rules) {
      const li = document.createElement('li');
      li.textContent = r.label;
      li.className = r.test ? 'valid' : 'invalid';
      passwordFeedback.appendChild(li);
    }

    // —— 关键：接入原生表单校验体系 —— //
    const ok = rules.every(r => r.test);
    passwordInput.setCustomValidity(ok ? '' : 'Password does not meet the requirements.');
    if (submitBtn) submitBtn.disabled = !ok; // （可选）禁用提交按钮
  }

  passwordInput.addEventListener('input', () => {
    updatePasswordFeedback(passwordInput.value);
  });

  // 初始化：一进来就判一次
  updatePasswordFeedback(passwordInput.value || '');
});
