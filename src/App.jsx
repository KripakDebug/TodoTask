import { useState } from "react";
import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import TaskBar from "./components/TaskBar/TaskBar";
function App() {
	const [activeTodo, setActiveTodo] = useState("all-todo");

	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem("todos")) || []
	);

	return (
		<div className="wrapper">
			<SideBar
				activeTodo={activeTodo}
				setActiveTodo={setActiveTodo}
				todos={todos}
			/>
			<TaskBar activeTodo={activeTodo} todos={todos} />
		</div>
	);
}

export default App;
