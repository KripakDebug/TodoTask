import React, { useState } from "react";
import "./SideBar.scss";
import alltodo from "../../assets/images/alltodo.svg";
import plus from "../../assets/images/plus.svg";
import useTodosStore from "../../hooks/todosStore/useTodosStore.js";
import PopupAddTodo from "./PopupAddTodo/PopupAddTodo.jsx";
import TodoListItem from "./TodoListItem/TodoListItem.jsx";
import {useNavigate, useParams} from "react-router-dom";

export default function SideBar() {
	const [isOpenPopup, setIsOpenPopup] = useState(false);
	const todos = useTodosStore();
	const navigate = useNavigate();
	const params = useParams();

	const activeTodoId = params.activeTodoId;

	return (
		<div className="side-bar">
			<button
				onClick={() => navigate('/')}
				className={!activeTodoId ? "btn active" : "btn"}
			>
				<img src={alltodo} alt="" /> Усі завдання
			</button>

			<ul className="todo-list">
				{todos.map((todo) => (
					<TodoListItem todo={todo} key={todo.id} />
				))}
			</ul>

			<button className="btn add-todo" onClick={() => setIsOpenPopup(true)}>
				<img src={plus} alt="" /> Додати папку
			</button>
			{isOpenPopup && (
				<PopupAddTodo setIsOpenPopup={setIsOpenPopup} />
			)}
		</div>
	);
}
