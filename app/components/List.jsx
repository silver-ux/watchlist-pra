import React, { useState } from 'react'
import styles from './List.module.css'
import style from '@/app/add/page.module.css'
import Modal from './Modal';

const List = ({ movies, setMovies }) => {

    // ジャンル分け
    const [genreFilter, setGenreFilter] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // 全ジャンルを一つの配列にまとめて重複はさせない
    const genres = [...new Set(movies.flatMap(movie => movie.genre))];

    // フィルター条件に合う映画だけ抽出
    // const filteredMovie = genreFilter ? movies.filter(movie => movie.genre.includes(genreFilter)) : movies;
    const filteredMovie = movies.filter(movie => {
        const matchesGenre = genreFilter ? movie.genre.includes(genreFilter) : true;
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGenre && matchesSearch;
    });

    return (
        <div className={styles.list}>
            <div className={style.container}>
                <div className={styles.search}>
                    <h2>Search</h2>
                    <input className={style.input} type="text" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search movies..." />
                </div>
                <h2>Genres</h2>
                <div className={styles.genres}>
                    <button onClick={() => setGenreFilter(null)} className={`${styles.genre} ${genreFilter === null ? styles.active : ''}`}>ALL</button>
                    {genres.map((genre) => (
                        <button key={genre} onClick={() => setGenreFilter(genre)} className={`${styles.genre} ${genreFilter === genre ? styles.active : ''}`}>
                            {genre}
                        </button>
                    ))}
                </div>
                <div className={styles.watchlist}>
                    <h2>WATCH LIST</h2>
                    <div className={styles.cards}>
                        {filteredMovie.map((movie) => (
                            <button key={movie.id} className={styles.card} onClick={() => setSelectedMovie(movie)}>
                                {movie.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <Modal selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
        </div >
    )
}

export default List