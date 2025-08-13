const adImages = [
  'ads/ad1.jpg',
  'ads/ad2.jpg',
  'ads/ad3.jpg',
  'ads/ad4.jpg',
  'ads/ad5.gif',
  'ads/ad6.gif',
  'ads/ad7.gif',
];

function getRandomAdImage() {
  const index = Math.floor(Math.random() * adImages.length);
  return adImages[index];
}

function createAdPopup() {
  const popup = document.createElement('div');
  popup.className = 'popup';

  const img = document.createElement('img');
  img.src = getRandomAdImage();
  img.alt = 'Ad';

  const btn = document.createElement('button');
  btn.innerText = 'Close';
  btn.onclick = () => popup.remove();

  popup.appendChild(img);
  popup.appendChild(btn);

  const minWidth = 180;
  const maxWidth = 300;
  const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
  const height = width * 0.75;

  popup.style.width = `${width}px`;
  popup.style.height = `${height}px`;

  img.style.maxWidth = '100%';
  img.style.height = 'auto';

  const maxX = window.innerWidth - width;
  const maxY = window.innerHeight - height;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  popup.style.left = `${randomX}px`;
  popup.style.top = `${randomY}px`;

  document.body.appendChild(popup);
}

function scheduleNextPopup() {
  const delay = Math.random() * (300 - 500) + 800; // 5s to 30s
  setTimeout(() => {
    createAdPopup();
    scheduleNextPopup();
  }, delay);
}

scheduleNextPopup();
