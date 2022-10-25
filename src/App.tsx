import React, {FC, useState} from 'react';
import './styles/App.scss';
import Header from "./components/Header/Header";
import AddTodos from "./components/AddTodos/AddTodos";
import {ITodo} from "./model";
import TodoList from "./components/TodoList/TodoList";

const App: FC = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([]);

    const handleSubmitTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo) {
            setTodos([...todos, {id: Date.now(), todo, isDone: false}])
            setTodo('');
        }
    }
    
  return (
    <div className="App">
        <Header/>
        <AddTodos todo={todo} setTodo={setTodo} handleSubmitTodo={handleSubmitTodo}/>
        <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
