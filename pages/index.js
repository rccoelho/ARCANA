import Head from 'next/head'
import styles from '../styles/Index.module.scss'

export default function Index() {
  return (
    <>
      <Head>
        <title>Arcana</title>
      </Head>
      <div className="section-container">
        <div className={styles["hero-text"]}>
          <p>The Portuguese glass</p>
          <p>arcana from the 18th</p>
          <p>to 20th century</p>
        </div>
      </div>
    </>
  )
}
