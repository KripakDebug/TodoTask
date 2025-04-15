import { useState } from "react";
import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import TaskBar from "./components/TaskBar/TaskBar";
function App() {
	const [activeTodo, setActiveTodo] = useState("");
	const [formPush, setFormPush] = useState(false);
	return (
		<div className="wrapper">
			<SideBar
				activeTodo={activeTodo}
				setActiveTodo={setActiveTodo}
				setFormPush={setFormPush}
			/>
			<TaskBar
				activeTodo={activeTodo}
				formPush={formPush}
				setFormPush={setFormPush}
			/>
		</div>
	);
}

export default App;
