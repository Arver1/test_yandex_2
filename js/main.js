!function(e){var n={};function t(r){if(n[r])return n[r].exports;var l=n[r]={i:r,l:!1,exports:{}};return e[r].call(l.exports,l,l.exports,t),l.l=!0,l.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var l in e)t.d(r,l,function(n){return e[n]}.bind(null,l));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./util.js\nconst ENTER_KEY_CODE = 13;\n\nconst getCenterXElemPos = elem => {\n  if (!elem) return 0;\n  const coords = elem.getBoundingClientRect();\n  return (coords.left + coords.right) / 2;\n};\n\nconst getCenterYElemPos = elem => {\n  if (!elem) return 0;\n  const coords = elem.getBoundingClientRect();\n  return (coords.top + coords.bottom) / 2;\n};\n\n/* harmony default export */ var util = ({\n  ENTER_KEY_CODE,\n  getCenterXElemPos,\n  getCenterYElemPos\n});\n// CONCATENATED MODULE: ./slider.js\n\n\nconst sliderContainer = document.querySelector('.slider');\nconst sliderControlPanel = sliderContainer.querySelector('.next-function-slider__control-panel');\nconst sliderTitle = sliderContainer.querySelector('.slider__title');\nconst sliderDescription = sliderContainer.querySelector('.slider__description');\nconst slider = document.querySelector('.slider__item');\n\nconst controlBtnTemp = `\n<div class=\"next-function-slider__control-panel-wrapper\">\n<button class=\"next-function-slider__btn btn btn--size btn--color temperature-hand\">Вручную</button>\n<button class=\"next-function-slider__btn btn btn--size temperature-cold\">Холодно</button>\n<button class=\"next-function-slider__btn btn btn--size temperature-warm\">Тепло</button>\n</div>`;\n\nconst sliderTemp = `\n<div class=\"next-function-slider__range-wrapper\">\n<input class=\"next-function-slider__range\" type=\"range\" min=\"-10\" max=\"30\" step=\"1\">\n</div>`;\n\nfunction checkRepeatTextContent(elem, content) {\n  if (elem.textContent === content) {\n    return;\n  }\n  elem.textContent = content;\n}\n\nfunction addTempSlider(elem) {\n  const title = elem.querySelector('h3').textContent;\n  const description = elem.querySelector('p').textContent;\n  checkRepeatTextContent(sliderTitle, title);\n  checkRepeatTextContent(sliderDescription, description);\n  sliderControlPanel.innerHTML = controlBtnTemp;\n  slider.innerHTML = sliderTemp;\n  sliderControlPanel.addEventListener('click', controlTempSlider);\n  sliderControlPanel.addEventListener('keydown', controlEnterTempSlider);\n}\n\nfunction addDefaultInfo() {\n  const defaultTitle = 'Неизвестное устройство';\n  const defaultDescription = 'Статус не определен...';\n  checkRepeatTextContent(sliderTitle, defaultTitle);\n  checkRepeatTextContent(sliderDescription, defaultDescription);\n  sliderControlPanel.innerHTML = '';\n  slider.innerHTML = '';\n}\nfunction addLightSlider() {\n  const defaultTitle = 'Неизвестное устройство';\n  const defaultDescription = 'Статус не определен...';\n  checkRepeatTextContent(sliderTitle, defaultTitle);\n  checkRepeatTextContent(sliderDescription, defaultDescription);\n  sliderControlPanel.innerHTML = '';\n  slider.innerHTML = '';\n}\n\nfunction controlTempSlider(e) {\n  const typeAction = [...e.target.classList].join().replace(/\\D+temperature-/, '');\n  const tempSlider = sliderContainer.querySelector('.next-function-slider__range');\n  switch (typeAction) {\n    case 'cold':\n      setValueOnSlider(tempSlider, -10);\n      break;\n    case 'warm':\n      setValueOnSlider(tempSlider, 30);\n      break;\n    case 'hand':\n      tempSlider.disabled = false;\n      break;\n  }\n}\nfunction controlEnterTempSlider(e) {\n  if (e.keyCode === util.ENTER_KEY_CODE) controlTempSlider(e);\n}\n\nfunction setValueOnSlider(slider, value = 0) {\n  slider.value = value;\n  slider.disabled = true;\n}\n\n/* harmony default export */ var slider_0 = ({\n  addTempSlider,\n  addLightSlider,\n  addDefaultInfo\n  /*\n  const btnTempHand = document.querySelector('.temperature-hand');\n  const btnTempCold = document.querySelector('.temperature-cold');\n  const btnTempWarm = document.querySelector('.temperature-warm');\n  const tempSlider = document.querySelector('.temperature-slider__range');\n  \n  btnTempHand.addEventListener('click', (e) => {\n    tempSlider.disabled = false;\n  });\n  btnTempCold.addEventListener('click', (e) => {\n    setValueOnSlider(tempSlider, -10);\n  });\n  btnTempWarm.addEventListener('click', (e) => {\n    console.log('click');\n    setValueOnSlider(tempSlider, 30);\n  });\n  \n  function setValueOnSlider(slider, value = 0) {\n    slider.value = value;\n    slider.disabled = true;\n  }\n  \n  function disableSlider(slider) {\n    slider.disabled = false;\n  }\n  \n  */\n\n});\n// CONCATENATED MODULE: ./popup.js\n\n\n\nconst popUp = document.querySelector('.popup');\nconst btnCls = popUp.querySelector('.cls');\n\nfunction closePoUpSlider(e) {\n  popUp.classList.toggle('popup--off');\n  e.target.removeEventListener('click', closePoUpSlider);\n}\n\nfunction openPoUpSlider(e) {\n  const elem = e.target.tagName.toLowerCase() === 'li' ? e.target : e.target.parentElement;\n  const typeSlider = [...elem.classList].join().replace(/\\D+popup-slider--/, '');\n  switch (typeSlider) {\n    case 'temp':\n      slider_0.addTempSlider(elem);\n      break;\n    case 'light':\n      slider_0.addLightSlider(elem);\n      break;\n    default:\n      slider_0.addDefaultInfo();\n  }\n  popUp.style.transformOrigin = `${util.getCenterXElemPos(elem)}px ${util.getCenterYElemPos(elem)}px`;\n  popUp.classList.toggle('popup--off');\n  btnCls.addEventListener('click', closePoUpSlider);\n}\n\nfunction enterOpenPoUpSlider(e) {\n  if (e.keyCode === util.ENTER_KEY_CODE) {\n    openPoUpSlider(e);\n  }\n}\n\n/* harmony default export */ var popup = ({\n  openPoUpSlider,\n  enterOpenPoUpSlider\n});\n// CONCATENATED MODULE: ./index.js\n\n\n//import { addSlider } from './slider';\n\nconst mainMenu = document.querySelector('[for=\"burger_menu\"]');\nconst menuControl = document.getElementById('burger_menu');\nconst devicesMenu = document.querySelector('[for=\"all_devices\"]');\nconst devicesMenuControl = document.getElementById('all_devices');\nconst popUpSlider = document.querySelectorAll('.popup-slider');\n\naddEventKeyOnMenu(mainMenu, menuControl);\naddEventKeyOnMenu(devicesMenu, devicesMenuControl);\n[...popUpSlider].forEach(it => {\n  it.addEventListener('click', popup.openPoUpSlider);\n  it.addEventListener('keydown', popup.enterOpenPoUpSlider);\n});\n\nfunction addEventKeyOnMenu(label, input, keyCode = util.ENTER_KEY_CODE) {\n  label.addEventListener('keydown', e => {\n    if (e.keyCode === keyCode) {\n      input.checked = !input.checked;\n    }\n  });\n}\n\n/*\nfunction addEventOnBtnSlider(event, btn, slider) {\n  btn.addEventListener(event, () => {\n    setValueOnSlider(slider,)\n  });\n}*/\n/*\nconst sliderPanel = document.querySelector('.next-function-slider');\nconst controlPanel = sliderPanel.querySelector('.next-function-slider__wrapper');\n\nconst controlBtnTemp = `\n<button class=\"next-function-slider__item btn btn--size btn--color temperature-hand\">Вручную</button>\n<button class=\"next-function-slider__item btn btn--size temperature-cold\">Холодно</button>\n<button class=\"next-function-slider__item btn btn--size temperature-warm\">Тепло</button>`;\n\nconst sliderTemp = `\n<div class=\"temperature-slider__range-wrapper\">\n<input class=\"temperature-slider__range\" type=\"range\" min=\"-10\" max=\"30\" step=\"1\">\n</div>`;\n\nconst template = document.createElement('template');\ntemplate.innerHTML = controlBtnTemp;\ncontrolPanel.appendChild(template.content);\n*/\n\n//# sourceURL=webpack:///./index.js_+_3_modules?")}]);