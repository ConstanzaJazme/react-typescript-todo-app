import React from "react";
import {Todo} from "../../model";
import SingleTodo from "../SingleTodo";
import './index.css';
import {Droppable} from "react-beautiful-dnd";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    type: string;
    title: string;
    droppableId: string;
    handleDone: (todo: Todo) => void;
}

const TodosColumn: React.FC<Props> = ({ todos, setTodos, type, title, droppableId, handleDone }: Props) => {
    return (
        <Droppable droppableId={droppableId} >
            {
                (provided, snapshot) => (
                    <div
                        className={`todos-column${type === "completed" ? " todos-column--completed": ""} todos-column${snapshot.isDraggingOver ? `--drag-${type}`: ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <div className="todos-column__header"> {title} </div>
                        {
                            todos.map((todo, index) =>
                                <SingleTodo
                                    index={index}
                                    todo={todo}
                                    key={todo.id}
                                    todos={todos}
                                    setTodos={setTodos}
                                    handleDone={handleDone}
                                />
                            )
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>

    )
}

export default TodosColumn