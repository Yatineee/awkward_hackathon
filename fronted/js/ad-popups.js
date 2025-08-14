// ad-popups.js  — evil edition
const adImages = [
  'ads/ad1.jpg', 'ads/ad2.jpg', 'ads/ad3.jpg', 'ads/ad4.jpg',
  'ads/ad5.gif', 'ads/ad6.gif', 'ads/ad7.gif',
];

// 你的“嘲笑页”
// const ROAST_URL = './roasted.html';
const IMG_ROAST_URL = window.ROAST_IMG_URL || 'roasted.html'; // 点图片去这里
const BTN_ROAST_URL = window.ROAST_BTN_URL || 'https://puginarug.com/'; // 点假Close去这里
const BG_ROAST_URL  = window.ROAST_BG_URL  || 'roasted.html';     // 点弹窗其它区域

function getRandomAdImage() {
  const index = Math.floor(Math.random() * adImages.length);
  return adImages[index];
}

function createAdPopup() {
  const popup = document.createElement('div');
  popup.className = 'popup';

  // 右上角“真关闭”
  const realX = document.createElement('button');
  realX.className = 'x-real';
  realX.setAttribute('aria-label', 'Close dialog');
  realX.textContent = '×';

  // 图片（点击将跳转嘲笑页）
  const img = document.createElement('img');
  img.src = getRandomAdImage();
  img.alt = 'Ad';

  // 下部内容 + “假 Close”
  const body = document.createElement('div');
  body.className = 'popup-body';
  const fakeClose = document.createElement('button');
  fakeClose.className = 'btn-close-fake';
  fakeClose.innerText = 'Close ✖';

  body.appendChild(fakeClose);

  // 组装
  popup.appendChild(realX);
  popup.appendChild(img);
  popup.appendChild(body);

  // 尺寸与随机位置（保留你原有逻辑）
  const minWidth = 180;
  const maxWidth = 300;
  const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
  const height = Math.floor(width * 0.75);

  popup.style.width = `${width}px`;
  popup.style.height = `${height}px`;

  img.style.maxWidth = '100%';
  img.style.height = 'auto';

  const maxX = Math.max(0, window.innerWidth - width);
  const maxY = Math.max(0, window.innerHeight - height);
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  popup.style.left = `${randomX}px`;
  popup.style.top = `${randomY}px`;

  // —— 核心“邪恶”交互 —— //
  // 整个弹窗区域（除了右上角真 ×）一律跳转嘲笑页
  // popup.addEventListener('click', (e) => {
  //   if (!e.target.closest('.x-real')) {
  //     // window.location.href = ROAST_URL;
  //   window.location.href = "roasted.html";

  //   }
  // });

  // 1) 图片：专属嘲笑页
img.addEventListener('click', (e) => {
  e.stopPropagation();               // 别冒泡到 popup 上的通配跳转
  window.location.href = IMG_ROAST_URL;
});

// 2) 假 Close：专属嘲笑页
fakeClose.addEventListener('click', (e) => {
  e.stopPropagation();
  window.location.href = BTN_ROAST_URL;
});

// 3) 弹窗任意其它区域（除右上角真 ×）：默认嘲笑页
popup.addEventListener('click', (e) => {
  if (!e.target.closest('.x-real')) {
    window.location.href = BG_ROAST_URL;
  }
});

  // 真 ×：只关闭，不跳转
  realX.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.remove();
  });

  document.body.appendChild(popup);
}

// 合理的 5–30 秒随机间隔（单位：毫秒）
function scheduleNextPopup() {
  const delay = Math.floor(Math.random() * (300 - 500 + 800)) + 100; // 5000–30000ms
  setTimeout(() => {
    createAdPopup();
    scheduleNextPopup();
  }, delay);
}

// 开始循环弹窗
scheduleNextPopup();
