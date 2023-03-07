import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Catalog.module.scss"

export default function Catalog(props) {
    const [selectedArcana, setSelectedArcana] = useState(null)

    const handleSelectedArcana = (arcana) => {
        selectedArcana === arcana ? setSelectedArcana(null) : setSelectedArcana(arcana)
    }

    return(
        <>
            <Head>
                <title>Arcana | Catalog</title>
            </Head>
            <div className={styles["catalog-container"]}>
                <div className={styles["arcanas-container"]}>
                    { props.sources.map((arcana, index) =>
                        arcana.name !== "" &&
                        <div 
                            key={index}
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
                        { props.recipes.filter(recipe => 
                            recipe.source === selectedArcana
                          ).map((recipes, index) =>
                            <div key={index} className={styles["recipe"]}>
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
    const sources_res = await fetch(`${process.env.BASE_API_URI}/recipes/sources`)
    const sources = await sources_res.json()

    const recipes_res = await fetch(`${process.env.BASE_API_URI}/recipes`)
    const recipes = await recipes_res.json()
  
    return {
      props: {
        sources,
        recipes,
      },
    }
}
