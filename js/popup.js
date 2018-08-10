import util from './util';
import slider from './slider';

const popUp = document.querySelector('.popup');
const btnCls = popUp.querySelector('.cls');
const footer = document.querySelector('.page-footer');

function closePoUpSlider(e) {
  popUp.classList.toggle('popup--off');
  footer.classList.toggle('page-footer--off');
  e.target.removeEventListener('click', closePoUpSlider);
}

function openPoUpSlider (e){
  let elem = e.target;
  while(elem.tagName.toLowerCase() !== 'li') {
    elem = elem.parentElement;
  }
  const typeSlider = [...elem.classList].join().replace(/\D+popup-slider--/, '');
  switch(typeSlider) {
    case 'temp':
      slider.addTempSlider(elem);
      break;
    case 'light':
      slider.addLightSlider(elem);
      break;
    case 'floor':
      slider.addFloorSlider(elem);
      break;
    default:
      slider.addDefaultInfo();
  }
  popUp.style.transformOrigin = `${util.getCenterXElemPos(elem)}px ${util.getCenterYElemPos(elem)}px`;
  popUp.classList.toggle('popup--off');
  footer.classList.toggle('page-footer--off');
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
