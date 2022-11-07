import Dish from "./Dish";
import Modal from "./Modal";
import {useState} from "react";

export default function Category({name, setVisible, id ,setCurrentCategory, dishes}){
    const index = id
    const [visibleChanger, setVisibleChanger] = useState(false);

    return(
        <div>
            <Modal visible={visibleChanger} setVisible={setVisibleChanger}>
                <ul className="current-dishes">
                    {dishes.map((v, i) => <li className="current-dishes__item" key={i}>
                        <p>{i + 1}. {v.dish_name}</p>
                        <button onClick={() => {
                            const dishIndex = i;
                            dishes.splice(dishIndex, 1);
                            console.log(dishes);
                        }}>Удалить</button>
                    </li>)}
                </ul>
            </Modal>
            <div className="category">
                <div className="category__header">
                    <h2 className="category__name">{name}</h2>
                    <div className="category__buttons">
                        <button onClick={() => setVisibleChanger(true)}>Изменить категорию</button>
                        <button onClick={() => {
                            setVisible(true)
                            setCurrentCategory(index)
                        }} className="category__add-btn">Добавить блюдо</button>
                    </div>
                </div>
                <ul className="category__dishes">
                    {dishes.map((v, i) => {
                        console.log(dishes);
                        return <Dish name={v.dish_name} price={v.dish_price} photo={v.dish_image} key={i}/>;
                    })}
                </ul>
            </div>
        </div>

    )
}