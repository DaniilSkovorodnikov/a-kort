import MenuHeader from './MenuHeader.js'
import '../../styles/MenuChanger.scss'
import Modal from "./Modal";
import {useState} from "react";
import Category from "./Category";

export default function MenuChanger(){
    const [visibleCategoryAdder, setVisibleCategoryAdder] = useState(false);
    const [visibleDishAdder, setVisibleDishAdder] = useState(false)

    const [categories, setCategories] = useState([])
    const [categoryName, setCategoryName] = useState("")

    const [price, setPrice] = useState('')
    const [name, setDishName] = useState('')
    const [desc, setDesc] = useState('')
    const [dishes, setDishes] = useState([])

    return (
        <div className="menu-changer">
            <Modal visible={visibleCategoryAdder} setVisible={setVisibleCategoryAdder}>
                <div className="category-adder__content" onClick={(e) => e.stopPropagation()}>
                    <input className="category-adder__name"
                           value={categoryName}
                           onChange={(e) => setCategoryName(e.target.value)}
                           placeholder="Введите название категории"
                    />
                    <button onClick={() => {
                        setCategories([...categories, categoryName])
                        setVisibleCategoryAdder(false);
                    }} className="category-adder__add-btn">Добавить категорию</button>
                </div>
            </Modal>
            <Modal visible={visibleDishAdder} setVisible={setVisibleDishAdder}>
                <div className="dish-adder">
                    <div className="dish-characteristics" onClick={(e) => e.stopPropagation()}>
                        <div className="dish-characteristics__left">
                            <input
                                className="dish-characteristics__photo"
                                type="file"
                            />
                            <div className="dish-characteristics__numerical">
                                <input
                                    className="dish-characteristics__price"
                                    placeholder="Цена"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <button
                                    className="dish-characteristics__add-btn"
                                    onClick={() => {
                                        setVisibleDishAdder(false);
                                        setDishes([...dishes, {
                                            price,
                                            name,
                                            desc
                                        }])
                                    }
                                }
                                >
                                    Добавить блюдо
                                </button>
                            </div>
                        </div>
                        <div className="dish-characteristics__right">
                            <input
                                className="dish-characteristics__name"
                                placeholder="Название"
                                onChange={(e) => setDishName(e.target.value)}
                            />
                            <input
                                className="dish-characteristics__desc"
                                placeholder="Описание"
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            <MenuHeader setVisible={setVisibleCategoryAdder} />
            <div className="menu">
                {categories.map((v, index) => <Category name={v} key={index} setVisible={setVisibleDishAdder}/>)}

            </div>
        </div>
    );
}