import {
	createTaskEntity,
	createTodoEntity,
	resolveTaskCompletion,
} from "./todosStore.services.js";
export const STORAGE_KEY = "todos";

let cachedTodos = null;
let listeners = new Set();

export function getTodos() {
	if (cachedTodos === null) _updateCache();
	return cachedTodos;
}

export function addTodo(name, color) {
	const todoList = _getTodosFromStorage();
	_setTodosToStorage([...todoList, createTodoEntity(name, color)]);
}

export function deleteTodo(id) {
	const todoList = _getTodosFromStorage();
	_setTodosToStorage(todoList.filter((todoListItem) => todoListItem.id !== id));
}

export function addTaskToList(listId, taskName) {
	const todoList = _getTodosFromStorage();

	const updatedTodoList = todoList.map((todoItem) => {
		if (todoItem.id !== listId) return todoItem;
		return {
			...todoItem,
			tasks: [...todoItem.tasks, createTaskEntity(taskName)],
		};
	});

	_setTodosToStorage(updatedTodoList);
}

export function updateTodoName(id, name) {
	const todoList = _getTodosFromStorage();

	_setTodosToStorage(
		todoList.map((todoListItem) => {
			if (todoListItem.id !== id) return todoListItem;
			return { ...todoListItem, name };
		})
	);
}

export function updateTodoTask(todoId, taskId) {
	const todoList = _getTodosFromStorage();

	_setTodosToStorage(
		todoList.map((todoListItem) => {
			if (todoListItem.id !== todoId) return todoListItem;
			const updatedTasks = todoListItem.tasks.map((task) => {
				if (task.id !== taskId) return task;
				return resolveTaskCompletion(task);
			});

			return { ...todoListItem, tasks: updatedTasks };
		})
	);
}

export function deleteTask(todoId, taskId) {
	const todoList = _getTodosFromStorage();

	_setTodosToStorage(
		todoList.map((todoListItem) => {
			if (todoListItem.id !== todoId) return todoListItem;
			const updatedTasks = todoListItem.tasks.filter(
				(taskListItem) => taskListItem.id !== taskId
			);

			return { ...todoListItem, tasks: updatedTasks };
		})
	);
}

export function subscribe(callback) {
	listeners.add(callback);

	const storageListener = (e) => {
		if (e.key === STORAGE_KEY) _emitChange();
	};
	window.addEventListener("storage", storageListener);

	return () => {
		listeners.delete(callback);
		window.removeEventListener("storage", storageListener);
	};
}

function _getTodosFromStorage() {
	try {
		return JSON.parse(localStorage.getItem("todos") || "[]");
	} catch {
		return [];
	}
}

function _updateCache() {
	cachedTodos = _getTodosFromStorage();
}

function _setTodosToStorage(newTodos) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
	_emitChange();
}

function _emitChange() {
	_updateCache();
	listeners.forEach((listener) => listener());
}
