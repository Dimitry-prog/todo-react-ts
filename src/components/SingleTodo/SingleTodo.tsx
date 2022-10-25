import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './SingleTodo.module.scss';
import {ITodo} from "../../model";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";

interface SingleTodoProps {
    todo: ITodo;
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const SingleTodo: FC<SingleTodoProps> = ({todo, todos, setTodos}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDoneTodo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo));
    }

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const handleSubmitEdit = (e: React.FormEvent, id:number) => {
        e.preventDefault();

        setTodos(todos.map(todo => todo.id === id ? {...todo, todo:editTodo} : todo));
        setIsEdit(false);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [isEdit]);

    return (
        <form onSubmit={(e) => handleSubmitEdit(e, todo.id)} className={styles.todo}>
            {isEdit ? (
                <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)}/>
            ) : todo.isDone ? (
                <s>{todo.todo}</s>
            ): (
                <h2>{todo.todo}</h2>
            )}

            <div>
                <button type='button' onClick={() => {
                    if (!isEdit && !todo.isDone) {
                        setIsEdit(!isEdit);
                    }
                }}
                >
                    <AiFillEdit/>
                </button>
                <button type='button' onClick={() => handleDeleteTodo(todo.id)}>
                    <AiFillDelete/>
                </button>
                <button type='button' onClick={() => handleDoneTodo(todo.id)}>
                    <MdDone/>
                </button>
            </div>
        </form>
    );
};

export default SingleTodo;