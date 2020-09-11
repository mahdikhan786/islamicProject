import Head from 'next/head'
import Link from "next/link"
import Layout from '../components/layout'
// import styles from '../../styles/blog.module.css'
export default function People(){
  return(
    <Layout>
    <Head>
    <title>People</title>
    </Head>
      <h1>People</h1>
      <Link href='/'><a>Home</a></Link>
    </Layout>
  )
}
