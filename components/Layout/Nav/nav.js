import Link from 'next/link'
import { useState } from 'react'
import styles from './Nav.module.scss'

export default function Nav() {
    const [selectedLink, setSelectedLink] = useState("")

    return(
        <>
            <div className={styles["container"]}>
                <Link 
                    className={`
                        ${styles["column"]}
                        ${selectedLink == "about" ? styles["selected"] : ""}
                        ${styles["disabled"]}
                    `}
                    href="/about"
                    onClick={() => setSelectedLink("about")}
                >
                    <div className={styles["title-color"]}>A</div>
                    <div>B</div>
                    <div>O</div>
                    <div>U</div>
                    <div>T</div>
                </Link>
                <Link 
                    className={`
                        ${styles["column"]}
                        ${selectedLink == "search" ? styles["selected"] : ""}
                    `}
                    href="/search"
                    onClick={() => setSelectedLink("search")}
                >
                    <div>S</div>
                    <div>E</div>
                    <div>A</div>
                    <div className={styles["title-color"]}>R</div>
                    <div>C</div>
                    <div>H</div>
                </Link>
                <div className={styles["title-color"]}>C</div>
                <Link 
                    className={`
                        ${styles["column"]}
                        ${selectedLink == "catalog" ? styles["selected"] : ""}
                    `}
                    href="/catalog"
                    onClick={() => setSelectedLink("catalog")}
                >
                    <div>C</div>
                    <div className={styles["title-color"]}>A</div>
                    <div>T</div>
                    <div>O</div>
                    <div>L</div>
                    <div>O</div>
                    <div>G</div>
                </Link>
                <div className={styles["title-color"]}>N</div>
                <Link 
                    className={`
                        ${styles["column"]}
                        ${selectedLink == "contact" ? styles["selected"] : ""}
                        ${styles["disabled"]}
                    `}
                    href="/contact"
                    onClick={() => setSelectedLink("contact")}
                >
                    <div>C</div>
                    <div>O</div>
                    <div>N</div>
                    <div>T</div>
                    <div className={styles["title-color"]}>A</div>
                    <div>C</div>
                    <div>T</div>
                </Link>
                <Link
                    className={`
                        ${styles["column"]}
                        ${styles["home-button"]}
                    `}
                    href="/"
                    onClick={() => setSelectedLink("")}
                >
                    <i class="bi bi-house"></i>
                </Link>
            </div>
        </>
    )
}
