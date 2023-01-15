export default function Order({id, dishes}){
    return(
        <div className="order">
            <div className="order__header">
                <h3 className="order__id">Заказ №{id}</h3>
                <button className="order__btn" onClick={() => {
                    fetch(`http://26.87.4.182:8000/make_order_completed/?id=${id}`)
                        .then((res) => res.json())
                        .then((res => console.log(res)))
                        .catch((err) => console.log(err))
                }}>Отметить готовым</button>
            </div>
            <ul className="order__dishes">
                {dishes.map((v,i) =>
                    <li className="order__dish" key={i}>
                        <h4 className="order__dish-name">{v.name}</h4>
                        <p className="count">{v.quantity}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}