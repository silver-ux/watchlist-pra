import React from 'react'
import styles from './Header.module.css'
import Link from 'next/link'

const Header = () => {
    return (
        <header className={styles.header}>
            <h1><Link href={"/add"} className={styles.link}>映画を追加！</Link></h1>
        </header>
    )
}

export default Header