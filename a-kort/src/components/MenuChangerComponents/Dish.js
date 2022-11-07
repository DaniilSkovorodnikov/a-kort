import {useEffect, useState} from "react";
import Modal from "./Modal";

export default function Dish({name, price, photo, description, categoryDishes, updateCategoryDishes}){
    const [prev_name, setPrevName] = useState(name)
    const [dish_name, setName] = useState(name)
    const [dish_price, setPrice] = useState(price)
    const [dish_img, setImg] = useState(photo)
    const [dish_description, setDescription] = useState(description)
    useEffect(() =>{
        setName(name);
        setPrice(price)
        setImg(photo)
        setDescription(description)
    }, [categoryDishes])


    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        setImg(fileReader.result)
    }

    function updateDish(){
        const dish = {
            dish_name,
            dish_price,
            dish_description,
            dish_img
        }
        updateCategoryDishes((prevState) => {
            const index = prevState.findIndex((v) => v.dish_name === prev_name);
            prevState[index] = dish;
            return prevState
        })
    }

    const [visible, setVisible] = useState(false)
    return(
        <div>
            <Modal visible={visible}>
                <div className="dish-adder">
                    <div className="dish-characteristics" onClick={(e) => e.stopPropagation()}>
                        <div className="dish-characteristics__left">
                            <input
                                className="dish-characteristics__photo"
                                type="file"
                                onChange={(e) => {
                                    fileReader.readAsDataURL(e.target.files[0])
                                }}
                            />
                            <div className="dish-characteristics__numerical">
                                <input
                                    className="dish-characteristics__price"
                                    placeholder="Цена"
                                    value={dish_price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <button
                                    className="dish-characteristics__add-btn"
                                    onClick={() => {
                                        setVisible(false);
                                        updateDish()
                                    }
                                    }
                                >
                                    Закрыть
                                </button>
                            </div>
                        </div>
                        <div className="dish-characteristics__right">
                            <input
                                className="dish-characteristics__name"
                                placeholder="Название"
                                value={dish_name}
                                onChange={(e) => {
                                    setPrevName(name)
                                    setName(e.target.value)
                                }}
                            />
                            <input
                                className="dish-characteristics__desc"
                                placeholder="Описание"
                                value={dish_description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            <div className="dish" onClick={() => setVisible(true)}>
                <img src={dish_img} width={245} height={160} alt="" className="dish__photo"/>
                <h2 className="dish__name">{dish_name}</h2>
                <p className="dish__price">{dish_price} <span>&#8381;</span></p>
            </div>
        </div>
    );
}