import {useEffect,useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
export default function Home({language}) {
const [appLang,setAppLang] = useState('lang');
  useEffect(() => {
    if(language){setAppLang(language)}
  })
  return (
    <Layout >
      <Head>
        <title>Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
      {appLang == 'eng' ? 'Welcome to my App' : 'میری ایپ میں خوش آمدید'}
        </h1>

        <p className="description">
        <Link href='more/blog'><a>Blog Posts</a></Link>
        </p>
      </main>
    </Layout>
  )
}
