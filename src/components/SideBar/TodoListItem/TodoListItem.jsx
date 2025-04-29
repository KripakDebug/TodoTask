import React from "react";
import deleteIcon from "../../../assets/images/delete.svg";
import {useNavigate, useParams} from "react-router-dom";
import {deleteTodo} from "../../../hooks/todosStore/todosStore.js";

export default function TodoListItem({ todo }) {
	const navigate = useNavigate();
	const params = useParams();
	const activeTodoId = params.activeTodoId;


	function onDeleteTodoHandler(e) {
		e.stopPropagation();
		deleteTodo(todo.id);
		navigate('/', { replace: true });
	}

	return (
		<li
			onClick={() => navigate(`/${todo.id}`)}
			className={activeTodoId === todo.id ? "active" : ""}
		>
			<div>
				<div>
					<div className="todo-dot" style={{ "--dot-color": todo.color }}></div>
					<p>{todo.name}</p>
				</div>
				{activeTodoId === todo.id && (
					<img src={deleteIcon} onClick={onDeleteTodoHandler} alt="" />
				)}
			</div>
		</li>
	);
}
