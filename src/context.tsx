import React, {createContext, useState} from "react";
import {CompletedTodos, Todo, Todos} from "./model";

const defaultState = {
    todos: [],
    setTodos: () => { },
}

export const TodosContext = createContext<Todos>(defaultState)
export const CompletedTodos = createContext<Todos>(defaultState)

export const TodosProvider: React.FC = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>(defaultState.todos)

    return(
        <TodosContext.Provider
            value={{
                todos,
                setTodos,
            }}
        >
            {children}
        </TodosContext.Provider>
    )
}

export const CompletedTodosProvider: React.FC = ({ children }) => {
    const [completedTodos, setCompletedTodos] = useState<CompletedTodos[]>(defaultState.todos)

    return(
        <CompletedTodos.Provider
            value={{
                completedTodos,
                setCompletedTodos,
            }}
        >
            {children}
        </CompletedTodos.Provider>
    )
}