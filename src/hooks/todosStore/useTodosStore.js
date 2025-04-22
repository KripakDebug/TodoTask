import { useSyncExternalStore } from 'react';
import { subscribe, getTodos } from './todosStore.js';

export default function useTodosStore() {
    return useSyncExternalStore(subscribe, getTodos);
}