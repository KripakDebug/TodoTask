import React from "react";
import "./TaskBar.scss";
import TodoDetails from "../TodoDetails/TodoDetails";
import useTodosStore from "../../hooks/todosStore/useTodosStore.js";
import {useParams} from "react-router-dom";

export default function TaskBar() {
	const params = useParams();
	const todos = useTodosStore();
	const activeTodoId = params.activeTodoId;

	const filteredTodos = React.useMemo(() => {
		if (!activeTodoId) return todos;
		return todos.filter((todo) => todo.id === activeTodoId);
	}, [activeTodoId, todos]);

	return (
		<>
			<div className="wrapper-todos">
				{filteredTodos?.map((todo) => (
					<TodoDetails key={todo.id} todo={todo} />
				))}
			</div>

			{!filteredTodos.length && (
				<div className="task-bar">
					<div className="text-static">Завдання відсутні</div>
				</div>
			)}
		</>
	);
}
