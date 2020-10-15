import {useState,useEffect} from 'react';
import styles from './profilecard.module.css';
import DeleteProfile from '../editpeople/deleteprofile';
export default function ProfileCard({data,getData,language}){
  const [expand,setExpand] = useState(false);


  return(
      <div className={`${styles.profilecard}`}>
      <div className={`${styles.cardheader}`}>
      <img className={`${styles.profilepic}`} src='/maolana.jpg' alt='profile Image' />
      <div className={`${styles.headertext}`}>
      <p className={`${styles.profilename}`}>{data.name}</p>
      <p className={`${styles.profileoccupation}`}>{data.occupation}</p>
      </div>
      </div>
      <div className={`${styles.cardbody}`}>
      <p className={`${styles.cardtext}`}>
    {data.bio}
      </p>
      </div>
      <div className={`${styles.footer}`}>
        <p className={styles.cardaddress}>
        {data.address}
        </p>
        <div className={styles.contact}>
        <a href={`tel:${data.phone}`}>
        <img className={styles.phoneicon} src='/phone.svg' alt='phone icon' />
        </a>
        <div onClick={() => expand ? setExpand(false) : setExpand(true)}>{expand ?  <img className={styles.editIcon} src='/cancel.svg' alt='edit icon' />:<img className={styles.editIcon} src='/plusIcon.svg' alt='edit icon' />}</div>

        </div>
      </div>
      {expand ? <div className={`${styles.options}`}>
      <button onClick={() => console.log('edit')}>Edit</button>
      <DeleteProfile id={data._id} getData={getData} language={language} />
      </div> : ""}
      </div>
  )
}
