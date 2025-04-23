import CheckIcon from "../../../assets/images/check.svg";
import './todoTaskCircle.scss'
import {updateTodoTask} from "../../../hooks/todosStore/todosStore.js";

export default function TodoTaskCircle({ todoId, task }) {
    return (
        <div
            className="todo-task-circle"
            onClick={() => updateTodoTask(todoId, task.id)}
            style={{ background: task.isCompleted ? "green" : task.isActive ? "gray" : "none" }}
        >
            {task.isActive && <img src={CheckIcon} alt="" />}
        </div>
    );
};