import React  from 'react';
import './todoSectionTitle.scss'
import PencilIcon from '../../../assets/images/pensill.svg';
import useInput from "../../../hooks/useInput.js";
import {updateTodoName} from "../../../hooks/todosStore/todosStore.js";

export default function TodoSectionTitle({ todo }) {
    const [isEditable, setIsEditable] = React.useState(false);
    const [isErrorInput, setIsErrorInput] = React.useState(false);
    const inputState = useInput(todo.name, {
        onBlur: () => onUpdateSectionTitleName(),
        onKeyDown: (e) => e.key === 'Enter' && onUpdateSectionTitleName()
    });
    
    React.useEffect(() => {
        if (isEditable) inputState.ref.current?.focus();
    }, [inputState.ref, isEditable]);

    return (
        <div className="todo-section-title">
				<div>
					<input {...inputState} maxLength="45"
						style={{
							color: todo.color,
							width: `${todo.name.length + 1}ch`,
							border: isEditable ? "1px solid #fff" : "none",
							pointerEvents: isEditable ? "auto" : "none",
						}}
					/>
					<img src={PencilIcon} alt="" onClick={() => setIsEditable(true)} />
				</div>
				{isErrorInput && (
					<p className="error" style={{ margin: "25px 0px" }}>
						Назва має містити тільки літери
					</p>
				)}
			</div>
    );

    function onUpdateSectionTitleName() {
        const newTitle = inputState.value.trim();
        if (!newTitle) return setIsErrorInput(true);

        updateTodoName(todo.id, newTitle)

        setIsEditable(false);
        setIsErrorInput(false);
    }
};