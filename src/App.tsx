import React, {useContext, useState} from 'react';
import './App.css';
import {Todo} from "./model";
import Input from "./components/Input";
import Todos from "./components/Todos";
import {TodosContext} from "./context";

const App: React.FC = () => {
    const { todos, setTodos } = useContext(TodosContext)
    const [todo, setTodo] = useState<string>("")
    const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        if (todo) {
            setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}])
            setTodo("")
        }
    };

    return (
        <div className="app">
            <span className="app__header">Taskify</span>
                <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
                <Todos
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
            />
        </div>
    );
}

export default App;
