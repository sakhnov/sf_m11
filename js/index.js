// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let priority = ["зеленый", "желтый", "фиолетовый", "розово-красный", "светло-коричневый"];


// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = '';

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    li = document.createElement('li');
    li.classList.add('fruit__item');
    if (fruits[i].color === 'фиолетовый') li.classList.add('fruit_violet');
    if (fruits[i].color === 'зеленый') li.classList.add('fruit_green');
    if (fruits[i].color === 'розово-красный') li.classList.add('fruit_carmazin');
    if (fruits[i].color === 'желтый') li.classList.add('fruit_yellow');
    if (fruits[i].color === 'светло-коричневый') li.classList.add('fruit_lightbrown');

    li.innerHTML = `
    <div class="fruit__info">
    <div>index: ${i}</div>
    <div>kind: ${fruits[i].kind}</div>
    <div>color: ${fruits[i].color}</div>
    <div>weight (кг): ${fruits[i].weight}</div>
  </div>
    `;
    fruitsList.appendChild(li);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const temparr = fruits.map((element) => element);
   // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    result.push(fruits.splice(getRandomInt(0,fruits.length-1),1)[0]);
  }
  if (JSON.stringify(temparr) == JSON.stringify(result)) { alert('Порядок не изменился!'); }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let minweight__input = document.querySelector('.minweight__input');
  let maxweight__input = document.querySelector('.maxweight__input');
  
  if (maxweight__input.value.length == 0) {
    max = fruits.reduce((acc, curr) => acc.weight > curr.weight ? acc : curr);
    maxweight__input.value = max['weight'];
  }    
  
  if (minweight__input.value.length == 0) {
    min = fruits.reduce((acc, curr) => acc.weight < curr.weight ? acc : curr);
    minweight__input.value = min['weight'];
  }
  
  let result = fruits.filter((item) => {
    return (item['weight'] >= minweight__input.value && item['weight'] <= maxweight__input.value);
  });

  fruits = result;
};

filterButton.addEventListener('click', () => {
 // fruits = JSON.parse(fruitsJSON);
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

//let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortKind = 'quickSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return priority.indexOf(a.color) > priority.indexOf(b.color) ? true : false;
};
const partition = (items, left, right, comparation) => {
  var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
  while (i <= j) {
      while (comparation(pivot, items[i])) {
          i++;
      }
      while (comparation(items[j], pivot)) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
};

const swap = (items, firstIndex, secondIndex) => {
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
};

const quick = (arr, left, right, comparation) => {
  var index;
  if (arr.length > 1) {
      left = typeof left != "number" ? 0 : left;
      right = typeof right != "number" ? arr.length - 1 : right;
      index = partition(arr, left, right, comparation);
      if (left < index - 1) {
          quick(arr, left, index - 1, comparation);
      }
      if (index < right) {
          quick(arr, index, right, comparation);
      }
  }
  return arr;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
   const n = arr.length;
   // внешняя итерация по элементам
   for (let i = 0; i < n-1; i++) { 
       // внутренняя итерация для перестановки элемента в конец массива
       for (let j = 0; j < n-1-i; j++) { 
           // сравниваем элементы
           if (comparation(arr[j], arr[j+1])) { 
               // делаем обмен элементов
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }
   }                    
   return arr;
  },

  quickSort(arr, comparation) {
    quick(arr, 0, arr.length - 1, comparation);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'quickSort') {
    sortKind = 'bubbleSort';
  } else {
    sortKind = 'quickSort';
  }
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';

  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value.length && colorInput.value.length && weightInput.value.length) {
    fruits.push({"kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value});
    kindInput.value = colorInput.value = weightInput.value = '';
  } else {
    alert ('Для добавления фрукта заполните все поля!');
  }
  display();
});
