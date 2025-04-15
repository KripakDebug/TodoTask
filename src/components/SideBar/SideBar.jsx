import React, { useState } from "react";
import "./SideBar.scss";
import exit from "../../assets/images/exit.svg";
import alltodo from "../../assets/images/alltodo.svg";
import plus from "../../assets/images/plus.svg";
import deleteIcon from "../../assets/images/delete.svg";

export default function SideBar({ activeTodo, setActiveTodo, setFormPush }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isError, setIsError] = useState(false);
	const todos = JSON.parse(localStorage.getItem("todos")) || [];

	return (
		<div className="side-bar">
			{todos.length >= 2 && (
				<button
					onClick={() => setActiveTodo("all-todo")}
					className={activeTodo === "all-todo" ? "btn active" : "btn"}
				>
					<img src={alltodo} alt="" /> Усі завдання
				</button>
			)}

			<ul className="todo-list">
				{todos.map((todo, index) => (
					<li
						key={index}
						onClick={() => setActiveTodo(todo.id)}
						className={activeTodo === todo.id ? "active" : ""}
					>
						<div>
							<div>
								<div
									className="todo-dot"
									style={{ "--dot-color": todo.color }}
								></div>
								<p>{todo.name}</p>
							</div>
							{activeTodo === todo.id && (
								<img
									src={deleteIcon}
									onClick={() => handleDeleteTodo(todo.id)}
									alt=""
								/>
							)}
						</div>
					</li>
				))}
			</ul>

			<button className="btn add-todo" onClick={() => setIsOpen(true)}>
				<img src={plus} alt="" /> Додати папку
			</button>
			{isOpen && (
				<div className="popup">
					<div
						className="exit"
						onClick={() => {
							setIsOpen(false), setIsError(false);
						}}
					>
						<img src={exit} alt="" />
					</div>
					<form className="form-add-todo" onSubmit={submitForm}>
						<input
							type="text"
							id="name"
							maxlength="45"
							placeholder="Назва папки"
						/>
						<input type="color" id="color" />
						{isError && (
							<p className="error">Назва має містити тільки літери</p>
						)}
						<button className="btn-popup">Додати</button>
					</form>
				</div>
			)}
		</div>
	);

	function handleDeleteTodo(todoId) {
		const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
		const updatedTodos = existingTodos.filter((item) => item.id !== todoId);

		localStorage.setItem("todos", JSON.stringify(updatedTodos));

		setFormPush(updatedTodos);
	}

	function submitForm(e) {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value.trim();
		const color = form.color.value;
		const nameRegex =
			/^(?!.* {2})[a-zA-Zа-яА-ЯіїєІЇЄ]+( [a-zA-Zа-яА-ЯіїєІЇЄ]+)*$/;

		if (!name || !nameRegex.test(name)) {
			setIsError(true);
			return;
		} else {
			setIsError(false);
		}
		const newTodo = {
			name,
			id: crypto.randomUUID(),
			color,
			createdAt: new Date().toISOString(),
		};
		const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
		existingTodos.push(newTodo);

		localStorage.setItem("todos", JSON.stringify(existingTodos));
		setFormPush(newTodo);
		form.reset();
		setIsOpen(false);
	}
}
