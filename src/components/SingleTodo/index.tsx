import React, {useEffect, useRef, useState} from "react";
import {Todo} from "../../model";
import './index.css';
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {Draggable} from "react-beautiful-dnd";

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    handleDone: (todo: Todo) => void;
}

const SingleTodo = ({index, todo, todos, setTodos, handleDone}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        setTodos(
            todos.map(todo => (todo.id === id ? {...todo, todo: editTodo} : todo))
        )
        setEdit(false)
    }

    const isTodoDone = todo.isDone ?
        (<s className="single-todo--text">{todo.todo}</s>)
        : (<span className="single-todo--text">{todo.todo}</span>)

    const isTodoEditable = !edit && !todo.isDone

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form
                        className="single-todo"
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit ? (
                                <input
                                    ref={inputRef}
                                    value={editTodo}
                                    onChange={(e) => setEditTodo(e.target.value)}
                                    className="single-todo--text"
                                />
                            ) : isTodoDone
                        }
                        <div>
                        <span className="single-todo--icon" onClick={(e) => isTodoEditable && setEdit(!edit)}>
                            <AiFillEdit/>
                        </span>
                            <span className="single-todo--icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete/>
                        </span>
                            <span className="single-todo--icon" onClick={() => !edit && handleDone(todo)}>
                            <MdDone/>
                        </span>
                        </div>
                    </form>
                )
            }
        </Draggable>

    )
}

export default SingleTodo