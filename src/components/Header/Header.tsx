import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Todos</h1>
        </header>
    );
};

export default Header;