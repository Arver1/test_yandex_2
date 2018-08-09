import util from './util';
import slider from './slider';

const popUp = document.querySelector('.popup');
const btnCls = popUp.querySelector('.cls');

function closePoUpSlider(e) {
  popUp.classList.toggle('popup--off');
  e.target.removeEventListener('click', closePoUpSlider);
}

function openPoUpSlider (e){
  const elem = e.target.tagName.toLowerCase() === 'li' ? e.target : e.target.parentElement;
  const typeSlider = [...elem.classList].join().replace(/\D+popup-slider--/, '');
  switch(typeSlider) {
    case 'temp':
      slider.addTempSlider(elem);
      break;
    case 'light':
      slider.addLightSlider(elem);
      break;
    default:
      slider.addDefaultInfo();
  }
  popUp.style.transformOrigin = `${util.getCenterXElemPos(elem)}px ${util.getCenterYElemPos(elem)}px`;
  popUp.classList.toggle('popup--off');
  btnCls.addEventListener('click', closePoUpSlider);
}

function enterOpenPoUpSlider(e) {
  if(e.keyCode === util.ENTER_KEY_CODE) {
    openPoUpSlider(e);
  }
}

export default {
  openPoUpSlider,
  enterOpenPoUpSlider
}
