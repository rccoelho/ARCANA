import RecipeTableRow from "@/components/RecipesTable/RecipeTableRow";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import styles from "../styles/Search.module.scss"

export default function Search(props) {
    const header = useRef(null)

    const [selectedFilter, setSelectedFilter] = useState(null) 

    const [headersWidth, setHeadersWidth] = useState([]);

    const [currentFilteredSource, setCurrentFilteredSource] = useState(null)
    const [currentFilteredColor, setCurrentFilteredColor] = useState("")
    const [currentFilteredIngredients, setCurrentFilteredIngredients] = useState([])

    const [filteredSet, setFilteredSet] = useState([])
    const [noResults, setNoResults] = useState(false)

    const hidden = (filter) => {
        return filter === selectedFilter ? "" : "hidden"
    }

    const hiddenSelectedParameters = (filter) => {
        return filter === selectedFilter ? "hidden" : ""
    }

    const handleSelectedFilter = (e, filter) => {
        e.preventDefault();
        
        selectedFilter === filter ? setSelectedFilter("") : setSelectedFilter(filter)
    }

    const getRecipesList = () => {
        return filteredSet.length ? filteredSet : props.recipes
    }

    const setHeadersWidthState = (updatedValue) => {
        setHeadersWidth(headersWidth => 
            [...headersWidth, updatedValue]
        ) 
    }

    const handleSelectedParameter = (filter, parameter) => {
        switch (filter) {
            case "source":
                currentFilteredSource === parameter ?
                    setCurrentFilteredSource(null) :
                    setCurrentFilteredSource(parameter)
                break;

            case "color":
                currentFilteredColor === parameter ?
                    setCurrentFilteredColor('') :
                    setCurrentFilteredColor(parameter)
                break;

            case "ingredient":
                currentFilteredIngredients.includes(parameter) ? 
                    setCurrentFilteredIngredients(currentFilteredIngredients.filter(ingredient => ingredient != parameter)) :
                    setCurrentFilteredIngredients(currentFilteredIngredients =>
                        [...currentFilteredIngredients, parameter]
                    )
                break;

            default:
                break;
        }
    }

    const checkedFilteredParameter = (parameter) => {
        return (currentFilteredSource == parameter || currentFilteredColor == parameter || currentFilteredIngredients.includes(parameter))
    }

    const applyFilters = () => {
        var arr = props.recipes
        var arr2 = []

        // Source
        if(currentFilteredSource != "") {
            arr.map(recipe => {
                if(recipe.source == currentFilteredSource)
                    arr2.push(recipe)
            })

            arr = arr2
            arr2 = []
        }

        // Colors
        if(currentFilteredColor != "") {
            arr.map(recipe => {
                if(recipe.color == currentFilteredColor)
                    arr2.push(recipe)
            })

            arr = arr2
            arr2 = []
        }
        

        // Ingredient
        if(currentFilteredIngredients.length > 0) {
            arr.map(recipe => {
                var ingredients_arr = recipe.ingredients.map(ingredient => 
                    ingredient.ingredient_name
                )
        
                var checker = (ingredients_arr, currentFilteredIngredients) => currentFilteredIngredients.every(v => ingredients_arr.includes(v));
        
                if(checker(ingredients_arr, currentFilteredIngredients))
                    arr2.push(recipe)    
            })

            arr = arr2
            arr2 = []
        }
          
        setFilteredSet(arr)

        arr.length > 0 ? setNoResults(false) : setNoResults(true)
    }

    const clearFilters = () => {
        setFilteredSet([])
        setCurrentFilteredSource(null)
        setCurrentFilteredColor("")
        setCurrentFilteredIngredients([])
        setNoResults(false)
    }

    useEffect(() => {
        header.current.childNodes.forEach((childNode) => {
            const headerWidth = { 
                name: childNode.innerText.toLowerCase(),
                width: childNode.offsetWidth
            }
        
            setHeadersWidthState(headerWidth)
        })
    }, []);

    return(
        <>
            <Head>
                <title>Arcana | Search</title>
            </Head>
            <>
                <div className={styles["search-container"]}>
                    <div className={styles["search-container__first_line"]}>
                        <h2>Search:</h2>
                        <div>    
                            <div 
                                className={styles["search-parameter-container"]}
                                onClick={(e) => handleSelectedFilter(e, "source")}
                            >
                                <p>Source</p>
                            </div>
                            <div 
                                className={`
                                    ${styles["search-parameter-selected"]}
                                    ${styles[hiddenSelectedParameters("source")]}
                                `}
                            >
                                {/* <p>filter 1</p>
                                <p>filter 2</p> */}
                            </div>
                            <div 
                                className={`
                                    ${styles["search-options-container"]}
                                    ${styles[hidden("source")]}
                                `}
                            >
                                { props.sources.map((source, index) => (
                                    source.name !== "" &&
                                    <div key={index} onClick={() => handleSelectedParameter("source", source.name)} className={styles["search-option-parameter"]}>
                                        <span>
                                            <i className={checkedFilteredParameter(source.name) ? "bi bi-check-square" : "bi bi-square"} />
                                        </span>
                                        <span>{source.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>    
                            <div 
                                className={styles["search-parameter-container"]}
                                onClick={(e) => handleSelectedFilter(e, "color")}
                            >
                                <p>Color</p>
                            </div>
                            <div 
                                className={`
                                    ${styles["search-options-container"]}
                                    ${styles[hidden("color")]}
                                `}
                            >
                                { props.colors.map((color, index) => (
                                    <div key={index} onClick={() => handleSelectedParameter("color", color.name)} className={styles["search-option-parameter"]}>
                                        <span>
                                            <i className={checkedFilteredParameter(color.name) ? "bi bi-check-square" : "bi bi-square"} />
                                        </span>
                                        <span>{color.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>    
                            <div 
                                className={styles["search-parameter-container"]}
                                onClick={(e) => handleSelectedFilter(e, "material")}
                            >
                                <p>Raw material</p>
                            </div>
                            <div 
                                className={`
                                    ${styles["search-options-container"]}
                                    ${styles[hidden("material")]}
                                `}
                            >
                                { props.ingredients.map((ingredient, index) => (
                                    <div key={index} onClick={() => handleSelectedParameter("ingredient", ingredient.name)} className={styles["search-option-parameter"]}>
                                        <span>
                                            <i className={checkedFilteredParameter(ingredient.name) ? "bi bi-check-square" : "bi bi-square"} />
                                        </span>
                                        <span>{ingredient.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles["search-container-btn-container"]}>
                        <span onClick={() => clearFilters()}><i className="bi bi-x-lg" /></span>
                        <span onClick={() => applyFilters()}><i className="bi bi-check-lg" /></span>
                    </div>
                </div>
                <div className={styles["table-container"]}>
                { noResults ? 
                    <div>
                        <p>No results</p>
                    </div> :
                    <>
                        <div ref={header} className={styles["header-container"]}>
                            <h2 className={styles["header-col"]}>id</h2>
                            <h2 className={styles["header-col"]}>Name</h2>
                            <div className={styles["header-col"]}>
                                <h2>Color</h2>
                                { currentFilteredColor ? 
                                    <div style={{maxWidth: headersWidth[2]?.width - 10}} className={styles["header-filter"]} onClick={() => handleSelectedParameter("color", currentFilteredColor)}>
                                        <span>{currentFilteredColor}</span>
                                        <span><i className="bi bi-x" /></span>
                                    </div> : `` 
                                }
                            </div>
                            <div className={styles["header-col"]}>
                                <h2>Source</h2>
                                { currentFilteredSource ? 
                                    <div style={{maxWidth: headersWidth[3]?.width - 10}} className={styles["header-filter"]} onClick={() => handleSelectedParameter("source", currentFilteredSource)}>
                                        <span>{currentFilteredSource}</span>
                                        <span><i className="bi bi-x" /></span>
                                    </div> : `` 
                                }
                            </div>
                            <div className={styles["header-col"]}>
                                <h2>Ingredient</h2>
                                { currentFilteredIngredients.length ? 
                                    currentFilteredIngredients.map((ingredient, index) => 
                                        <div key={index} style={{maxWidth: headersWidth[4]?.width - 10}} className={styles["header-filter"]} onClick={() => handleSelectedParameter("ingredient", ingredient)}>
                                            <span>{ingredient}</span>
                                            <span><i className="bi bi-x" /></span>
                                        </div>
                                    ) : ''
                                }
                            </div>
                            <h2 className={styles["header-col"]}>Quantity</h2>
                        </div>
                        { getRecipesList().map((recipe) => (
                            <RecipeTableRow colSizes={headersWidth} recipeRow={recipe} key={recipe.id}/>   
                        ))}
                    </>
                }
            </div>
            </>
            
        </>
    )
}

export async function getStaticProps() {
    const recipes_res = await fetch(`${process.env.BASE_API_URI}/recipes`)
    const recipes = await recipes_res.json()

    const sources_res = await fetch(`${process.env.BASE_API_URI}/recipes/sources`)
    const sources = await sources_res.json()

    const colors_res = await fetch(`${process.env.BASE_API_URI}/recipes/colors`)
    const colors = await colors_res.json()

    const ingredients_res = await fetch(`${process.env.BASE_API_URI}/ingredients`)
    const ingredients = await ingredients_res.json()
  
    return {
      props: {
        recipes,
        sources,
        colors,
        ingredients,
      },
    }
}
