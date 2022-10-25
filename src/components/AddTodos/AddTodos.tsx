import React, {FC, useRef} from 'react';
import styles from './AddTodos.module.scss';

interface AddTodosProps {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleSubmitTodo: (e: React.FormEvent) => void;
}

const AddTodos:FC<AddTodosProps> = ({todo, setTodo, handleSubmitTodo}) => {
   const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            onSubmit={(e) => {
                handleSubmitTodo(e);
                inputRef.current?.blur();
            }}
            className={styles.form}
        >
            <input
                ref={inputRef}
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type='input'
                placeholder='Enter todo'/>
            <button type='submit'>Add</button>
        </form>
    );
};

export default AddTodos;