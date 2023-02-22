import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Catalog.module.scss"

export default function Catalog(props) {
    const [selectedArcana, setSelectedArcana] = useState("")

    const handleSelectedArcana = (arcana) => {
        selectedArcana === arcana ? setSelectedArcana("") : setSelectedArcana(arcana)
    }

    return(
        <>
            <Head>
                <title>Arcana | Catalog</title>
            </Head>
            <div className={styles["catalog-container"]}>
                <div className={styles["arcanas-container"]}>
                    { props.arcanas.map(arcana =>  
                        <div 
                            className={`
                                ${styles["arcana"]}
                                ${selectedArcana === arcana.name ? styles["selected-arcana"] : styles["arcana__hover"]}
                            `} 
                            onClick={() => handleSelectedArcana(arcana.name)}
                        >
                            {arcana.name}
                        </div>
                    )}
                </div>
                { selectedArcana ? 
                    <div className={styles["recipes-container"]}>
                        { props.recipes.map(recipes =>
                            <div className={styles["recipe"]}>
                                {recipes.name}
                            </div>
                        )}
                    </div> : ""
                }
            </div>
        </>
    )
}

export async function getStaticProps() {
    const recipes_res = await fetch(`${process.env.BASE_API_URI}/recipes`)
    const recipes = await recipes_res.json()

    // const sources_res = await fetch(`${process.env.BASE_API_URI}/recipes/sources`)
    // const sources = await sources_res.json()

    // const colors_res = await fetch(`${process.env.BASE_API_URI}/recipes/colors`)
    // const colors = await colors_res.json()

    // const ingredients_res = await fetch(`${process.env.BASE_API_URI}/ingredients`)
    // const ingredients = await ingredients_res.json()

    const arcanas = [{name: "Arcano CVNP"}]
  
    return {
      props: {
        arcanas,
        recipes,
      },
    }
}
