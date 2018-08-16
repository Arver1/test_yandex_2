import util from './util';
import popupModule from './popup';
import slider from './slider';

const mainMenu = document.querySelector('[for="burger_menu"]');
const menuControl = document.getElementById('burger_menu');
const devicesMenu = document.querySelector('[for="all_devices"]');
const devicesMenuControl = document.getElementById('all_devices');
const popUpSlider = document.querySelectorAll('.popup-slider');
const verticalArrow = document.querySelector('.next-scenarios-slider__control');
const verticalSlides = document.querySelectorAll('.next-scenarios-slider__item--vertical');
const gridControl = document.querySelector('.feautured-scenarios__grid-controls');
const leftArrow = gridControl.querySelector('.feautured-scenarios__grid-control--left');
const rightArrow = gridControl.querySelector('.feautured-scenarios__grid-control--right');
const gridSlides =  document.querySelectorAll('.next-scenarios-slider__item--grid');
const gridSlidesLength = gridSlides.length;

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

if(verticalSlides.length > 2) {
  verticalArrow.classList.toggle('next-scenarios-slider__control--off');
  verticalArrow.addEventListener('click', slider.browseMainScenarios);
}

if(gridSlidesLength > 9) {
  slider.distributeGridSlides();
  gridControl.classList.toggle('feautured-scenarios__grid-controls--off');
  const sliders = document.querySelectorAll('.next-scenarios-slider__items--grid-off');
  sliders[0].classList.toggle('next-scenarios-slider__items--grid-off');
  sliders[0].classList.toggle('next-scenarios-slider__items--grid-current');
  leftArrow.classList.toggle('feautured-scenarios__grid-control--off');
  rightArrow.addEventListener('click', slider.browseFavoriteScenarios);
  leftArrow.addEventListener('click', slider.browseFavoriteScenarios);
}

