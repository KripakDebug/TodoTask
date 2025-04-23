import React, { useState } from "react";
import "./SideBar.scss";
import alltodo from "../../assets/images/alltodo.svg";
import plus from "../../assets/images/plus.svg";
import useTodosStore from "../../hooks/todosStore/useTodosStore.js";
import { addTodo, deleteTodo } from "../../hooks/todosStore/todosStore.js";
import PopupAddTodo from "./PopupAddTodo/PopupAddTodo.jsx";
import TodoListItem from "./TodoListItem/TodoListItem.jsx";

export default function SideBar({ activeTodoId, setActiveTodoId }) {
	const [isOpenPopup, setisOpenPopup] = useState(false);
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
					<TodoListItem
						todo={todo}
						index={index}
						deleteTodo={deleteTodo}
						activeTodoId={activeTodoId}
						setActiveTodoId={setActiveTodoId}
					/>
				))}
			</ul>

			<button className="btn add-todo" onClick={() => setisOpenPopup(true)}>
				<img src={plus} alt="" /> Додати папку
			</button>
			{isOpenPopup && (
				<PopupAddTodo addTodo={addTodo} setisOpenPopup={setisOpenPopup} />
			)}
		</div>
	);
}
