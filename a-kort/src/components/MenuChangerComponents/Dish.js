export default function Dish({name, price, photo}){
    return(
      <div className="dish">
          <img src={photo} width={245} height={160} alt="" className="dish__photo"/>
          <h2 className="dish__name">{name}</h2>
          <p className="dish__price">{price} ₽</p>
      </div>
    );
}