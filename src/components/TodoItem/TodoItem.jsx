import { useState, useRef, useEffect } from "react";
import pensill from "../../assets/images/pensill.svg";
import plusLarge from "../../assets/images/plusLarge.svg";
import check from "../../assets/images/check.svg";

export default function TodoItem({
	todo,
	submitTaskForm,
	setIsOpenFormAddTask,
	isOpenFormAddTask,
	isError,
}) {
	const [todoName, setTodoName] = useState(todo.name);
	const [isEditable, setIsEditable] = useState(false);
	const [isErrorInput, setIsErrorInput] = useState(false);

	const inputRef = useRef(null);

	useEffect(() => {
		if (isEditable) inputRef.current?.focus();
	}, [isEditable]);

	const handleNameChange = (e) => setTodoName(e.target.value);
	const handleBlur = () => handleNameSubmit();
	const handleKeyDown = (e) => {
		if (e.key === "Enter") handleNameSubmit();
	};

	return (
		<ul className="todo" key={todo.id}>
			<div className="todo-title">
				<div>
					<input
						type="text"
						ref={inputRef}
						maxLength="45"
						value={todoName}
						onChange={handleNameChange}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						style={{
							color: todo.color,
							width: `${todoName.length + 1}ch`,
							border: isEditable ? "1px solid #fff" : "none",
							pointerEvents: isEditable ? "auto" : "none",
						}}
					/>
					<img src={pensill} alt="" onClick={() => setIsEditable(true)} />
				</div>
				{isErrorInput && (
					<p className="error" style={{ margin: "25px 0px" }}>
						Назва має містити тільки літери
					</p>
				)}
			</div>

			{Array.isArray(todo.tasks) &&
				todo.tasks.length &&
				todo.tasks.map((task) => (
					<li key={task.id} className="todo-item">
						<div
							className="todo-circle"
							onClick={() => checkTask(task.id, todo.id)}
							style={{
								background: task.isCompleted
									? "green"
									: task.isActive
									? "gray"
									: "none",
							}}
						>
							{task.isActive && <img src={check} alt="" />}
						</div>
						{task.name}
					</li>
				))}

			<button
				className="btn add-todo"
				onClick={() => setIsOpenFormAddTask(todo.id)}
			>
				<img src={plusLarge} alt="" /> Нова Задача
			</button>

			{isOpenFormAddTask === todo.id && (
				<form
					className="form-add-task"
					onSubmit={(e) => submitTaskForm(e, todo.id)}
				>
					<input
						type="text"
						maxLength="45"
						placeholder="Текст Задачі"
						id="name"
					/>
					{isError && <p className="error">Назва має містити тільки літери</p>}
					<div className="btns-form">
						<button className="btn">Додати Задачу</button>
						<button
							className="btn cancel"
							onClick={() => setIsOpenFormAddTask(false)}
						>
							Відміна
						</button>
					</div>
				</form>
			)}
		</ul>
	);

	function checkTask(taskId, todoId) {
		const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];

		const updatedTodos = existingTodos.map((todo) => {
			if (todo.id === todoId) {
				const updatedTasks = todo.tasks.map((task) => {
					if (task.id === taskId) {
						if (!task.isActive) {
							return { ...task, isActive: true };
						} else {
							return { ...task, isCompleted: true };
						}
					}
					return task;
				});

				return { ...todo, tasks: updatedTasks };
			}
			return todo;
		});

		localStorage.setItem("todos", JSON.stringify(updatedTodos));
	}
	function handleNameSubmit() {
		const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
		const taskName = todoName.trim();
		const nameRegex =
			/^(?!.* {2})[a-zA-Zа-яА-ЯіїєІЇЄ]+( [a-zA-Zа-яА-ЯіїєІЇЄ]+)*$/;

		if (!taskName || !nameRegex.test(taskName)) {
			setIsErrorInput(true);
			return;
		} else {
			setIsErrorInput(false);
		}
		const updatedTodos = existingTodos.map((item) => {
			if (item.id === todo.id) {
				return { ...item, name: todoName };
			}
			return item;
		});
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
		setIsEditable(false);
	}
}
