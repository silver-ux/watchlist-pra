'use client';
import React, { useRef, useState } from 'react'
import styles from "./page.module.css"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import db from '../data/firebase';
import Link from 'next/link';

const AddData = () => {
    const genreList = ["アクション", "アドベンチャー", "アニメ", "コメディー", "犯罪", "ファンタジー", "歴史", "ホラー", "ミリタリー", "ミステリー", "ミュージック", "ロマンス", "スリラー", "戦争",];

    const [genre, setGenre] = useState([]);
    const [title, setTitle] = useState("");
    const [story, setStory] = useState("");
    const [actor, setActor] = useState("");
    const [isComposing, setIsComposing] = useState(false);

    const titleRef = useRef(null);
    const storyRef = useRef(null);
    const actorRef = useRef(null);

    const [password, setPassword] = useState('');

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
        if (password == 'js') {

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
                setPassword('');
                alert('映画を追加しました！')
                location.href = '/';
            } catch (err) {
                console.error("追加に失敗しました。:", err)
            }
        } else {
            alert('パスワードが違います。');
            return;
        }

    }


    return (
        <form className={styles.wrap} onSubmit={handleSubmit}>
            <div className={styles.container}>
                <div className={styles.homebtn}><Link href='/'>リストに戻る</Link></div>
                <h2>Title</h2>
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
                    <h2>Story</h2>
                    <textarea ref={storyRef} type="text" className={`${styles.input} ${styles.textarea}`} autoComplete='off' required value={story} onChange={e => setStory(e.target.value)} onKeyDown={(e) => handleKeyDown(e, actorRef)} onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)} />
                </div>
                <div className={styles.section}>
                    <h2>Actor</h2>
                    <input ref={actorRef} type="name" className={styles.input} autoComplete='off' required value={actor} onChange={e => setActor(e.target.value)} onKeyDown={(e) => handleKeyDown(e, null)} onCompositionStart={() => setIsComposing(true)}
                        onCompositionEnd={() => setIsComposing(false)} />
                </div>
                <input autoComplete='off' className={styles.input} placeholder='passwordを入力してください' type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className={styles.submit} >追加</button>
            </div>
        </form >
    )
}

export default AddData