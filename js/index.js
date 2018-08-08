import { ENTER_KEY_CODE } from './util';

const mainMenu = document.querySelector('[for="burger_menu"]');
const menuControl = document.getElementById('burger_menu');
const devicesMenu = document.querySelector('[for="all_devices"]');
const devicesMenuControl = document.getElementById('all_devices');

addEventKeyOnMenu(mainMenu, menuControl);
addEventKeyOnMenu(devicesMenu, devicesMenuControl);

function addEventKeyOnMenu(label, input, keyCode = ENTER_KEY_CODE) {
  label.addEventListener('keydown', (e) => {
    if (e.keyCode === keyCode) {
      input.checked = !input.checked;
    }
  });
}

const tempSlider1 = document.querySelectorAll('.tempSlider');
const temperature = document.querySelector('.temperature');
const tempTitle = temperature.querySelector('.temperature-slider__title');
const tempDescription = temperature.querySelector('.temperature-slider__description');

const cls = document.querySelector('.cls');

[...tempSlider1].forEach(it => {
  it.addEventListener('click', () => {
    temperature.style.transformOrigin =
      `${(it.getBoundingClientRect().left + it.getBoundingClientRect().right)/2}px 
      ${(it.getBoundingClientRect().top + it.getBoundingClientRect().bottom)/2}px`;
    tempTitle.textContent = it.querySelector('h3').textContent;
    tempDescription.textContent = it.querySelector('p').textContent;
    temperature.classList.toggle('temperature--off');
  })
});
cls.addEventListener('click', () => {
  temperature.classList.toggle('temperature--off');
});




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
