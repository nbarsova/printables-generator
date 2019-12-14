import React, {useState} from 'react';
import './App.module.css';
import {SecretMessage} from "./components/secret/SecretMessage";
import {LockMonster} from "./components/monster/LockMonster";
import {TreasureHunt} from "./components/treasure/TreasureHunt";
import styles from "./App.module.css";
import {FormattedMessage, IntlProvider} from "react-intl";
import {deMessagesJSON, enMessagesJson, ruMessagesJSON} from "./messages/messages";
import {Header} from "./Header";

export function App() {

  let getCurrentComponent: () => any | RTCIceComponent | null;
  let puzzles = [
    {
      name: <FormattedMessage
          id="treasureMap"
          defaultMessage="Treasure map"/>,
      component: <TreasureHunt/>,
      thumbnail: require("./img/compass.png")
    },
    {
      name: <FormattedMessage
          id="secretCode" defaultMessage="Secret map"/>,
      component: <SecretMessage/>,
      thumbnail: require("./img/secretP.png")
    },
    {
      name: <FormattedMessage
          id="lockTheMonster" defaultMessage="Lock the Monster"/>,
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

  const messages: any = {
    en: enMessagesJson,
    de: deMessagesJSON,
    ru: ruMessagesJSON
  };

  let defaultLocale = "en";
  switch (navigator.language) {
    case "de-DE":
      defaultLocale = "de";
    case "ru-RU":
      defaultLocale = "ru";
    default:
      break;
  }

  let [locale, setCurrentLocale] = useState(defaultLocale);

  let headerCallback = (lang: string) => {
    setCurrentLocale(lang);
  };

  return (
      <IntlProvider locale={locale}
                    messages={messages[locale]}>

        <div className={styles.app}>

          <Header headerCallback={(language) => setCurrentLocale(language) }
                  resetPuzzle={() => setCurrentPuzzle(null)}
                  locale={defaultLocale}/>
          <div className={currentPuzzle ? styles.puzzleBar : styles.puzzles}>
            {puzzles.map(renderPuzzle)}
          </div>
          {currentPuzzle && currentPuzzle.component}
        </div>
      </IntlProvider>
  );
}

