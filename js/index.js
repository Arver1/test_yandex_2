import util from './util';
//import { addSlider } from './slider';

const mainMenu = document.querySelector('[for="burger_menu"]');
const menuControl = document.getElementById('burger_menu');
const devicesMenu = document.querySelector('[for="all_devices"]');
const devicesMenuControl = document.getElementById('all_devices');

addEventKeyOnMenu(mainMenu, menuControl);
addEventKeyOnMenu(devicesMenu, devicesMenuControl);

function addEventKeyOnMenu(label, input, keyCode = util.ENTER_KEY_CODE) {
  label.addEventListener('keydown', (e) => {
    if (e.keyCode === keyCode) {
      input.checked = !input.checked;
    }
  });
}



const popUpSlider = document.querySelectorAll('.popup-slider');

const popUp = document.querySelector('.popup');
const popUpTitle = popUp.querySelector('.slider__title');
const popUpDescription = popUp.querySelector('.slider__description');
const cls = popUp.querySelector('.cls');

[...popUpSlider].forEach(it => {
  it.addEventListener('click', openPoUpSlider);
  it.addEventListener('keydown', enterOpenPoUpSlider);
});

cls.addEventListener('click', closePoUpSlider);

function closePoUpSlider(e) {
  popUp.classList.toggle('popup--off');
  e.target.removeEventListener('click', closePoUpSlider);
}
function openPoUpSlider (e){
  popUp.style.transformOrigin = `${util.getCenterXElemPos(e.target)}px ${util.getCenterYElemPos(e.target)}px`;
  popUpTitle.textContent = e.target.querySelector('h3').textContent;
  popUpDescription.textContent = e.target.querySelector('p').textContent;
  popUp.classList.toggle('popup--off');
  cls.addEventListener('click', closePoUpSlider);
}

function enterOpenPoUpSlider(e) {
  if(e.keyCode === util.ENTER_KEY_CODE) {
    openPoUp(e);
  }
}


const btnTempHand = document.querySelector('.temperature-hand');
const btnTempCold = document.querySelector('.temperature-cold');
const btnTempWarm = document.querySelector('.temperature-warm');
const tempSlider = document.querySelector('.temperature-slider__range');

function setValueOnSlider(slider, value = 0) {
  slider.value = value;
  slider.disabled = true;
}

function disableSlider(slider) {
  slider.disabled = false;
}



btnTempHand.addEventListener('click', (e) => {
  tempSlider.disabled = false;
})

btnTempCold.addEventListener('click', (e) => {
  setValueOnSlider(tempSlider, -10);
})
btnTempWarm.addEventListener('click', (e) => {
  setValueOnSlider(tempSlider, 30);
})

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
