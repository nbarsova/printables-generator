import React, {useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import styles from "./App.module.css";

export function Header(props:
                           {
                               locale: string
                               headerCallback: (lang: string) => void,
                               resetPuzzle: () => void
                           }) {
    let languages = ["en", "ru", "de"];
    let [currentLanguage, setCurrentLanguage] = useState(props.locale);
    let intl = useIntl();
    document.title = intl.formatMessage({id: "rechnenrucksack"});

    let renderLanguage = (language: string) => {
        return (<div className={language === currentLanguage ? styles.selectedLanguage : styles.language}
                     onClick={() => {
                         setCurrentLanguage(language);
                         props.headerCallback(language);
                         document.title = intl.formatMessage({id: "rechnenrucksack"});
                     }}>{language}
        </div>)
    }

    return (<header>
        <div onClick={() => props.resetPuzzle()}>
            <FormattedMessage id="rechnenrucksack"/>
        </div>
        <div className={styles.languages}> {languages.map(renderLanguage)}</div>
    </header>)
}
