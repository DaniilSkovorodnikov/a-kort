import {useState} from "react";

export default function CategoryButton({category, setCurrentCategory, categoryIndex, currentCategoryIdx}){
    const classes = ["categories__btn"]
    if(categoryIndex === currentCategoryIdx){
        classes.push("btn-active")
    }

    return(
        <div>
            <button className={classes.join(' ')} onClick={() => {
                setCurrentCategory(categoryIndex)
            }}>{category}
            </button>
        </div>
    )
}