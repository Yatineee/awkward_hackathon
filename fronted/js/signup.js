// signup-page.js 或 main.js（按你的文件名替换）
document.addEventListener('DOMContentLoaded', () => {
  const earth = document.getElementById('earth');
  const yearDisplay = document.getElementById('year-display');
  const birthYearInput = document.getElementById('birthYear');
  const cursorPopup = document.getElementById('cursor-popup');
  const changeCursorBtn = document.getElementById('change-cursor-btn');
  const submitBtn = document.getElementById('submit-btn');
  const reloadBtn = document.getElementById('reload-btn');
  const mousePopup = document.getElementById('mouse-popup');
  const form = document.getElementById('signup-form');
  const oofSound = document.getElementById('oof-sound');

  const maxYears = 120;
  const currentYear = new Date().getFullYear();
  let dragging = false;
  let lastRotationAngle = 0;
  let totalRotations = 0;
  let centerX, centerY;

  function updateCenter() {
    const rect = document.getElementById('solar-system').getBoundingClientRect();
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
  }

  function getAngle(x, y) {
    return Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
  }

  function setEarthPosition(angleDeg) {
    angleDeg = ((angleDeg % 360) + 360) % 360;
    earth.style.transform = `rotate(${angleDeg}deg) translateX(80px) rotate(${-angleDeg}deg)`;
  }

  function updateYearsDisplay() {
    const yearsAgo = Math.floor(totalRotations);
    yearDisplay.textContent = `Years ago: ${yearsAgo}`;
    earth.setAttribute('aria-valuenow', yearsAgo);
  }

  function moveButtonWithinBounds(button) {
    const padding = 20;
    const btnWidth = button.offsetWidth;
    const btnHeight = button.offsetHeight;
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    const randomX = Math.random() * (maxX - padding) + padding;
    const randomY = Math.random() * (maxY - padding) + padding;
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
  }

  function shuffleInputs() {
    const inputs = Array.from(form.querySelectorAll('input[type=text], input[type=email], input[type=password]'));
    for (let i = inputs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [inputs[i], inputs[j]] = [inputs[j], inputs[i]];
    }
    inputs.forEach(input => form.insertBefore(input, submitBtn));
  }

  window.addEventListener('resize', () => {
    updateCenter();
    moveButtonWithinBounds(submitBtn);
    moveButtonWithinBounds(reloadBtn);
  });

  earth.addEventListener('mousedown', e => {
    e.preventDefault();
    dragging = true;
    lastRotationAngle = getAngle(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => dragging = false);

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    e.preventDefault();
    const angle = getAngle(e.clientX, e.clientY);
    let diff = angle - lastRotationAngle;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    totalRotations += diff / 360;
    totalRotations = Math.max(0, Math.min(totalRotations, maxYears));
    setEarthPosition(angle);
    lastRotationAngle = angle;
    updateYearsDisplay();
  });

  earth.addEventListener('keydown', e => {
    if (['ArrowRight', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      totalRotations = Math.min(totalRotations + 1, maxYears);
    }
    if (['ArrowLeft', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      totalRotations = Math.max(totalRotations - 1, 0);
    }
    setEarthPosition((totalRotations * 360) % 360);
    updateYearsDisplay();
  });

  setEarthPosition(0);
  updateYearsDisplay();
  updateCenter();
  moveButtonWithinBounds(submitBtn);
  moveButtonWithinBounds(reloadBtn);

  setInterval(() => {
    moveButtonWithinBounds(submitBtn);
    moveButtonWithinBounds(reloadBtn);
  }, 3000);

  setInterval(shuffleInputs, 3000);
  setTimeout(() => {
    cursorPopup.style.display = 'block';
  }, 15000);

  changeCursorBtn.addEventListener('click', () => {
    document.body.style.cursor = 'crosshair';
    cursorPopup.style.display = 'none';
  });

  submitBtn.addEventListener('mouseenter', () => {
    mousePopup.style.display = 'block';
  });
  submitBtn.addEventListener('mouseleave', () => {
    mousePopup.style.display = 'none';
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    // —— 关键：不通过就不让提交 —— //
    if (!form.checkValidity()) {
      form.reportValidity(); // 弹出原生提示（含我们在 LiveValidation.js 设置的错误）
      return;
    }

    const yearsAgo = Math.floor(totalRotations);
    const birthYear = currentYear - yearsAgo;
    birthYearInput.value = birthYear;
    alert(`Thanks for signing up!\nYour birth year is set to: ${birthYear}`);
  });

  reloadBtn.addEventListener('click', () => {
    oofSound.play();
    setTimeout(() => location.reload(), 800);
  });
});
