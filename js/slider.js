import util from './util';

const sliderContainer = document.querySelector('.slider');
const sliderControlPanel = sliderContainer.querySelector('.next-function-slider__control-panel');
const sliderTitle = sliderContainer.querySelector('.slider__title');
const sliderDescription = sliderContainer.querySelector('.slider__description');
const slider = document.querySelector('.slider__item');

const controlBtnTemp = `
<div class="next-function-slider__control-panel-wrapper">
<button class="next-function-slider__btn btn btn--size btn--color temperature-hand">Вручную</button>
<button class="next-function-slider__btn btn btn--size temperature-cold">Холодно</button>
<button class="next-function-slider__btn btn btn--size temperature-warm">Тепло</button>
</div>`;

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
</div>`;

const sliderThermostat = `
<div class="thermostat">
<svg class="thermostat__scale" width="270" height="270">
<circle class="thermostat__scale-blank" r="98" cx="50%" cy="50%" stroke-dasharray="1 4" stroke-width="21" stroke-dashoffset="4"></circle>
<circle r="98" cx="50%" cy="50%" stroke-width="22" fill="none" stroke="#fff" stroke-dasharray="105 3000"></circle>
<circle class="thermostat__scale-fill" r="98" cx="50%" cy="50%" stroke-dasharray="0 0 0 110 0 3000" stroke-width="21" stroke-dashoffset="4"></circle>
<circle class="thermostat__scale-wrapper" r="100" cx="50%" cy="50%" stroke-width="40" stroke="transparent" fill="none"></circle>
</svg>
<input class="thermostat__field" type="hidden" value="0" name="thermostat">
<div class="thermostat__wrapper"><span class="thermostat__value">5</span></div>
</div>`;

function checkRepeatTextContent(elem, content) {
  if(elem.textContent === content) {
    return;
  }
  elem.textContent = content;
}

function addTitleAndDescription(elem, btnPanel, sliderSample) {
  const title = elem.querySelector('h3').textContent;
  const description = elem.querySelector('p') === null ? null : elem.querySelector('p').textContent;
  checkRepeatTextContent(sliderTitle, title);
  checkRepeatTextContent(sliderDescription, description);
  sliderControlPanel.innerHTML = btnPanel;
  slider.innerHTML = sliderSample;
}

function addTempSlider(elem) {
  addTitleAndDescription(elem, controlBtnTemp, sliderTemp);
  sliderControlPanel.addEventListener('click', controlTempSlider);
  sliderControlPanel.addEventListener('keydown', controlEnterTempSlider);
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
  addTitleAndDescription(elem, controlBtnLight, sliderLight);
  sliderControlPanel.addEventListener('click', controlLightSlider);
  sliderControlPanel.addEventListener('keydown', controlEnterLightSlider);
}

function controlTempSlider(e) {
  const typeAction = [...(e.target.classList)].join().replace(/\D+temperature-/, '');
  const tempSlider = sliderContainer.querySelector('.next-function-slider__range');
  switch(typeAction) {
    case 'cold':
      setValueOnSlider(tempSlider, -10);
      break;
    case 'warm':
      setValueOnSlider(tempSlider, 30);
      break;
    case 'hand':
      tempSlider.disabled = false;
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
  switch(typeAction) {
    case 'day':
      setValueOnSlider(tempSlider, 1000);
      break;
    case 'even':
      setValueOnSlider(tempSlider, 10);
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
      if(amount > 50) {
        amount -= 2;
      } else if (amount > 80) {
        amount -= 5;
      }
      const arr = [...new Array(amount)].fill('1.5 3.5');
      const str = arr.join(' ');
      const final = slider.querySelector('.thermostat__scale-fill');
      final.style.strokeDasharray = `0 110 ${str} 0 3000`;
      const temperature = 3 + Math.floor(angle / 14.29);
      termostatValue.textContent = temperature;
      termostatField.value = temperature;
    }
  });
}

const verticalContainer = document.querySelector('.next-scenarios-slider__items--vertical');

function browseMainScenarios(e) {
  const direction = this.classList.contains('next-scenarios-slider__control--up') ? 'up' : 'down';
  switch(direction) {
    case 'up':
      verticalContainer.scrollTop -=133;
      if(verticalContainer.scrollTop === 0) {
        this.classList.toggle('next-scenarios-slider__control--up');
      }
      break;
    case 'down':
      verticalContainer.scrollTop += 133;
      if((verticalContainer.scrollTop ^ 0) + 311 === verticalContainer.scrollHeight) {
        this.classList.toggle('next-scenarios-slider__control--up');
      }
      break;
  }
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

export default {
  addTempSlider,
  addLightSlider,
  addDefaultInfo,
  addFloorSlider,
  distributeGridSlides,
  browseMainScenarios,
  browseFavoriteScenarios
}
