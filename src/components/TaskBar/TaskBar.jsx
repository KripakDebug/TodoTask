import React, { useState } from "react";
import "./TaskBar.scss";
import TodoItem from "../TodoItem/TodoItem";

export default function TaskBar({ activeTodo, todos }) {

	const [isError, setIsError] = useState(false);
	const [isOpenFormAddTask, setIsOpenFormAddTask] = useState(false);

	const filteredTodos =
		activeTodo === "all-todo"
			? todos
			: todos.filter((todo) => todo.id === activeTodo);

	return (
		<>
			<div className="wrapper-todos">
				{filteredTodos.length > 0 &&
					filteredTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							todo={todo}
							submitTaskForm={submitTaskForm}
							setIsOpenFormAddTask={setIsOpenFormAddTask}
							isOpenFormAddTask={isOpenFormAddTask}
							isError={isError}
						/>
					))}
			</div>

			{filteredTodos.length === 0 && (
				<div className="task-bar">
					<div className="text-static">Завдання відсутні</div>
				</div>
			)}
		</>
	);

	function submitTaskForm(e, todoId) {
		e.preventDefault();

		const form = e.target;
		const taskName = form.name.value.trim();
		const nameRegex =
			/^(?!.* {2})[a-zA-Zа-яА-ЯіїєІЇЄ]+( [a-zA-Zа-яА-ЯіїєІЇЄ]+)*$/;

		if (!taskName || !nameRegex.test(taskName)) {
			setIsError(true);
			return;
		} else {
			setIsError(false);
		}

		const newTask = {
			id: crypto.randomUUID(),
			name: taskName,
			completed: false,
			isActive: false,
			createdAt: new Date().toISOString(),
		};

		const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

		const updatedTodos = existingTodos.map((todo) => {
			if (todo.id === todoId) {
				const updatedTasks = todo.tasks ? [...todo.tasks, newTask] : [newTask];
				return {
					...todo,
					tasks: updatedTasks,
				};
			}
			return todo;
		});

		localStorage.setItem("todos", JSON.stringify(updatedTodos));
		form.reset();
		setIsOpenFormAddTask(false);
	}
}
