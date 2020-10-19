import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from '../styles/index.module.css'

export default function Home({ language }) {
  const [appLang, setAppLang] = useState("lang");
  useEffect(() => {
    if (language) {
      setAppLang(language);
    }
  });
  return (
    <Layout>
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.heading}>

          GOOD LUCK WITH THE HACK ABBAS AND JaWAD !
          <br/>
          You've got 24 hours ! tick tick tick ...
        </h1>
      </main>
    </Layout>
  );
}
// router link
// <p className="description">
// <Link href='more/blog'><a>Blog Posts</a></Link>
// </p>


// {appLang == "eng" ? "Welcome to my App" : "میری ایپ میں خوش آمدید"}
