import styles from './Modal.module.css'

const Modal = ({ selectedMovie, setSelectedMovie }) => {
    const handleModal = () => {
        setSelectedMovie(null);
    }

    return (
        <div>
            {selectedMovie && (
                <div className={styles.back}>
                    <div className={styles.modal}>
                        <h2>{selectedMovie.title}</h2>
                        {selectedMovie.genre.map((genre) => (
                            <span key={`${selectedMovie.id} + ${genre}`} className={styles.genre}>{genre}</span>
                        ))}
                        <p>{selectedMovie.story}</p>
                        <button className={styles.close} onClick={handleModal}>閉じる</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal