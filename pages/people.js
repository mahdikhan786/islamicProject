import {useState,useEffect} from 'react';
import axios from 'axios';
import Head from 'next/head'
import Link from "next/link"
import Layout from '../components/layout'
import styles from '../styles/people.module.css'
import AddPeople from '../components/editpeople/addpeople';
import ProfileCard from '../components/profilecard/profilecard';

export default function People({language}){
  const [appLang,setAppLang] = useState('eng');
  const [users,setUsers] = useState(false);
  const [userDom,setuserDom] = useState(false);
  useEffect(() => {
    setAppLang(language)
  },[language])
  const generateUserDom = (data) => {
    let userDom = [];
    data.forEach((item, i) => {
      userDom.push(<ProfileCard key={`${item._id}`} data={item} />)
    });
setuserDom(userDom);
  }

  useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    try{
      const response = await axios.get('https://islamicprojectbackend.herokuapp.com/profile/');
      setUsers(response.data)
      generateUserDom(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <Layout>
    <Head>
    <title>People</title>
    </Head>
    <div className={styles.addpeoplemodal} >
      <AddPeople language={language} getData={getData} />
      </div>
      <div className={`${styles.container}`}>
      <h2 className={`${styles.heading}`}>
      {appLang == 'eng'? 'People' : 'لوگ'}
      </h2>
      <div  className={`${styles.peopleList}`}>
      {userDom}
      </div>
      </div>
    </Layout>
  )
}
