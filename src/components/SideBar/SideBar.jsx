import React, { useState } from "react";
import "./SideBar.scss";
import exit from "../../assets/images/exit.svg";
import alltodo from "../../assets/images/alltodo.svg";
import plus from "../../assets/images/plus.svg";
import deleteIcon from "../../assets/images/delete.svg";
import useTodosStore from "../../hooks/todosStore/useTodosStore.js";
import {addTodo, deleteTodo} from "../../hooks/todosStore/todosStore.js";

export default function SideBar({ activeTodoId, setActiveTodoId }) {
	// TODO: Rename to more consistent names
	const [isOpen, setisOpen] = useState(false);
	const [isError, setIsError] = useState(false);
	const todos = useTodosStore();

	return (
		<div className="side-bar">
			<button
				onClick={() => setActiveTodoId("all-todo")}
				className={activeTodoId === "all-todo" ? "btn active" : "btn"}
			>
				<img src={alltodo} alt="" /> Усі завдання
			</button>

			<ul className="todo-list">
				{todos.map((todo, index) => (
					<li
						key={index}
						onClick={() => setActiveTodoId(todo.id)}
						className={activeTodoId === todo.id ? "active" : ""}
					>
						<div>
							<div>
								<div
									className="todo-dot"
									style={{ "--dot-color": todo.color }}
								></div>
								<p>{todo.name}</p>
							</div>
							{activeTodoId === todo.id && (
								<img
									src={deleteIcon}
									onClick={() => deleteTodo(todo.id)}
									alt=""
								/>
							)}
						</div>
					</li>
				))}
			</ul>

			<button className="btn add-todo" onClick={() => setisOpen(true)}>
				<img src={plus} alt="" /> Додати папку
			</button>
			{isOpen && (
				<div className="popup">
					<div
						className="exit"
						onClick={() => {
							setisOpen(false), setIsError(false);
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
						<button type="submit"  className="btn-popup">Додати</button>
					</form>
				</div>
			)}
		</div>
	);

	function submitForm(e) {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value.trim();
		const color = form.color.value;

		if (!name){
			setIsError(true);
			return;
		} else {
			setIsError(false);
		}

		addTodo(name, color);

		form.reset();
		setisOpen(false);
	}
}
