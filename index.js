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
	const saved = localStorage.getItem('tasks');
	return saved ? JSON.parse(saved) : items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	// Удаление задачи
	deleteButton.addEventListener("click", () => {
		clone.remove();
		saveTasks();
	});

	// Дублирование задачи
	duplicateButton.addEventListener("click", () => {
		const newTask = createItem(textElement.textContent);
		clone.after(newTask);
		saveTasks();
	});

	// Редактирование задачи
	editButton.addEventListener("click", () => {
		const newText = prompt("Измените задачу:", textElement.textContent);
		if (newText !== null && newText.trim() !== "") {
			textElement.textContent = newText;
			saveTasks();
		}
	});

	return clone;
}

function getTasksFromDOM() {
	const nodes = listElement.querySelectorAll(".to-do__item-text");
	return Array.from(nodes).map((node) => node.textContent);
}

function saveTasks() {
	const tasks = getTasksFromDOM();
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

formElement.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const taskText = inputElement.value;

	if (taskText.trim() !== "") {
		const newTaskElement = createItem(taskText);
		listElement.prepend(newTaskElement);
		formElement.reset();
		saveTasks();
	}
});

const initialTasks = loadTasks();
initialTasks.forEach((item) => {
	const taskElement = createItem(item);
	listElement.append(taskElement);
});
