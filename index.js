let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  // Проверяем, есть ли сохраненные задачи в локальном хранилище
  const savedTasks = localStorage.getItem('todoTasks');
  
  if (savedTasks) {
    // Если есть, возвращаем их, преобразуя из JSON строки
    return JSON.parse(savedTasks);
  } else {
    // Если нет, возвращаем начальный массив
    return items;
  }
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  // Устанавливаем текст задачи в элемент
  textElement.textContent = item;
  
  // Добавляем обработчик для кнопки удаления
  deleteButton.addEventListener('click', function() {
    // Удаляем текущий элемент задачи
    clone.remove();
    
    // Получаем текущий список задач из DOM
    const currentTasks = getTasksFromDOM();
    
    // Сохраняем обновленный список задач в локальное хранилище
    saveTasks(currentTasks);
  });
  
  // Добавляем обработчик для кнопки копирования
  duplicateButton.addEventListener('click', function() {
    // Получаем текст текущей задачи
    const itemName = textElement.textContent;
    
    // Создаем копию задачи
    const newItem = createItem(itemName);
    
    // Добавляем копию в начало списка
    listElement.prepend(newItem);
    
    // Получаем текущий список задач из DOM
    const currentTasks = getTasksFromDOM();
    
    // Сохраняем обновленный список задач в локальное хранилище
    saveTasks(currentTasks);
  });
  
  // Возвращаем готовую разметку
  return clone;
}

function getTasksFromDOM() {
  // Находим все элементы с текстом задач
  const itemsNamesElements = listElement.querySelectorAll('.to-do__item-text');
  
  // Создаем пустой массив для хранения задач
  const tasks = [];
  
  // Проходимся по всем элементам и собираем текст задач
  itemsNamesElements.forEach((element) => {
    tasks.push(element.textContent);
  });
  
  // Возвращаем массив задач
  return tasks;
}

function saveTasks(tasks) {
  // Сохраняем массив задач в локальное хранилище
  // Преобразуем массив в JSON строку
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// Переопределяем переменную items результатом выполнения loadTasks
items = loadTasks();

// Для каждой задачи создаем элемент и добавляем в список
items.forEach((item) => {
  const newItem = createItem(item);
  listElement.append(newItem);
});

// Обработчик отправки формы
formElement.addEventListener('submit', function(event) {
  // Отключаем перезагрузку страницы
  event.preventDefault();
  
  // Получаем текст задачи из поля ввода и убираем лишние пробелы
  const taskText = inputElement.value.trim();
  
  // Проверяем, что поле не пустое
  if (taskText === '') {
    return;
  }
  
  // Создаем новую задачу
  const newItem = createItem(taskText);
  
  // Добавляем задачу в начало списка
  listElement.prepend(newItem);
  
  // Обновляем переменную items текущим списком задач из DOM
  items = getTasksFromDOM();
  
  // Сохраняем обновленный список задач в локальное хранилище
  saveTasks(items);
  
  // Очищаем поле ввода
  inputElement.value = '';
});
