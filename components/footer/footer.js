import {useState} from 'react';
import styles from './footer.module.css';
import engdata from '../../data/languages/eng'
import urduData from '../../data/languages/urdu'
import Link from 'next/link'

export default function Footer({language}){
  return(
    <div className={styles.main}>
    <div className={`${styles.links} `}><Link href='/'><a>Home</a></Link></div>
    <div className={`${styles.links} `}><Link href='/people'><a>People</a></Link></div>
    <div className={`${styles.links} `}>
    Calneder
    </div>
    <div className={`${styles.links} `}>
    More
    </div>
    </div>
  )
}

// <Link href='/more/blog'><a>More</a></Link>
 // <Link href='/calender'><a>Calender</a></Link>
