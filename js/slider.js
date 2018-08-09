const slider = document.querySelector('.slider');
//const controlPanel = sliderPanel.querySelector('.next-function-slider__control-panel-wrapper');

const controlBtnTemp = `
<button class="next-function-slider__btn btn btn--size btn--color temperature-hand">Вручную</button>
<button class="next-function-slider__btn btn btn--size temperature-cold">Холодно</button>
<button class="next-function-slider__btn btn btn--size temperature-warm">Тепло</button>`;

const sliderTemp = `
<div class="temperature-slider__range-wrapper">
<input class="temperature-slider__range" type="range" min="-10" max="30" step="1">
</div>`;


const sample = `<h2 class="slider__title">{slider.title}</h2>
			  <p class="slider__description">{slider.description}</p>
			  <div class="slider__wrapper">
				  <section class="next-function-slider">
					  <section class="next-function-slider__control-panel">
						  <div class="next-function-slider__control-panel-wrapper">
							  {slider.control}
						  </div>
						  {slider.body}
					  </section>
				  </section>
			  </div>`;

const defaultSample = `<h2 class="slider__title">Неизвестное устройство</h2>
			  <p class="slider__description">Статус не определен...</p>
			  <div class="slider__wrapper">
				  <section class="next-function-slider">
					  <section class="next-function-slider__control-panel">
						  <div class="next-function-slider__control-panel-wrapper">
						  </div>
					  </section>
				  </section>
			  </div>`;

function addTempSlider(elem) {
  let template = sample.slice();
  template = template.replace(/{slider.title}/, elem.querySelector('h3').textContent);
  template = template.replace(/{slider.description}/, elem.querySelector('p').textContent);
  template = template.replace(/{slider.control}/, controlBtnTemp);
  template = template.replace(/{slider.body}/, sliderTemp);
  slider.innerHTML = template;
}

function addDefaultInfo(){
  slider.innerHTML = defaultSample;
}
function addLightSlider() {
  //В процессе
}

export default {
  addTempSlider,
  addLightSlider,
  addDefaultInfo
}



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
});

btnTempCold.addEventListener('click', (e) => {
  setValueOnSlider(tempSlider, -10);
});
btnTempWarm.addEventListener('click', (e) => {
  setValueOnSlider(tempSlider, 30);
});

