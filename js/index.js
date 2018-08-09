import util from './util';
import popupModule from './popup';
//import { addSlider } from './slider';

const mainMenu = document.querySelector('[for="burger_menu"]');
const menuControl = document.getElementById('burger_menu');
const devicesMenu = document.querySelector('[for="all_devices"]');
const devicesMenuControl = document.getElementById('all_devices');
const popUpSlider = document.querySelectorAll('.popup-slider');

addEventKeyOnMenu(mainMenu, menuControl);
addEventKeyOnMenu(devicesMenu, devicesMenuControl);
[...popUpSlider].forEach(it => {
  it.addEventListener('click', popupModule.openPoUpSlider);
  it.addEventListener('keydown', popupModule.enterOpenPoUpSlider);
});


function addEventKeyOnMenu(label, input, keyCode = util.ENTER_KEY_CODE) {
  label.addEventListener('keydown', (e) => {
    if (e.keyCode === keyCode) {
      input.checked = !input.checked;
    }
  });
}


/*
function addEventOnBtnSlider(event, btn, slider) {
  btn.addEventListener(event, () => {
    setValueOnSlider(slider,)
  });
}*/
/*
const sliderPanel = document.querySelector('.next-function-slider');
const controlPanel = sliderPanel.querySelector('.next-function-slider__wrapper');

const controlBtnTemp = `
<button class="next-function-slider__item btn btn--size btn--color temperature-hand">Вручную</button>
<button class="next-function-slider__item btn btn--size temperature-cold">Холодно</button>
<button class="next-function-slider__item btn btn--size temperature-warm">Тепло</button>`;

const sliderTemp = `
<div class="temperature-slider__range-wrapper">
<input class="temperature-slider__range" type="range" min="-10" max="30" step="1">
</div>`;

const template = document.createElement('template');
template.innerHTML = controlBtnTemp;
controlPanel.appendChild(template.content);
*/
