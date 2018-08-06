import { ENTER_KEY_CODE } from './util';

const menu = document.querySelector('[for="burger_menu"]');
const menuControl = document.getElementById('burger_menu');

menu.addEventListener('keydown', (e) => {
  if (e.keyCode === ENTER_KEY_CODE) {
    menuControl.checked = !menuControl.checked;
  }
});
