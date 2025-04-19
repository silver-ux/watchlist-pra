'use client';
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "./data/firebase";
import List from "./components/List";
import Header from "./components/Header";

export default function Home() {

  // firebaseからデータを取得してmovies配列に入れる
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {

      // timestamp順に取得する
      const onTime = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );
      const snapShots = await getDocs(onTime);
      const input = snapShots.docs.map((doc) => (
        { id: doc.id, ...doc.data() }
      ));
      setMovies(input);

      // リアルタイム更新
      onSnapshot(onTime, (post) => {
        setMovies(post.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

    };

    fetchData();
  }, [])
  return (
    <div className={styles.page}>
      <Header />
      <List movies={movies} setMovies={setMovies} />
    </div>
  );
}
