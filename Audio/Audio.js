
import * as Howler from '../node_modules/howler/dist/howler.js';

const songUrl = '../Assets/Sounds/Songs/theme.mp3';


const sound = new Howl({
    src: [songUrl], // Tablica z URL piosenki
    loop: true // Ustaw opcję loop na true
  });
  
  // Pobierz elementy DOM
  const toggleVolumeButton = document.getElementById('toggleVolumeButton');
  const volumeSliderContainer = document.getElementById('volumeSliderContainer');
  const volumeSlider = document.getElementById('volumeSlider');
  
  // Przycisk do przełączania suwaka głośności
  toggleVolumeButton.addEventListener('click', () => {
    volumeSliderContainer.style.display = volumeSliderContainer.style.display === 'none' ? 'block' : 'none';
  });
  
  // Ustaw głośność na podstawie wartości suwaka
  volumeSlider.addEventListener('input', () => {
    const volumeValue = parseFloat(volumeSlider.value);
    sound.volume(volumeValue);
  });

sound.play();