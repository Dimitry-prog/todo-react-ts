import React, {FC} from 'react';
import styles from './TodoList.module.scss';
import {ITodo} from "../../model";
import SingleTodo from "../SingleTodo/SingleTodo";

interface TodoListProps {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList: FC<TodoListProps> = ({todos, setTodos}) => {
    return (
        <div className={styles.todoList}>
            {todos.map(todo => (
                <SingleTodo
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                />
            ))}
        </div>
    );
};

export default TodoList;
