import Head from 'next/head'
import Link from "next/link"
import Layout from '../components/layout'
// import styles from '../../styles/blog.module.css'
export default function Calender(){
  return(
    <Layout>
    <Head>
    <title>Calender</title>
    </Head>
      <h1>Calender</h1>
      <Link href='/'><a>Home</a></Link>
    </Layout>
  )
}
