import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from "../styles/people.module.css";
import AddPeople from "../components/editpeople/addpeople";
import ProfileCard from "../components/profilecard/profilecard";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function People({ language }) {
  const [appLang, setAppLang] = useState("eng");
  const [users, setUsers] = useState(false);
  const [userDom, setuserDom] = useState(false);
  const [defaultSort,setDefaultSort] = useState('All')
  useEffect(() => {
    setAppLang(language);
  }, [language]);
  const manipulateUserData = (data, param) => {
    if(param === 'All'){
      let modifiedData = data.reverse()
      generateUserDom(modifiedData)
    }else{
      let modifiedData = data.filter((item) => item.occupation === param);
      generateUserDom(modifiedData);
    }

  };
  const generateUserDom = (data) => {
    let userDom = [];
    let userData = data.reverse()
    userData.forEach((item, i) => {
      userDom.push(<ProfileCard key={`${item._id}`} data={item} getData={getData} language={appLang} />);
    });
    setuserDom(userDom);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if(users){
      generateUserDom(users)
    }
  }, [appLang])

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://islamicprojectbackend.herokuapp.com/profile/"
      );
      setUsers(response.data);
      generateUserDom(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Head>
        <title>People</title>
      </Head>
      <div className={styles.addpeoplemodal}>
        <AddPeople language={language} getData={getData} />
      </div>
      <div className={`${styles.container}`}>
        <h2 className={`${styles.heading}`}>
          {appLang == "eng" ? "People" : "لوگ"}
        </h2>
        {users ? (
          <div>
            {language == "eng" ? <label htmlFor="userSort">Sort: </label> : ""}
            <select
            defaultValue={defaultSort}
              className={styles.sortingOption}
              onChange={(e) => {
                manipulateUserData(users, e.target.value);
              }}
              id="userSort"
            >
            <option value="All">
              {language == "eng" ? "All" : "سب"}
            </option>
              <option value="molana">
                {language == "eng" ? "Molana" : "مولا ن"}
              </option>
              <option value="Naoha-khwan">
                {language == "eng" ? "Naoha Khwan" : "نوحہ خواں"}
              </option>
              <option value="soz-khwan">
                {language == "eng" ? "Soz Khwan" : "سوز خوان"}
              </option>
            </select>
            {language == "urdu" ? (
              <label htmlFor="userSort"> :ترتیب</label>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className={`${styles.peopleList}`}>
          {userDom ? userDom : <CircularProgress />}
        </div>
      </div>
    </Layout>
  );
}
