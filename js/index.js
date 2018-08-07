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
