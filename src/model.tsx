import React from "react";

export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;
}

export interface Todos {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface CompletedTodos {
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}