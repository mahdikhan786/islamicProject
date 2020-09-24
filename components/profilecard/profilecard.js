import styles from './profilecard.module.css';
export default function ProfileCard({data}){
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
        <a href={`tel:${data.phone}`}><img className={styles.phoneicon} src='/phone.svg' alt='phone icon' /></a>
        </div>
      </div>
      </div>
  )
}
