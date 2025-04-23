export function createTaskEntity(name) {
    return {
        id: crypto.randomUUID(),
        name,
        completed: false,
        isActive: false,
        createdAt: new Date().toISOString(),
    };
}

export const createTodoEntity = (name, color) => ({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    color,
    tasks: []
});


export const resolveTaskCompletion = (task) => {
    if (!task.isActive) return { ...task, isActive: true };
    return { ...task, isCompleted: true };
};