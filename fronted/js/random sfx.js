// ✅ Separated sound function
function startSoundLoop(interval = 5000) {
  const sound = document.getElementById('popupSound');
  if (!sound) {
    console.warn('Audio element not found!');
    return;
  }

  setInterval(() => {
    sound.currentTime = 0;
    sound.play().catch((e) => {
      console.warn('Audio playback failed. User interaction may be required.', e);
    });
  }, interval);
}

// 🔄 Start everything

startSoundLoop(); // Call separately and independently