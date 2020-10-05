import {useState} from 'react';
import styles from './header.module.css';
import engdata from '../../data/languages/eng'
import urduData from '../../data/languages/urdu'

export default function Header({languageHandler}){
const [appLang,setAppLang] = useState('eng');
  return(
    <div className={styles.main}>
    <div className={styles.hamburgerMenu}>
    <img src='/hamburgerMenu.svg' />
    </div>
    <div className={styles.languageBox}>
    <select className={styles.langSelect} onChange={(e) => {
      setAppLang(e.target.value)
      languageHandler(e.target.value)
    }}  id='lang'>
    <option value='eng'>English</option>
    <option value='urdu'>javascript</option>
    </select>
    </div>
    </div>
  )
}
