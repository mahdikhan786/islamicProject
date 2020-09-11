import Head from 'next/head'
import Link from "next/link"
import Layout from '../../components/layout'
import styles from '../../styles/blog.module.css'
export default function Blog(){
  return(
    <Layout>
    <Head>
    <title>Posts</title>
    </Head>
      <h1 className={styles.test}>Posts</h1>
      <Link href='/'><a>Home</a></Link>
    </Layout>
  )
}
