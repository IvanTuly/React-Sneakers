import React from "react";
import Card from "../components/Card/Card";
import {AppContext} from "../App"
import EmptyArrayBlock from "../components/EmptyArrayBlock";

function Favorites() {
  
  //используем массив favorites из AppContext c помощью useContext
  //если useContext изменится все данные favorites сохраняем в переменную здесь и делаем ререндер
    const {favorites, onAddToFavorite, onAddToCart} = React.useContext(AppContext);

    return (

      favorites.length > 0 ? 
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>My Favorites</h1>
        </div>
  
        <div className="d-flex flex-wrap">

          {favorites.map((item) => (
            
          <Card 
          
            key={item.id}
            favorited={true}
            onFavorite={onAddToFavorite}
            onPlus ={(obj) => onAddToCart(obj)}
            //в конце передаем объект item
            {... item}
          />
        ))}
        </div>
      </div>
      :
      <EmptyArrayBlock pageTitle={"My Favorites"} title={"No Favorites"} subTitle={"Add sneakers to your favorites and they will appear here"}/>

    )
}

export default Favorites;