// 登录页的小提示：提交后再暴露“标签反了”的彩蛋
document.addEventListener('DOMContentLoaded', () => {
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const hint = document.getElementById('signinHint');
      if (hint) hint.hidden = false;

      // 把“错位”的值打印下（仅演示，不发往后台）
      const email = document.getElementById('field-email').value;     // 实际上是邮箱
      const password = document.getElementById('field-password').value; // 实际上是密码
      alert(`Thanks! (we totally won't mix them)\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}`);
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Signed up! (This is a demo — nothing was saved.)');
    });

    // cometoa 彩蛋
    const cometoa = document.getElementById('cometoaBtn');
    const confetti = document.getElementById('confetti');
    if (cometoa && confetti) {
      // 轻微“躲避”效果 + 随机抖动
      cometoa.classList.add('dodge');
      let jitterTimer = null;

      cometoa.addEventListener('mouseenter', () => {
        if (Math.random() < 0.5) {
          const dx = (Math.random() * 16 - 8);
          const dy = (Math.random() * 12 - 6);
          cometoa.style.transform = `translate(${dx}px, ${dy}px)`;
          setTimeout(() => cometoa.style.transform = '', 250);
        }
      });

      cometoa.addEventListener('click', (e) => {
        e.preventDefault();
        confetti.hidden = false;
        // 简单“彩纸”：快速生成几片 emoji，1 秒后清理
        const pieces = Array.from({ length: 12 }).map(() => {
          const span = document.createElement('span');
          span.textContent = ['✨','🎊','🫧','🧨','💥','🌈'][Math.floor(Math.random()*6)];
          span.style.position = 'fixed';
          span.style.left = Math.random()*100 + 'vw';
          span.style.top = '-10vh';
          span.style.fontSize = (12 + Math.random()*18) + 'px';
          span.style.transition = 'transform 1s linear, opacity .3s ease';
          document.body.appendChild(span);
          requestAnimationFrame(() => {
            span.style.transform = `translateY(${110 + Math.random()*30}vh) rotate(${Math.random()*360}deg)`;
          });
          return span;
        });
        setTimeout(() => pieces.forEach(p => { p.style.opacity = 0; setTimeout(()=>p.remove(), 300); }), 1000);
      });
    }
  }
});
