import React, { useState } from "react";
import exit from "../../../assets/images/exit.svg";
import {addTodo} from "../../../hooks/todosStore/todosStore.js";

export default function PopupAddTodo({ setIsOpenPopup }) {
	const [isErrorPopup, setIsErrorPopup] = useState(false);
	return (
		<div className="popup">
			<div
				className="exit"
				onClick={() => {
					setIsOpenPopup(false), setIsErrorPopup(false);
				}}
			>
				<img src={exit} alt="" />
			</div>
			<form
				className="form-add-todo"
				onSubmit={(e) => {
					e.preventDefault();
					const form = e.target;
					const name = form.name.value.trim();
					const color = form.color.value;

					if (!name) {
						setIsErrorPopup(true);
						return;
					} else {
						setIsErrorPopup(false);
					}

					addTodo(name, color);

					form.reset();
					setIsOpenPopup(false);
				}}
			>
				<input type="text" id="name" maxLength="45" placeholder="Назва папки" />
				<input type="color" id="color" />
				{isErrorPopup && (
					<p className="error">Назва має містити тільки літери</p>
				)}
				<button type="submit" className="btn-popup">
					Додати
				</button>
			</form>
		</div>
	);
}
