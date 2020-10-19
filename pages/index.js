import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import styles from '../styles/index.module.css'

export default function Home({ language }) {
  const [appLang, setAppLang] = useState("lang");
  const [timeLeft,setTimeLeft] = useState('');
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (language) {
      setAppLang(language);
      var countDownDate = new Date("Oct 20, 2020 10:30:00").getTime();
      var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft(`${hours} hours ${minutes} mins ${seconds} seconds `)
  // // Output the result in an element with id="demo"
  // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  // + minutes + "m " + seconds + "s ";
  //
  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
  setDone(true)
  }
}, 1000);
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
          You've got {timeLeft} left !
<br />
           tick tick tick ...
           {done ? 'YOU HAVE FAILED YOUR MISSION !' : ""}
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
