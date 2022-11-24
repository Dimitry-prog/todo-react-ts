import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './SingleTodo.module.scss';
import {ITodo} from "../../model";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {Draggable} from "react-beautiful-dnd";

interface SingleTodoProps {
    todo: ITodo;
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
    index: number;
}

const SingleTodo: FC<SingleTodoProps> = ({todo, todos, setTodos, index}) => {
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
        <Draggable draggableId={todo.id.toString()} index={index}>
            { (provided, snapshot) => (
                <form
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onSubmit={(e) => handleSubmitEdit(e, todo.id)}
                    className={`${styles.todo} ${snapshot.isDragging ? `${styles.todo_drag}` : ''}`}>
                    {isEdit ? (
                        <input ref={inputRef} value={editTodo} onChange={(e) => setEditTodo(e.target.value)}/>
                    ) : todo.isDone ? (
                        <s>{todo.todo}</s>
                    ) : (
                        <h3>{todo.todo}</h3>
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
                </form
                >
            )}
        </Draggable>
    );
};

export default SingleTodo;