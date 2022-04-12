import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {Todo} from "../../model";
import './index.css';
import TodosColumn from "../TodosColumn";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Todos: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
            destination.index === source.index)
        ) {
            return;
        }

        let add;
        let active = todos;
        let completed = completedTodos;
        // Source Logic
        if (source.droppableId === "TodoList") {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = completed[source.index];
            completed.splice(source.index, 1);
        }

        // Destination Logic
        if (destination.droppableId === "TodoList") {
            active.splice(destination.index, 0, {...add, isDone: false});
        } else {
            completed.splice(destination.index, 0, {...add, isDone: true});
        }


        setCompletedTodos(completed);
        setTodos(active);
    };

    const handleDone = (actualTodo: Todo) => {
        if (actualTodo.isDone){
            // if todo is completed should remove from completed and add to todos
            let active = todos
            setCompletedTodos(completedTodos.filter(todo => todo.id !== actualTodo.id))
            active.push({...actualTodo, isDone: false})
            setTodos(active)
        }
        else {
            // if todo is active should remove from todos and added to completed todos
            let completed = completedTodos
            setTodos(todos.filter(todo => todo.id !== actualTodo.id))
            completed.push({...actualTodo, isDone: true})
            setCompletedTodos(completed)
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd} >
            <div className="todos">
                <TodosColumn
                    todos={todos}
                    setTodos={setTodos}
                    type="active"
                    title="Active Tasks"
                    droppableId="TodoList"
                    handleDone={handleDone}
                />
                <TodosColumn
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
                    type="completed"
                    title="Completed Tasks"
                    droppableId="TodoListComplete"
                    handleDone={handleDone}
                />
            </div>
        </DragDropContext>

    )
}

export default Todos