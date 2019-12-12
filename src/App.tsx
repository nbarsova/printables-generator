import React, {useState} from 'react';
import './App.module.css';
import {SecretMessage} from "./components/SecretMessage";
import {LockMonster} from "./components/LockMonster";
import {TreasureHunt} from "./components/TreasureHunt";
import styles from "./App.module.css";

export function App() {

  let getCurrentComponent: () => any | RTCIceComponent | null;
  let puzzles = [
    {
      name: "Treasure hunt",
      component: <TreasureHunt/>,
      thumbnail: require("./img/compass.png")
    },
    {
      name: "Secret message",
      component: <SecretMessage/>,
      thumbnail: require("./img/secretP.png")
    },
    {
      name: "Lock the monster",
      component: <LockMonster/>,
      thumbnail: require("./img/monsterP.png")
    }
  ];

  const [currentPuzzle, setCurrentPuzzle] = useState(null);

  let renderPuzzle = (puzzle: any) => {
    if (!currentPuzzle) {
      return (<div className={styles.puzzle}
                   onClick={() => {
                     setCurrentPuzzle(puzzle)
                   }}
                   key={puzzle.name}>
        <img
            className={styles.thumbnail}
            src={puzzle.thumbnail}/>
        <p
            className={styles.puzzleName}>{puzzle.name}</p>
      </div>)
    } else {
      return (<p
          className={currentPuzzle === puzzle ? styles.puzzleName : styles.puzzleNameBar}
          onClick={() => {
            setCurrentPuzzle(puzzle)
          }}
          key={puzzle.name}>{puzzle.name}</p>)
    }
  };


  return (
      <div className={styles.app}>
        <header onClick={()=>setCurrentPuzzle(null)}>Bag of tasks</header>
        <div className={currentPuzzle ? styles.puzzleBar : styles.puzzles}> {puzzles.map(renderPuzzle)}</div>
        </div>
  );
}

