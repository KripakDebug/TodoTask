import { addTaskToList } from "../../hooks/todosStore/todosStore.js";
import { useState } from "react";

export default function AddTaskForm({ todoId, onCloseForm }) {
	const [isErrorForm, setIsErrorForm] = useState(false);
	return (
		<form
			className="form-add-task"
			onSubmit={(e) => {
				e.preventDefault();
				if (!e.target.name.value.trim()) {
					setIsErrorForm(true);
					return;
				}
				addTaskToList(todoId, e.target.name.value);
				onCloseForm();
			}}
		>
			<input type="text" maxLength="45" placeholder="Текст Задачі" id="name" />
			{isErrorForm && <p className="error">Назва має містити тільки літери</p>}
			<div className="btns-form">
				<button type="submit" className="btn">
					Додати Задачу
				</button>
				<button type="button" className="btn cancel" onClick={onCloseForm}>
					Відміна
				</button>
			</div>
		</form>
	);
}
