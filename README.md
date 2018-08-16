# Задание на вёрстку

1. Для отображения popup с регулировкой яркости ламп или теплого пола добавляется модификатор к классу **popup-slider**,
*  --light
*  --temp

2. Для отображения popup с регулировкой термостата добавляется модификатор к классу **popup-slider**,
- --floor
По умолчанию минимальное значение  **+5**,максимальное **+25**.Значения взяты из документации по термостатам и из соображений,что раз шкала на макете заполнена практически полностью при +23,значит скорее всего термостат для плитки,а это диапозон +5 до +25.
По логике подошел только один элемент в разделе "Избранные сценарии": "Сделать пол теплым" во всей квартире.
Это пояснение забавно тем,что для сценария: "Я ухожу" выбрал рандомно класс --light,это наверное бытовой опыт=)).

3. Классы **kitchen/hall/bulb/cam** распределены рандомно для наглядности работы меню,работает через checked.

4.scroll работает нативно,кроме блока избранные сценарии(версия desktop),но там требовалась анимация.



