import React from "react";
import deleteIcon from "../../../assets/images/delete.svg";

export default function TodoListItem({
	todo,
	index,
	activeTodoId,
	setActiveTodoId,
	deleteTodo,
}) {
	return (
		<li
			key={index}
			onClick={() => setActiveTodoId(todo.id)}
			className={activeTodoId === todo.id ? "active" : ""}
		>
			<div>
				<div>
					<div className="todo-dot" style={{ "--dot-color": todo.color }}></div>
					<p>{todo.name}</p>
				</div>
				{activeTodoId === todo.id && (
					<img src={deleteIcon} onClick={() => deleteTodo(todo.id)} alt="" />
				)}
			</div>
		</li>
	);
}
