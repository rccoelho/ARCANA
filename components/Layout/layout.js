import Nav from './Nav/nav'
import Footer from './Footer/footer'

export default function Layout({ children }) {
    return(
        <>
            <Nav />
            <main>
                {children}
            </main>
            {/* <Footer /> */}
        </>
    )
}
