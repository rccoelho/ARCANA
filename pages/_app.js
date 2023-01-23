import Layout from '../components/Layout/layout'
import { PT_Serif } from '@next/font/google'

import '../styles/globals.scss'

const ptSerif = PT_Serif({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <main className={ptSerif.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  )
}
