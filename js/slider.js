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

function checkRepeatTextContent(elem, content) {
  if(elem.textContent === content) {
    return;
  }
  elem.textContent = content;
}

function addTitleAndDescription(elem, btnPanel, sliderSample) {
  const title = elem.querySelector('h3').textContent;
  const description = elem.querySelector('p').textContent;
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

export default {
  addTempSlider,
  addLightSlider,
  addDefaultInfo
}
