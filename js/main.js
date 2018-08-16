!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./util.js\nconst ENTER_KEY_CODE = 13;\n\nconst getCenterXElemPos = elem => {\n  if (!elem) return 0;\n  const cords = elem.getBoundingClientRect();\n  return (cords.left + cords.right) / 2;\n};\n\nconst getCenterYElemPos = elem => {\n  if (!elem) return 0;\n  const cords = elem.getBoundingClientRect();\n  return (cords.top + cords.bottom) / 2;\n};\n\nconst anglePoint = (a, b, c) => {\n  const x1 = a.x - b.x;\n  const x2 = c.x - b.x;\n  const y1 = a.y - b.y;\n  const y2 = c.y - b.y;\n  const d1 = Math.sqrt(x1 * x1 + y1 * y1);\n  const d2 = Math.sqrt(x2 * x2 + y2 * y2);\n\n  const angle = Math.acos((x1 * x2 + y1 * y2) / (d1 * d2)) * 180 / Math.PI;\n  if (x2 > 0) {\n    return 360 - angle;\n  }\n  return angle;\n};\n\n/* harmony default export */ var util = ({\n  ENTER_KEY_CODE,\n  getCenterXElemPos,\n  getCenterYElemPos,\n  anglePoint\n});\n// CONCATENATED MODULE: ./slider.js\n\n\nconst sliderContainer = document.querySelector('.slider');\nconst sliderControlPanel = sliderContainer.querySelector('.next-function-slider__control-panel');\nconst sliderTitle = sliderContainer.querySelector('.slider__title');\nconst sliderDescription = sliderContainer.querySelector('.slider__description');\nconst slider = document.querySelector('.slider__item');\nconst sliderValue = sliderContainer.querySelector('.slider__value-wrapper');\n\nconst controlBtnTemp = `\n<div class=\"next-function-slider__control-panel-wrapper\">\n<button class=\"next-function-slider__btn btn btn--size btn--color temperature-hand\">Вручную</button>\n<button class=\"next-function-slider__btn btn btn--size temperature-cold\">Холодно</button>\n<button class=\"next-function-slider__btn btn btn--size temperature-middle\">Тепло</button>\n<button class=\"next-function-slider__btn btn btn--size temperature-warm\">Жарко</button>\n</div>`;\n\nconst valueTemp = `\n<span class=\"slider__value\">0</span>\n<svg class=\"slider__icon\" width=\"40\" height=\"40\">\n<use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon_temperature_2\"></use>\n</svg>\n`;\n\nconst valueLight = `\n<svg class=\"slider__icon-light\" width=\"40\" height=\"40\">\n<use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon_sun2\"></use>\n</svg>\n`;\n\nconst sliderTemp = `\n<div class=\"next-function-slider__range-wrapper\">\n<input class=\"next-function-slider__range\" type=\"range\" min=\"-10\" max=\"30\" step=\"1\">\n</div>`;\n\nconst sliderLight = `\n<div class=\"next-function-slider__range-wrapper next-function-slider__range-wrapper--color\">\n<input class=\"next-function-slider__range next-function-slider__range--color\" type=\"range\" min=\"10\" max=\"1000\" step=\"5\">\n</div>`;\n\nconst controlBtnLight = `\n<div class=\"next-function-slider__control-panel-wrapper\">\n<button class=\"next-function-slider__btn btn btn--size btn--color light-hand\">Вручную</button>\n<button class=\"next-function-slider__btn btn btn--size light-day\">Дневной свет</button>\n<button class=\"next-function-slider__btn btn btn--size light-even\">Вечерний свет</button>\n<button class=\"next-function-slider__btn btn btn--size light-morn\">Рассвет</button>\n</div>`;\n\nconst sliderThermostat = `\n<div class=\"thermostat\">\n<svg class=\"thermostat__scale\" width=\"270\" height=\"270\">\n<circle class=\"thermostat__scale-blank\" r=\"98\" cx=\"50%\" cy=\"50%\" stroke-dasharray=\"1 4\" stroke-width=\"21\" stroke-dashoffset=\"4\"></circle>\n<circle r=\"98\" cx=\"50%\" cy=\"50%\" stroke-width=\"22\" fill=\"none\" stroke=\"#fff\" stroke-dasharray=\"105 3000\"></circle>\n<circle class=\"thermostat__scale-fill\" r=\"98\" cx=\"50%\" cy=\"50%\" stroke-dasharray=\"0 0 0 110 0 3000\" stroke-width=\"21\" stroke-dashoffset=\"4\"></circle>\n<circle class=\"thermostat__scale-wrapper\" r=\"100\" cx=\"50%\" cy=\"50%\" stroke-width=\"40\" stroke=\"transparent\" fill=\"none\"></circle>\n</svg>\n<input class=\"thermostat__field\" type=\"hidden\" value=\"5\" name=\"thermostat\">\n<div class=\"thermostat__wrapper\"><span class=\"thermostat__value\">5</span></div>\n</div>`;\n\nfunction checkRepeatTextContent(elem, content) {\n  if (elem.textContent === content) {\n    return;\n  }\n  elem.textContent = content;\n}\n\nfunction addTitleAndDescription(elem, btnPanel, sliderSample, mode) {\n  const title = elem.querySelector('h3').textContent;\n  const description = elem.querySelector('p') === null ? null : elem.querySelector('p').textContent;\n  checkRepeatTextContent(sliderTitle, title);\n  checkRepeatTextContent(sliderDescription, description);\n  sliderControlPanel.innerHTML = btnPanel;\n  slider.innerHTML = sliderSample;\n  if (mode === 'light') {\n    sliderValue.innerHTML = valueLight;\n  } else {\n    sliderValue.innerHTML = valueTemp;\n  }\n}\n\nfunction addTempSlider(elem) {\n  addTitleAndDescription(elem, controlBtnTemp, sliderTemp);\n  sliderControlPanel.addEventListener('click', controlTempSlider);\n  sliderControlPanel.addEventListener('keydown', controlEnterTempSlider);\n  const range = slider.querySelector('.next-function-slider__range');\n  range.addEventListener('change', changeTempValue);\n}\n\nfunction changeTempValue(e) {\n  const value = sliderValue.querySelector('.slider__value');\n  if (e.target.value < 0) {\n    value.textContent = `${e.target.value}`;\n    return;\n  }\n  value.textContent = `+${e.target.value}`;\n}\n\nfunction changeLightValue(e) {\n  const icon = sliderValue.querySelector('.slider svg');\n  icon.style.opacity = e.target.value / 1000 + 0.2;\n}\n\nfunction addDefaultInfo() {\n  const defaultTitle = 'Неизвестное устройство';\n  const defaultDescription = 'Статус не определен...';\n  checkRepeatTextContent(sliderTitle, defaultTitle);\n  checkRepeatTextContent(sliderDescription, defaultDescription);\n  sliderControlPanel.innerHTML = '';\n  slider.innerHTML = '';\n}\n\nfunction addLightSlider(elem) {\n  addTitleAndDescription(elem, controlBtnLight, sliderLight, 'light');\n  sliderControlPanel.addEventListener('click', controlLightSlider);\n  sliderControlPanel.addEventListener('keydown', controlEnterLightSlider);\n  const range = slider.querySelector('.next-function-slider__range');\n  range.addEventListener('change', changeLightValue);\n}\n\nfunction controlTempSlider(e) {\n  const typeAction = [...e.target.classList].join().replace(/\\D+temperature-/, '');\n  const tempSlider = sliderContainer.querySelector('.next-function-slider__range');\n  const event = new Event('change');\n  switch (typeAction) {\n    case 'cold':\n      setValueOnSlider(tempSlider, -10);\n      tempSlider.dispatchEvent(event);\n      break;\n    case 'warm':\n      setValueOnSlider(tempSlider, 30);\n      tempSlider.dispatchEvent(event);\n      break;\n    case 'hand':\n      tempSlider.disabled = false;\n      break;\n    case 'middle':\n      setValueOnSlider(tempSlider, 20);\n      tempSlider.dispatchEvent(event);\n      break;\n  }\n}\n\nfunction controlEnterTempSlider(e) {\n  if (e.keyCode === util.ENTER_KEY_CODE) controlTempSlider(e);\n}\n\nfunction controlLightSlider(e) {\n  const typeAction = [...e.target.classList].join().replace(/\\D+light-/, '');\n  const tempSlider = sliderContainer.querySelector('.next-function-slider__range');\n  const event = new Event('change');\n  switch (typeAction) {\n    case 'day':\n      setValueOnSlider(tempSlider, 1000);\n      tempSlider.dispatchEvent(event);\n      break;\n    case 'even':\n      setValueOnSlider(tempSlider, 500);\n      tempSlider.dispatchEvent(event);\n      break;\n    case 'morn':\n      setValueOnSlider(tempSlider, 10);\n      tempSlider.dispatchEvent(event);\n      break;\n    case 'hand':\n      tempSlider.disabled = false;\n      break;\n  }\n}\n\nfunction controlEnterLightSlider(e) {\n  if (e.keyCode === util.ENTER_KEY_CODE) controlLightSlider(e);\n}\n\nfunction setValueOnSlider(slider, value = 0) {\n  slider.value = value;\n  slider.disabled = true;\n}\n\nfunction addFloorSlider(elem) {\n  addTitleAndDescription(elem, '', sliderThermostat);\n  const termostat = slider.querySelector('.thermostat');\n  const termostatValue = slider.querySelector('.thermostat__value');\n  const termostatField = slider.querySelector('.thermostat__field');\n  slider.addEventListener('click', e => {\n    if (!e.target.classList.contains('thermostat__scale-wrapper')) {\n      return;\n    }\n    const center = {\n      x: util.getCenterXElemPos(termostat),\n      y: util.getCenterYElemPos(termostat)\n    };\n    const startCoords = {\n      x: center.x,\n      y: termostat.getBoundingClientRect().bottom\n    };\n    if (center.x) {\n      const offset = {\n        x: e.clientX,\n        y: e.clientY\n      };\n      const angle = util.anglePoint(startCoords, center, offset);\n      let amount = Math.floor((angle - 30) / 2.8);\n      if (amount < 0) {\n        amount = 0;\n      } else if (amount > 50) {\n        amount -= 2;\n      } else if (amount > 80) {\n        amount -= 5;\n      }\n      const arr = [...new Array(amount)].fill('1.5 3.5');\n      const str = arr.join(' ');\n      const final = slider.querySelector('.thermostat__scale-fill');\n      final.style.strokeDasharray = `0 110 ${str} 0 3000`;\n      let temperature = 3 + Math.floor(angle / 14.29);\n      temperature = temperature > 25 ? 25 : temperature;\n      termostatValue.textContent = temperature;\n      termostatField.value = temperature;\n      const value = sliderValue.querySelector('.slider__value');\n      value.textContent = `+${temperature}`;\n    }\n  });\n}\n\nconst verticalContainer = document.querySelector('.next-scenarios-slider__items--vertical');\n\nfunction browseMainScenarios(e) {\n  const direction = this.classList.contains('next-scenarios-slider__control--up') ? 'up' : 'down';\n  switch (direction) {\n    case 'up':\n      verticalContainer.scrollTop -= 133;\n      if (verticalContainer.scrollTop === 0) {\n        this.classList.toggle('next-scenarios-slider__control--up');\n      }\n      break;\n    case 'down':\n      verticalContainer.scrollTop += 133;\n      if ((verticalContainer.scrollTop ^ 0) + 311 === verticalContainer.scrollHeight) {\n        this.classList.toggle('next-scenarios-slider__control--up');\n      }\n      break;\n  }\n}\n\nconst sectionGridScenarios = document.querySelector('.next-scenarios-slider--grid');\nconst gridSlides = document.querySelectorAll('.next-scenarios-slider__item--grid');\nconst gridSlidesLength = gridSlides.length;\nconst leftArrow = document.querySelector('.feautured-scenarios__grid-control--left');\nconst rightArrow = document.querySelector('.feautured-scenarios__grid-control--right');\n\nfunction distributeGridSlides() {\n  let amount = Math.ceil(gridSlidesLength / 9);\n  if (amount === 1) return;\n  const gridSlidesArr = [...gridSlides];\n  const template = document.createDocumentFragment('template');\n  while (amount > 0) {\n    const ul = document.createElement('ul');\n    ul.className = 'next-scenarios-slider__items next-scenarios-slider__items--height next-scenarios-slider__items--grid next-scenarios-slider__items--grid-off';\n    gridSlidesArr.splice(0, 9).forEach(it => {\n      ul.appendChild(it);\n    });\n    template.appendChild(ul);\n    amount--;\n  }\n  sectionGridScenarios.innerHTML = '';\n  sectionGridScenarios.appendChild(template);\n}\n\nfunction browseFavoriteScenarios(e) {\n  if (this.classList.contains('feautured-scenarios__grid-control--left')) {\n    browseFavoriteScenariosLeft(e);\n  } else if (this.classList.contains('feautured-scenarios__grid-control--right')) {\n    browseFavoriteScenariosRight(e);\n  }\n}\n\nfunction browseFavoriteScenariosLeft(e) {\n  const gridContainer = document.querySelector('.next-scenarios-slider__items--grid-current');\n  const prevElement = gridContainer.previousElementSibling;\n  if (!prevElement) return;\n  if (!prevElement.previousElementSibling) {\n    leftArrow.classList.toggle('feautured-scenarios__grid-control--off');\n    rightArrow.classList.toggle('feautured-scenarios__grid-control--off');\n  }\n  gridContainer.classList.toggle('next-scenarios-slider__items--grid-current');\n  gridContainer.classList.toggle('next-scenarios-slider__items--grid-off');\n  prevElement.classList.toggle('next-scenarios-slider__items--grid-current');\n  prevElement.classList.toggle('next-scenarios-slider__items--grid-off');\n}\n\nfunction browseFavoriteScenariosRight(e) {\n  const gridContainer = document.querySelector('.next-scenarios-slider__items--grid-current');\n  const nextElement = gridContainer.nextElementSibling;\n  if (!nextElement) return;\n  if (!nextElement.nextElementSibling) {\n    leftArrow.classList.toggle('feautured-scenarios__grid-control--off');\n    rightArrow.classList.toggle('feautured-scenarios__grid-control--off');\n  }\n  gridContainer.classList.toggle('next-scenarios-slider__items--grid-current');\n  gridContainer.classList.toggle('next-scenarios-slider__items--grid-off');\n  nextElement.classList.toggle('next-scenarios-slider__items--grid-current');\n  nextElement.classList.toggle('next-scenarios-slider__items--grid-off');\n}\n\n/* harmony default export */ var slider_0 = ({\n  addTempSlider,\n  addLightSlider,\n  addDefaultInfo,\n  addFloorSlider,\n  distributeGridSlides,\n  browseMainScenarios,\n  browseFavoriteScenarios\n});\n// CONCATENATED MODULE: ./popup.js\n\n\n\nconst popUp = document.querySelector('.popup');\nconst btnCls = popUp.querySelector('.cls');\nconst footer = document.querySelector('.page-footer');\nconst popup_sliderControlPanel = document.querySelector('.next-function-slider__control-panel');\n\nfunction closePoUpSlider(e) {\n  popUp.classList.toggle('popup--off');\n  footer.classList.toggle('page-footer--off');\n  e.target.removeEventListener('click', closePoUpSlider);\n  if (popup_sliderControlPanel.classList.contains('next-function-slider__control-panel--off')) {\n    popup_sliderControlPanel.classList.toggle('next-function-slider__control-panel--off');\n  }\n}\n\nfunction openPoUpSlider(e) {\n  let elem = e.target;\n  while (elem.tagName.toLowerCase() !== 'li') {\n    elem = elem.parentElement;\n  }\n  const typeSlider = [...elem.classList].join().replace(/\\D+popup-slider--/, '');\n  switch (typeSlider) {\n    case 'temp':\n      slider_0.addTempSlider(elem);\n      break;\n    case 'light':\n      slider_0.addLightSlider(elem);\n      break;\n    case 'floor':\n      slider_0.addFloorSlider(elem);\n      popup_sliderControlPanel.classList.toggle('next-function-slider__control-panel--off');\n      break;\n    default:\n      slider_0.addDefaultInfo();\n  }\n  popUp.style.transformOrigin = `${util.getCenterXElemPos(elem)}px ${util.getCenterYElemPos(elem)}px`;\n  popUp.classList.toggle('popup--off');\n  footer.classList.toggle('page-footer--off');\n  btnCls.addEventListener('click', closePoUpSlider);\n}\n\nfunction enterOpenPoUpSlider(e) {\n  if (e.keyCode === util.ENTER_KEY_CODE) {\n    openPoUpSlider(e);\n  }\n}\n\n/* harmony default export */ var popup = ({\n  openPoUpSlider,\n  enterOpenPoUpSlider\n});\n// CONCATENATED MODULE: ./index.js\n\n\n\n\nconst mainMenu = document.querySelector('[for=\"burger_menu\"]');\nconst menuControl = document.getElementById('burger_menu');\nconst devicesMenu = document.querySelector('[for=\"all_devices\"]');\nconst devicesMenuControl = document.getElementById('all_devices');\nconst popUpSlider = document.querySelectorAll('.popup-slider');\nconst verticalArrow = document.querySelector('.next-scenarios-slider__control');\nconst verticalSlides = document.querySelectorAll('.next-scenarios-slider__item--vertical');\nconst gridControl = document.querySelector('.feautured-scenarios__grid-controls');\nconst index_leftArrow = gridControl.querySelector('.feautured-scenarios__grid-control--left');\nconst index_rightArrow = gridControl.querySelector('.feautured-scenarios__grid-control--right');\nconst index_gridSlides = document.querySelectorAll('.next-scenarios-slider__item--grid');\nconst index_gridSlidesLength = index_gridSlides.length;\n\naddEventKeyOnMenu(mainMenu, menuControl);\naddEventKeyOnMenu(devicesMenu, devicesMenuControl);\n[...popUpSlider].forEach(it => {\n  it.addEventListener('click', popup.openPoUpSlider);\n  it.addEventListener('keydown', popup.enterOpenPoUpSlider);\n});\n\nfunction addEventKeyOnMenu(label, input, keyCode = util.ENTER_KEY_CODE) {\n  label.addEventListener('keydown', e => {\n    if (e.keyCode === keyCode) {\n      input.checked = !input.checked;\n    }\n  });\n}\n\nif (verticalSlides.length > 2) {\n  verticalArrow.classList.toggle('next-scenarios-slider__control--off');\n  verticalArrow.addEventListener('click', slider_0.browseMainScenarios);\n}\n\nif (index_gridSlidesLength > 9) {\n  slider_0.distributeGridSlides();\n  gridControl.classList.toggle('feautured-scenarios__grid-controls--off');\n  const sliders = document.querySelectorAll('.next-scenarios-slider__items--grid-off');\n  sliders[0].classList.toggle('next-scenarios-slider__items--grid-off');\n  sliders[0].classList.toggle('next-scenarios-slider__items--grid-current');\n  index_leftArrow.classList.toggle('feautured-scenarios__grid-control--off');\n  index_rightArrow.addEventListener('click', slider_0.browseFavoriteScenarios);\n  index_leftArrow.addEventListener('click', slider_0.browseFavoriteScenarios);\n}\n\n//# sourceURL=webpack:///./index.js_+_3_modules?")}]);