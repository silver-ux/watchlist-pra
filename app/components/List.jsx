import React, { useState } from 'react'
import styles from './List.module.css'
import style from '@/app/add/page.module.css'
import Modal from './Modal';

const List = ({ movies, setMovies }) => {

    // ジャンル分け
    const [genreFilter, setGenreFilter] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // 全ジャンルを一つの配列にまとめて重複はさせない
    const genres = [...new Set(movies.flatMap(movie => movie.genre))];

    // フィルター条件に合う映画だけ抽出
    const filteredMovie = genreFilter ? movies.filter(movie => movie.genre.includes(genreFilter)) : movies;

    return (
        <>
            <div className={style.container}>
                <h2>GENRES</h2>
                <div className={styles.genres}>
                    <button onClick={() => setGenreFilter(null)} className={`${styles.genre} ${styles.allbtn}`}>ALL</button>
                    {genres.map((genre) => (
                        <button key={genre} onClick={() => setGenreFilter(genre)} className={styles.genre}>
                            {genre}
                        </button>
                    ))}
                </div>
                <h3>WATCH LIST</h3>
                <div className={styles.cards}>
                    {filteredMovie.map((movie) => (
                        <button key={movie.id} className={styles.card} onClick={() => setSelectedMovie(movie)}>
                            {movie.title}
                        </button>
                    ))}
                </div>
            </div>
            <Modal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
        </>
    )
}

export default List