import util from './util';
import popupModule from './popup';

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
