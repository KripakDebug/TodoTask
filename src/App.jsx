import React from "react";
import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import TaskBar from "./components/TaskBar/TaskBar.jsx";
import {ALL_VISIBLE_LISTS} from "./application.constants.js";

function App() {
	const [activeTodoId, setActiveTodoId] = React.useState(ALL_VISIBLE_LISTS);
	return (
		<div className="application-container">
			<SideBar activeTodoId={activeTodoId} setActiveTodoId={setActiveTodoId} />
			<TaskBar activeTodoId={activeTodoId} />
		</div>
	);
}

export default App;
