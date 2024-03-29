import util from './util';

let timeId = null;
const sliderContainer = document.querySelector('.slider');
const sliderControlPanel = sliderContainer.querySelector('.next-function-slider__control-panel');
const sliderTitle = sliderContainer.querySelector('.slider__title');
const sliderDescription = sliderContainer.querySelector('.slider__description');
const slider = document.querySelector('.slider__item');
const sliderValue = sliderContainer.querySelector('.slider__value-wrapper');

const controlBtnTemp = `
<div class="next-function-slider__control-panel-wrapper">
<button class="next-function-slider__btn btn btn--size btn--color temperature-hand">Вручную</button>
<button class="next-function-slider__btn btn btn--size temperature-cold">Холодно</button>
<button class="next-function-slider__btn btn btn--size temperature-middle">Тепло</button>
<button class="next-function-slider__btn btn btn--size temperature-warm">Жарко</button>
</div>`;

const valueTemp = `
<span class="slider__value">{{0}}</span>
<svg class="slider__icon" width="40" height="40">
<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon_temperature_2"></use>
</svg>
`;

const valueLight = `
<svg class="slider__icon-light" width="40" height="40">
<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon_sun2"></use>
</svg>
`;

const sliderTemp = `
<div class="next-function-slider__range-wrapper">
<input class="next-function-slider__range" type="range" min="-10" max="30" step="1">
</div>`;

const sliderLight = `
<div class="next-function-slider__range-wrapper next-function-slider__range-wrapper--color">
<input class="next-function-slider__range next-function-slider__range--color" type="range" min="10" max="1000" step="5">
</div>`;

const controlBtnLight = `
<div class="next-function-slider__control-panel-wrapper">
<button class="next-function-slider__btn btn btn--size btn--color light-hand">Вручную</button>
<button class="next-function-slider__btn btn btn--size light-day">Дневной свет</button>
<button class="next-function-slider__btn btn btn--size light-even">Вечерний свет</button>
<button class="next-function-slider__btn btn btn--size light-morn">Рассвет</button>
</div>`;

const sliderThermostat = `
<div class="thermostat">
<svg class="thermostat__scale" width="270" height="270">
<circle class="thermostat__scale-blank" r="98" cx="50%" cy="50%" stroke-dasharray="1 4" stroke-width="21" stroke-dashoffset="4"></circle>
<circle r="98" cx="50%" cy="50%" stroke-width="22" fill="none" stroke="#fff" stroke-dasharray="105 3000"></circle>
<circle class="thermostat__scale-fill" r="98" cx="50%" cy="50%" stroke-dasharray="0 0 0 110 0 3000" stroke-width="21" stroke-dashoffset="4"></circle>
<circle class="thermostat__scale-wrapper" r="100" cx="50%" cy="50%" stroke-width="40" stroke="transparent" fill="none"></circle>
</svg>
<input class="thermostat__field" type="hidden" value="5" name="thermostat">
<div class="thermostat__wrapper"><span class="thermostat__value">5</span></div>
<div class="thermostat__pointer"></div>
</div>`;

function checkRepeatTextContent(elem, content) {
  if(elem.textContent === content) {
    return;
  }
  elem.textContent = content;
}

function addTitleAndDescription(elem, btnPanel, sliderSample, mode) {
  const title = elem.querySelector('h3').textContent;
  const description = elem.querySelector('p') === null ? null : elem.querySelector('p').textContent;
  checkRepeatTextContent(sliderTitle, title);
  checkRepeatTextContent(sliderDescription, description);
  sliderControlPanel.innerHTML = btnPanel;
  slider.innerHTML = sliderSample;
  const currentValue = slider.querySelector('input').value;
  const currentTemp = valueTemp.replace('{{0}}', `+${currentValue}`);
  if(mode === 'light') {
    sliderValue.innerHTML = valueLight;
    const icon = sliderValue.querySelector('.slider svg');
    icon.style.opacity = currentValue / 1000 + 0.2;
  } else {
    sliderValue.innerHTML = currentTemp;
  }
}

function addTempSlider(elem) {
  addTitleAndDescription(elem, controlBtnTemp, sliderTemp);
  sliderControlPanel.addEventListener('click', controlTempSlider);
  sliderControlPanel.addEventListener('keydown', controlEnterTempSlider);
  const range = slider.querySelector('.next-function-slider__range');
  range.addEventListener('change', changeTempValue);
}

function changeTempValue(e) {
  const value = sliderValue.querySelector('.slider__value');
  if(e.target.value < 0) {
    value.textContent = `${e.target.value}`;
    return;
  }
  value.textContent = `+${e.target.value}`;
}

function changeLightValue(e) {
  const icon = sliderValue.querySelector('.slider svg');
  icon.style.opacity = e.target.value / 1000 + 0.2;
}

function addDefaultInfo() {
  const defaultTitle = 'Неизвестное устройство';
  const defaultDescription = 'Статус не определен...';
  checkRepeatTextContent(sliderTitle, defaultTitle);
  checkRepeatTextContent(sliderDescription, defaultDescription);
  sliderControlPanel.innerHTML = '';
  slider.innerHTML = '';
}

function addLightSlider(elem) {
  addTitleAndDescription(elem, controlBtnLight, sliderLight, 'light');
  sliderControlPanel.addEventListener('click', controlLightSlider);
  sliderControlPanel.addEventListener('keydown', controlEnterLightSlider);
  const range = slider.querySelector('.next-function-slider__range');
  range.addEventListener('change', changeLightValue);
}

function controlTempSlider(e) {
  const typeAction = [...(e.target.classList)].join().replace(/\D+temperature-/, '');
  const tempSlider = sliderContainer.querySelector('.next-function-slider__range');
  const event =  new Event('change');
  switch(typeAction) {
    case 'cold':
      setValueOnSlider(tempSlider, -10);
      tempSlider.dispatchEvent(event);
      break;
    case 'warm':
      setValueOnSlider(tempSlider, 30);
      tempSlider.dispatchEvent(event);
      break;
    case 'hand':
      tempSlider.disabled = false;
      break;
    case 'middle':
      setValueOnSlider(tempSlider, 20);
      tempSlider.dispatchEvent(event);
      break;
  }
}

function controlEnterTempSlider(e) {
  if(e.keyCode === util.ENTER_KEY_CODE)
    controlTempSlider(e);
}

function controlLightSlider(e) {
  const typeAction = [...(e.target.classList)].join().replace(/\D+light-/, '');
  const tempSlider = sliderContainer.querySelector('.next-function-slider__range');
  const event =  new Event('change');
  switch(typeAction) {
    case 'day':
      setValueOnSlider(tempSlider, 1000);
      tempSlider.dispatchEvent(event);
      break;
    case 'even':
      setValueOnSlider(tempSlider, 500);
      tempSlider.dispatchEvent(event);
      break;
    case 'morn':
      setValueOnSlider(tempSlider, 10);
      tempSlider.dispatchEvent(event);
      break;
    case 'hand':
      tempSlider.disabled = false;
      break;
  }
}

function controlEnterLightSlider(e) {
  if(e.keyCode === util.ENTER_KEY_CODE)
    controlLightSlider(e);
}

function setValueOnSlider(slider, value = 0) {
  slider.value = value;
  slider.disabled = true;
}

function addFloorSlider(elem) {
  addTitleAndDescription(elem, '', sliderThermostat);
  const termostat = slider.querySelector('.thermostat');
  const termostatValue = slider.querySelector('.thermostat__value');
  const termostatField = slider.querySelector('.thermostat__field');
  const termostatPointer = slider.querySelector('.thermostat__pointer');
  slider.addEventListener('click', (e) => {
    if (!e.target.classList.contains('thermostat__scale-wrapper')) {
      return;
    }
    const center = {
      x: util.getCenterXElemPos(termostat),
      y: util.getCenterYElemPos(termostat)
    };
    const startCoords = {
      x: center.x,
      y: termostat.getBoundingClientRect().bottom,
    };
    if(center.x) {
      const offset = {
        x: e.clientX,
        y: e.clientY
      };
      const angle = util.anglePoint(startCoords, center, offset);
      let amount = Math.floor((angle - 30) / 2.8);
      if(amount < 0) {
        amount = 0;
      } else if(amount >= 50 && amount < 80) {
        amount -= 2;
      } else if (amount >= 80) {
        amount -= 4;
      }
      if(angle >= 30 && angle <= 332) {
        let rotateAngle = angle < 33 ? 33 :
          angle > 328 ? 328 : angle;
        if(rotateAngle >= 88 && rotateAngle < 117) {
          rotateAngle += 1.5;
        } else if(rotateAngle >= 117 && rotateAngle < 252) {
          rotateAngle += 2.8;
        } else if (rotateAngle >= 252 && rotateAngle < 324) {
          rotateAngle -= 2.5;
        }
        termostatPointer.style.transform = `rotate(${180 + rotateAngle}deg)`;
        const arr = [...new Array(amount)].fill('1.5 3.5');
        const str = arr.join(' ');
        const final = slider.querySelector('.thermostat__scale-fill');
        final.style.strokeDasharray = `0 110 ${str} 0 3000`;
        let temperature = 3 + Math.floor(angle / 14.29);
        temperature = temperature > 25 ? 25 :
          temperature < 5 ? 5 : temperature;
        termostatValue.textContent = temperature;
        termostatField.value = temperature;
        const value = sliderValue.querySelector('.slider__value');
        value.textContent = `+${temperature}`;
      }
    }
  });
}

const verticalContainer = document.querySelector('.next-scenarios-slider__items--vertical');
const verticalArrow = document.querySelector('.next-scenarios-slider__control');

function browseMainScenarios(e) {
  if(timeId) {
    clearTimeout(timeId);
  }
  timeId = setTimeout(() => {
    const direction = this.classList.contains('next-scenarios-slider__control--up') ? 'up' : 'down';
    const currentScrollTop = verticalContainer.scrollTop;
    switch(direction) {
      case 'up':
        util.animate({
          duration: 500,
          timing: timeFraction => timeFraction,
          draw: timeFraction => {
            verticalContainer.scrollTop = currentScrollTop - 133 * timeFraction;
            if(timeFraction === 1) {
              if(verticalContainer.scrollTop === 0) {
                verticalArrow.classList.toggle('next-scenarios-slider__control--up');
              }
            }
          }
        });
        break;
      case 'down':
        util.animate({
          duration: 500,
          timing: timeFraction => timeFraction,
          draw: timeFraction => {
            verticalContainer.scrollTop = currentScrollTop + 133 * timeFraction;
            if(timeFraction === 1) {
              if(Math.ceil(verticalContainer.scrollTop + verticalContainer.offsetHeight) === verticalContainer.scrollHeight) {
                verticalArrow.classList.toggle('next-scenarios-slider__control--up');
              }
            }
          }
        });
        break;
    }
  }, 300);
}

const sectionGridScenarios = document.querySelector('.next-scenarios-slider--grid');
const gridSlides =  document.querySelectorAll('.next-scenarios-slider__item--grid');
const gridSlidesLength = gridSlides.length;
const leftArrow = document.querySelector('.feautured-scenarios__grid-control--left');
const rightArrow = document.querySelector('.feautured-scenarios__grid-control--right');

function distributeGridSlides() {
  let amount = Math.ceil(gridSlidesLength / 9);
  if(amount === 1) return;
  const gridSlidesArr = [...gridSlides];
  const template = document.createDocumentFragment('template');
  while(amount > 0) {
    const ul = document.createElement('ul');
    ul.className = 'next-scenarios-slider__items next-scenarios-slider__items--height next-scenarios-slider__items--grid next-scenarios-slider__items--grid-off';
    gridSlidesArr.splice(0,9).forEach((it) => {
      ul.appendChild(it);
    });
    template.appendChild(ul);
    amount--;
  }
  sectionGridScenarios.innerHTML = '';
  sectionGridScenarios.appendChild(template);
}

function browseFavoriteScenarios(e) {
  if(this.classList.contains('feautured-scenarios__grid-control--left')) {
    browseFavoriteScenariosLeft(e);
  } else if(this.classList.contains('feautured-scenarios__grid-control--right')) {
    browseFavoriteScenariosRight(e);
  }
}

function browseFavoriteScenariosLeft(e){
  const gridContainer = document.querySelector('.next-scenarios-slider__items--grid-current');
  const prevElement = gridContainer.previousElementSibling;
  if(!prevElement) return;
  if(!prevElement.previousElementSibling) {
    leftArrow.classList.toggle('feautured-scenarios__grid-control--off');
    rightArrow.classList.toggle('feautured-scenarios__grid-control--off');
  }
  gridContainer.classList.toggle('next-scenarios-slider__items--grid-current');
  gridContainer.classList.toggle('next-scenarios-slider__items--grid-off');
  prevElement.classList.toggle('next-scenarios-slider__items--grid-current');
  prevElement.classList.toggle('next-scenarios-slider__items--grid-off');
}

function browseFavoriteScenariosRight(e){
  const gridContainer = document.querySelector('.next-scenarios-slider__items--grid-current');
  const nextElement = gridContainer.nextElementSibling;
  if(!nextElement) return;
  if(!nextElement.nextElementSibling) {
    leftArrow.classList.toggle('feautured-scenarios__grid-control--off');
    rightArrow.classList.toggle('feautured-scenarios__grid-control--off');
  }
  gridContainer.classList.toggle('next-scenarios-slider__items--grid-current');
  gridContainer.classList.toggle('next-scenarios-slider__items--grid-off');
  nextElement.classList.toggle('next-scenarios-slider__items--grid-current');
  nextElement.classList.toggle('next-scenarios-slider__items--grid-off');
}

const sectionLevelSlides = document.querySelector('.next-scenarios-slider__items--level');
const levelControl = document.querySelector('.feautured-devices__controls');
const feautureLeftArrow = levelControl.querySelector('.feautured-devices__control--left');
const feautureRightArrow = levelControl.querySelector('.feautured-devices__control--right');

function browseFavoriteDevices(e) {
  if(timeId) {
    clearTimeout(timeId);
  }
  timeId = setTimeout(() => {
    const direction = e.target.classList.contains('feautured-devices__control--left') ? 'left' : 'right';
    const currentScrollLeft = sectionLevelSlides.scrollLeft;
    switch(direction) {
      case 'left' :
        feautureRightArrow.classList.toggle('feautured-devices__control--off', false);
        util.animate({
          duration: 500,
          timing: timeFraction => timeFraction,
          draw: timeFraction => {
            sectionLevelSlides.scrollLeft = currentScrollLeft - 220 * timeFraction;
            if(timeFraction === 1) {
              if(!sectionLevelSlides.scrollLeft) {
                feautureLeftArrow.classList.toggle('feautured-devices__control--off', true);
              }
              feautureRightArrow.classList.toggle('feautured-devices__control--off', false);
            }
          }
        });
        break;
      case 'right':
        if(!browseFavoriteDevices.amount) {
          feautureLeftArrow.classList.toggle('feautured-devices__control--off', false);
          feautureLeftArrow.addEventListener('click', browseFavoriteDevices);
        }
        util.animate({
          duration: 500,
          timing: timeFraction => timeFraction,
          draw: timeFraction => {
            sectionLevelSlides.scrollLeft = currentScrollLeft + 160 * timeFraction;
            if(timeFraction === 1) {
              if(Math.ceil(sectionLevelSlides.scrollLeft) + sectionLevelSlides.offsetWidth >= sectionLevelSlides.scrollWidth) {
                feautureRightArrow.classList.toggle('feautured-devices__control--off', true);
              }
              feautureLeftArrow.classList.toggle('feautured-devices__control--off', false);
            }
          }
        });
        break;
    }
  }, 300);
}

export default {
  addTempSlider,
  addLightSlider,
  addDefaultInfo,
  addFloorSlider,
  distributeGridSlides,
  browseMainScenarios,
  browseFavoriteDevices,
  browseFavoriteScenarios
}
