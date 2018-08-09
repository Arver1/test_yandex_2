const sliderPanel = document.querySelector('.next-function-slider');
const controlPanel = sliderPanel.querySelector('.next-function-slider__wrapper');

const controlBtnTemp = `
<button class="next-function-slider__item btn btn--size btn--color temperature-hand">Вручную</button>
<button class="next-function-slider__item btn btn--size temperature-cold">Холодно</button>
<button class="next-function-slider__item btn btn--size temperature-warm">Тепло</button>`;

const sliderTemp = `
<div class="temperature-slider__range-wrapper">
<input class="temperature-slider__range" type="range" min="-10" max="30" step="1">
</div>`;

const template = document.createElement('template');
template.innerHTML = controlBtnTemp;
sliderPanel.appendChild(template);

