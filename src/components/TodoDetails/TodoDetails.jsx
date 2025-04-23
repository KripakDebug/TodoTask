import PlusLargeIcon from "../../assets/images/plusLarge.svg";
import TodoSectionTitle from "./TodoSectionTitle/TodoSectionTitle.jsx";
import TodoTaskCircle from "./TodoTaskCircle/TodoTaskCircle.jsx";
import { useState } from "react";
import AddTaskForm from "./AddTaskForm.jsx";
import { deleteTask } from "../../hooks/todosStore/todosStore.js";
import deleteIcon from "../../assets/images/delete.svg";

export default function TodoDetails({ todo }) {
	const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);

	return (
		<ul className="todo">
			<TodoSectionTitle todo={todo} />
			{todo.tasks?.map((task) => (
				<li
					key={task.id}
					className={
						task.isCompleted ? "todo-task-item cross" : "todo-task-item"
					}
				>
					<TodoTaskCircle todoId={todo.id} task={task} />
					{task.name}
					<img
						className="delete-task"
						onClick={() => deleteTask(todo.id, task.id)}
						src={deleteIcon}
						alt=""
					/>
				</li>
			))}

			<button
				className="btn add-todo"
				onClick={() => setIsAddTaskFormOpen(true)}
			>
				<img src={PlusLargeIcon} alt="" /> Нова Задача
			</button>

			{isAddTaskFormOpen && (
				<AddTaskForm
					todoId={todo.id}
					onCloseForm={() => setIsAddTaskFormOpen(false)}
				/>
			)}
		</ul>
	);
}
