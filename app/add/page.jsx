'use client';
import React, { useRef, useState } from 'react'
import styles from "./page.module.css"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from '../data/firebase';
import Link from 'next/link';

const AddData = () => {
    const genreList = ["Action", "Adventure", "Anime", "Comedy", "Crime", "Fantasy", "History", "Horror", "Military", "Mystery", "Music", "Romance", "Thriller", "War",];

    const [genre, setGenre] = useState([]);
    const [title, setTitle] = useState("");
    const [story, setStory] = useState("");
    const [actor, setActor] = useState("");
    const [isComposing, setIsComposing] = useState(false);

    const titleRef = useRef(null);
    const storyRef = useRef(null);
    const actorRef = useRef(null);

    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter' && !isComposing) {
            if (nextRef) {
                e.preventDefault();
                nextRef.current?.focus();
            }
        }
    };

    const toggleGenre = (getGenre) => {
        // e.preventDefault();
        if (genre.includes(getGenre)) {
            setGenre(genre.filter((g) => g !== getGenre));
        } else {
            setGenre([...genre, getGenre]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "posts"), {
                title,
                actor,
                story,
                genre,
                createdAt: serverTimestamp(),
            });
            setTitle("")
            setGenre([]);
            setStory("");
            setActor("");
            alert('映画を追加しました（ Send a data )')
            location.href = '/';
        } catch (err) {
            console.error("Failed to add:", err)
        }
    }


    return (
        <form className={styles.wrap} onSubmit={handleSubmit}>
            <div className={styles.container}>
                <div className={styles.homebtn}><Link href='/'>Back to home</Link></div>
                <h2>TITLE</h2>
                <input ref={titleRef} type="text" value={title} className={styles.input} autoComplete='off' required onChange={e => setTitle(e.target.value)} onKeyDown={(e) => handleKeyDown(e, storyRef)} onCompositionStart={() => setIsComposing(true)}
                    onCompositionEnd={() => setIsComposing(false)} />

                <div className={styles.btns}>
                    {genreList.map((getGenre) => (
                        <button
                            key={getGenre}
                            type='button'
                            onClick={() => toggleGenre(getGenre)}
                            className={`${styles.genreButton} ${genre.includes(getGenre) ? styles.selected : ""}`}
                        >
                            {getGenre}
                        </button>
                    ))}
                </div>
                <div className={styles.section}>
                    <h2>STORY</h2>
                    <textarea ref={storyRef} type="text" className={`${styles.input} ${styles.textarea}`} autoComplete='off' required value={story} onChange={e => setStory(e.target.value)} onKeyDown={(e) => handleKeyDown(e, actorRef)} onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)} />
                </div>
                <div className={styles.section}>
                    <h2>MAIN ACTOR</h2>
                    <input ref={actorRef} type="name" className={styles.input} autoComplete='off' required value={actor} onChange={e => setActor(e.target.value)} onKeyDown={(e) => handleKeyDown(e, null)} onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)} />
                </div>
                <button type='submit' className={styles.submit} >Submit</button>
            </div>
        </form >
    )
}

export default AddData