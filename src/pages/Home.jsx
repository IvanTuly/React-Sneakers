import Card from "../components/Card/Card";
function Home({items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart}) {
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          {/* если что-то есть в поиске - то выводим это, если поиск пуст - то "All sneakers" */}
          <h1>{searchValue ? `Search: ${searchValue}` : 'All sneakers'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {/* контролирумый input - все что мы пишем в него - получаем в переменную useState и передает в свой же value */}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
          </div>
        </div>
  
        <div className="d-flex flex-wrap">
            
          {/* react может сам проходить по массиву, поэтому необходимо его получить forEach не подходит, тк ничего не возвращает. Метод map filter find... - возвращают данные */}
          {/* filter проходится по массиву и исключает все элементы item у которых нет того, что написано в searchValue чтобы не было проблем с регистром переводим все в нижний */}
          {/* через map прогоняем весь массив и через пропсы передаем имя цену и url в компонент Card */}
          {items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
 
          <Card 
            key={item.id}
            id={item.id} 
            title={item.name} 
            price={item.price} 
            imageUrl={item.imageUrl}
            onFavorite ={(obj) => onAddToFavorite(obj)}
            //получаем объект с конкретными кроссовками из Card.js можно было вместо obj взять просто item отсюда
            onPlus ={(obj) => onAddToCart(obj)}
          />
        ))}
        </div>
      </div>
    
    )
}

export default Home;