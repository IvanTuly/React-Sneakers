import React from "react";
import Card from "../components/Card/Card";
import {AppContext} from "../App"

function Favorites() {
  
  //используем массив favorites из AppContext c помощью useContext
  //если useContext изменится все данные favorites сохраняем в переменную здесь и делаем ререндер
    const {favorites, onAddToFavorite} = React.useContext(AppContext);

    return (
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
            //в конце передаем объект item
            {... item}
          />
        ))}
        </div>
      </div>

    )
}

export default Favorites;