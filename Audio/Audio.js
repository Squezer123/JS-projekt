
import * as Howler from '../node_modules/howler/dist/howler.js';

const songUrl = '../Assets/Sounds/Songs/theme.mp3';


const sound = new Howl({
    src: [songUrl], 
    loop: true 
  });
  
  const toggleVolumeButton = document.getElementById('toggleVolumeButton');
  const volumeSliderContainer = document.getElementById('volumeSliderContainer');
  const volumeSlider = document.getElementById('volumeSlider');
  
  toggleVolumeButton.addEventListener('click', () => {
    volumeSliderContainer.style.display = volumeSliderContainer.style.display === 'none' ? 'block' : 'none';
  });
  
  volumeSlider.addEventListener('input', () => {
    const volumeValue = parseFloat(volumeSlider.value);
    sound.volume(volumeValue);
  });

sound.play();