function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

const box = document.querySelector('.changer');
const palette = document.getElementsByClassName('pallet');

box.addEventListener('click', () => {
  const pallet1 = getRandomColor();
  const pallet2 = getRandomColor();
  const pallet3 = getRandomColor();

  const textColor = '#FFFFFF';

  if (palette.length >= 3) {
    [pallet1, pallet2, pallet3].forEach((palletColor, index) => {
      palette[index].style.backgroundColor = palletColor;

      const contrastValid = isContrastSufficient(palletColor, textColor);

      if (contrastValid) {
        palette[index].style.color = textColor;
      } else {
        palette[index].style.color = '#000000';
      }

      palette[index].textContent = `Hex: ${palletColor}`;
    });
  }
});

function getLuminance(color) {
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  const [rLum, gLum, bLum] = [r, g, b].map(value => {
    value /= 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rLum + 0.7152 * gLum + 0.0722 * bLum;
}

function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function isContrastSufficient(color1, color2, largeText = false) {
  const ratio = getContrastRatio(color1, color2);
  return largeText ? ratio >= 3 : ratio >= 4.5;
}

const darkmode = document.querySelector('.darkmode');

darkmode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const saveColorsBtn = document.getElementById('saveColorsBtn');

saveColorsBtn.addEventListener('click', () => {
  const savedColors = localStorage.getItem('savedColors');
  const currentColors = Array.from(palette).map(el => el.style.backgroundColor);
  const newColors = savedColors ? [...JSON.parse(savedColors), ...currentColors] : currentColors;
  localStorage.setItem('savedColors', JSON.stringify(newColors));

  alert('The ColorsWere Succesfully Saved')
});

const savedColorsList = document.querySelector('.savedColors ul');

window.addEventListener('DOMContentLoaded', () => {
  const savedColors = localStorage.getItem('savedColors');
  if (savedColors) {
    const colors = JSON.parse(savedColors);
    const li = document.createElement('li');
    li.textContent = colors.join(', '); 
    const newLi = document.createElement('li');
    newLi.appendChild(li);
    savedColorsList.appendChild(newLi);
  }
});

const clearColorsBtn = document.getElementById('clearColorsBtn');

clearColorsBtn.addEventListener('click', () => {
  localStorage.removeItem('savedColors');
  savedColorsList.innerHTML = '';
  alert('The saved colors were successfully deleted');
});
