import Dish from "./Dish";

export default function Category({name, setVisible, id ,setCurrentCategory, dishes}){
    const index = id

    return(
        <div className="category">
            <div className="category__header">
                <h2 className="category__name">{name}</h2>
                <button onClick={() => {
                    setVisible(true)
                    setCurrentCategory(index)
                }} className="category__add-btn">Добавить блюдо</button>
            </div>
            <ul className="category__dishes">
                {dishes.map((v, i) => <Dish name={v.dish_name} price={v.dish_price} photo={v.dish_image} key={i}/>)}
            </ul>
        </div>
    )
}