import React, {FC, useState} from 'react';
import './styles/App.scss';
import Header from "./components/Header/Header";
import AddTodos from "./components/AddTodos/AddTodos";
import {ITodo} from "./model";
import TodoList from "./components/TodoList/TodoList";
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

const App: FC = () => {
    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);

    const handleSubmitTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (todo) {
            setTodos([...todos, {id: Date.now(), todo, isDone: false}])
            setTodo('');
        }
    }

    const handleDragEnd = (result: DropResult) => {
        const {source, destination} = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        let add;
        const active = todos;
        const complete = completedTodos;

        if (source.droppableId === 'TodosActive') {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        if (destination.droppableId === 'TodosActive') {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }

        setCompletedTodos(complete);
        setTodos(active);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="App">
                <Header/>
                <AddTodos todo={todo} setTodo={setTodo} handleSubmitTodo={handleSubmitTodo}/>
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                />
            </div>
        </DragDropContext>
    );
}

export default App;
