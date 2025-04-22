import { useState } from 'react';
import db from '../data/firebase';
import styles from './Modal.module.css'
import { doc, deleteDoc } from "firebase/firestore";

const Modal = ({ selectedMovie, setSelectedMovie }) => {

    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleModal = () => {
        setSelectedMovie(null);
    }

    const handleDelete = async () => {
        if (password == 'js') {
            await deleteDoc(doc(db, 'posts', selectedMovie.id));
            setSelectedMovie(null);
            setPassword('');
        } else {
            alert('パスワードが違います。');
            return;
        }
    }

    const showPass = () => {
        setShow(true);
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
                        <button className={styles.delete} onClick={showPass}>削除</button>
                        {show && <div className={styles.password}>
                            <p>本当に削除しますか？</p>
                            <input autoComplete='off' placeholder='パスワードを入力してください。' value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                            <button onClick={() => setShow(false)} className={`${styles.passBtns} ${styles.passclose}`}>閉じる</button>
                            <button onClick={handleDelete} className={`${styles.passBtns} ${styles.del}`}>削除</button>
                        </div>
                        }
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default Modal