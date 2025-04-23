import React from "react";
import "./TaskBar.scss";
import TodoDetails from "../TodoDetails/TodoDetails";
import useTodosStore from "../../hooks/todosStore/useTodosStore.js";
import { ALL_VISIBLE_LISTS } from "../../application.constants.js";

export default function TaskBar({ activeTodoId }) {
	const todos = useTodosStore();

	const filteredTodos = React.useMemo(() => {
		if (activeTodoId === ALL_VISIBLE_LISTS) return todos;
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
