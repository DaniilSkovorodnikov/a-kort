import {useEffect, useState} from "react";
import {YMaps, Map, Placemark} from "react-yandex-maps";

function getDistance(lat1,lon1,lat2,lon2,name){
    const R = 6371;
    const dLat = (lat2-lat1) * (Math.PI / 180);
    const dLon = (lon2-lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    return {
        distance: (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2),
        latitude: lat2,
        longitude: lon2,
        name
    };
}

export default function FoodcourtMap({positions, setCurrentFoodcourt, setVisible}){
    const [userPos, setUserPos] = useState({})
    const [nearest, setNearest] = useState({})
    const [minDistance, setMinDistance] = useState(0)
    const [foodcourts, setFoodcourts] = useState(positions)
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const currentPos = {userLatitude: pos.coords.latitude, userLongitude: pos.coords.longitude}
            setUserPos(currentPos)
            const foodcourts = positions.map((v) => getDistance(currentPos.userLatitude, currentPos.userLongitude, v.latitude, v.longitude, v.name))
            setFoodcourts(foodcourts);
            let minDistance = 10000000000;
            let nearestFoodcourt = {}
            console.log(foodcourts);
            for (const foodcourt of foodcourts){
                if(foodcourt.distance < minDistance){
                    minDistance = foodcourt.distance
                    nearestFoodcourt = foodcourt
                }
            }
            setNearest(nearestFoodcourt)
            setMinDistance(minDistance)
        }, (err) => {
            alert("Включите доступ к геолокации")
        })
    }, [])

    return (<YMaps>
        <div className="map__change">
            <Map defaultState={{center: [nearest.latitude, nearest.longitude], zoom: 15}} className="nearest-foodcourt" state={{center: [nearest.latitude, nearest.longitude], zoom: 15}}>
                {positions.map((v,i) => <Placemark geometry={[v.latitude, v.longitude]} options={{preset: 'islands#redDotIcon'}} key={i}/>)}
                {userPos.userLatitude ? <Placemark geometry={[userPos.userLatitude, userPos.userLongitude]} options={{preset: 'islands#greenDotIcon'}}/> : ''}
            </Map>
            <ul className="map__foodcourts">
                {positions.map((v, i) =>
                    <li className="map__item" key={i}>
                        <p>{v.name}</p>
                        <button className="map__change" onClick={() => {
                            setNearest(foodcourts.find((pos) => pos.name === v.name))
                        }}>Выбрать</button>
                    </li>
                )}
            </ul>
        </div>
        <p className="map__distance">Расстояние до фудкорта ({nearest.name}): {nearest.distance} км</p>
        <button className="map__apply" onClick={() => {
            setCurrentFoodcourt(nearest.name)
            setVisible(false)
        }}>Подтвердить</button>
    </YMaps>)
}