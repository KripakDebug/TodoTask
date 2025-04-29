import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import "./App.scss";
import SideBar from "./components/SideBar/SideBar";
import TaskBar from "./components/TaskBar/TaskBar";

function AppContent() {
	return (
		<div className="application-container">
			<SideBar />
			<TaskBar />
		</div>
	);
}

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/:activeTodoId" element={<AppContent />} />
				<Route path="*" element={<AppContent />} />
			</Routes>
		</Router>
	);
}

export default App;
