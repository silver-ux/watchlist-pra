import db from '../data/firebase';
import styles from './Modal.module.css'
import { doc, deleteDoc } from "firebase/firestore";

const Modal = ({ selectedMovie, setSelectedMovie }) => {
    const handleModal = () => {
        setSelectedMovie(null);
    }

    const handleDelete = async () => {
        await deleteDoc(doc(db, 'posts', selectedMovie.id));
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
                        <p className={styles.story}>{selectedMovie.story}</p>
                        <button className={styles.close} onClick={handleModal}>閉じる</button>
                        <button className={styles.delete} onClick={handleDelete}>削除</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal