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
const levelControl = document.querySelector('.feautured-devices__controls');
const feautureLeftArrow = levelControl.querySelector('.feautured-devices__control--left');
const feautureRightArrow = levelControl.querySelector('.feautured-devices__control--right');
const levelSlides =  document.querySelectorAll('.next-scenarios-slider__item--level');
const levelSlidesLength = levelSlides.length;
const listFieldDevices = document.querySelectorAll('.feautured-devices > input');
const btnAllDevices = [...listFieldDevices][0];

addEventKeyOnMenu(mainMenu, menuControl);
addEventKeyOnMenu(devicesMenu, devicesMenuControl);
[...popUpSlider].forEach(it => {
  it.addEventListener('click', popupModule.openPoUpSlider);
  it.addEventListener('keydown', popupModule.enterOpenPoUpSlider);
});

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

feautureLeftArrow.classList.toggle('feautured-devices__control--off');

if(levelSlidesLength >= 7) {
  levelControl.classList.toggle('feautured-devices__controls--off');
  feautureRightArrow.addEventListener('click', slider.browseFavoriteDevices);
}

if(document.body.clientWidth >= 1366) {
  redrawingPage();
}

window.addEventListener('resize', function(e){
  if(document.body.clientWidth < 1366) {
    [...listFieldDevices].forEach((it,index) => {
      if(!index) {
        it.checked = false;
        return;
      }
      it.checked = true;
      it.removeEventListener('click', offBtnAllDevices)
    });
    btnAllDevices.removeEventListener('click', offBtnFeaturedDevices);
  } else if(document.body.clientWidth >= 1366) {
    redrawingPage();
  }
});

function redrawingPage() {
  if(document.body.clientWidth >= 1366) {
    [...listFieldDevices].forEach((it,index) => {
      if(!index) {
        it.checked = true;
        return;
      }
      it.checked = false;
      it.addEventListener('click', offBtnAllDevices)
    });
    btnAllDevices.addEventListener('click', offBtnFeaturedDevices);
  }
}

function addEventKeyOnMenu(label, input, keyCode = util.ENTER_KEY_CODE) {
  label.addEventListener('keydown', (e) => {
    if (e.keyCode === keyCode) {
      input.checked = !input.checked;
    }
  });
}

function offBtnAllDevices(e) {
  if(!btnAllDevices.checked) return;
  btnAllDevices.checked = false;
}

function offBtnFeaturedDevices(e) {
  [...listFieldDevices].forEach((it,index) => {
    if(!index) {
      it.checked = true;
      return;
    }
    it.checked = false;
  });
}
