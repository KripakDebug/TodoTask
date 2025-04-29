import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
	useParams,
} from "react-router-dom";
import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import TaskBar from "./components/TaskBar/TaskBar";
import { ALL_VISIBLE_LISTS } from "./application.constants.js";

function AppContent() {
	const navigate = useNavigate();
	const { activeTodoId = ALL_VISIBLE_LISTS } = useParams();
	const [currentTodoId, setCurrentTodoId] = useState(ALL_VISIBLE_LISTS);

	const setActiveTodoId = (id) => {
		setCurrentTodoId(id);
		navigate(id === ALL_VISIBLE_LISTS ? "/all-todo" : `/${id}`);
	};

	useEffect(() => {
		if (activeTodoId !== currentTodoId) {
			navigate("/all-todo");
		}
	}, [activeTodoId, navigate]);

	return (
		<div className="application-container">
			<SideBar activeTodoId={activeTodoId} setActiveTodoId={setActiveTodoId} />
			<TaskBar activeTodoId={activeTodoId} />
		</div>
	);
}

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/all-todo" element={<AppContent />} />
				<Route path="/:activeTodoId" element={<AppContent />} />
				<Route path="*" element={<AppContent />} />
			</Routes>
		</Router>
	);
}

export default App;
