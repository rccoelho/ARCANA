import styles from "./RecipeTableRow.module.scss"

export default function RecipeTableRow({ colSizes, recipeRow }) {
    return (
        <div className={styles["row-container"]}>
            <div className={styles["col-container"]}>
                <span style={{ width: colSizes[0]?.width }} className={styles["col-value"]}>{recipeRow.catalog_id}</span>
                <span style={{ width: colSizes[1]?.width }} className={styles["col-value"]}>{recipeRow.name}</span>
                <span style={{ width: colSizes[2]?.width }} className={styles["col-value"]}>{recipeRow.color}</span>
                <span style={{ width: colSizes[3]?.width }} className={styles["col-value"]}>{recipeRow.source}</span>
                <span style={{ width: colSizes[4]?.width }} className={styles["col-value"]}>{recipeRow.ingredients[0].ingredient_name}</span>
                <span style={{ width: colSizes[5]?.width }} className={styles["col-value"]}>{recipeRow.ingredients[0].quantity}</span>
            </div>
            {recipeRow.ingredients.map((recipeIngredient, index) => (
                index != 0 &&
                    <div className={styles["col-container"]} key={recipeIngredient.id}>
                        <span style={{ width: colSizes[0]?.width }} className={styles["col-value"]}></span>
                        <span style={{ width: colSizes[1]?.width }} className={styles["col-value"]}></span>
                        <span style={{ width: colSizes[2]?.width }} className={styles["col-value"]}></span>
                        <span style={{ width: colSizes[3]?.width }} className={styles["col-value"]}></span>
                        <span style={{ width: colSizes[4]?.width }} className={styles["col-value"]}>{recipeIngredient.ingredient_name}</span>
                        <span style={{ width: colSizes[5]?.width }} className={styles["col-value"]}>{recipeIngredient.quantity}</span>
                    </div>
            ))}
        </div>
    )
} RecipeTableRow 
