import Card from "../components/Card/Card";
function Favorites({items, onAddToFavorite}) {
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>My Favorites</h1>
        </div>
  
        <div className="d-flex flex-wrap">

        {console.log(items)}
          {items.map((item) => (
            
          <Card 
          
            key={item.id}
            title={item.name} 
            price={item.price} 
            imageUrl={item.imageUrl}
            favorited={true}
            onFavorite={onAddToFavorite}
          />
        ))}
        </div>
      </div>

    )
}

export default Favorites;