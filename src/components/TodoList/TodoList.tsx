import React, {FC} from 'react';
import styles from './TodoList.module.scss';
import {ITodo} from "../../model";
import SingleTodo from "../SingleTodo/SingleTodo";
import {Droppable} from "react-beautiful-dnd";

interface TodoListProps {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
    completedTodos: ITodo[];
    setCompletedTodos:  React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList: FC<TodoListProps> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
    return (
        <div className={styles.container}>
            <Droppable droppableId='TodosActive'>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${styles.todoList} ${snapshot.isDraggingOver ? `${styles.todoList_dragactive}` : ''}`}
                    >
                        <h2>Active todos</h2>
                        {todos.map((todo, index) => (
                            <SingleTodo
                                key={todo.id}
                                index={index}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`${styles.todoList} ${snapshot.isDraggingOver ? `${styles.todoList_dragcomplete}` : ''}`}
                    >
                        <h2>Completed todos</h2>
                        {completedTodos.map((todo, index) => (
                            <SingleTodo
                                key={todo.id}
                                index={index}
                                todo={todo}
                                todos={completedTodos}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TodoList;
