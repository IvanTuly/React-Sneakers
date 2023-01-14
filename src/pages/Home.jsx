import React from "react";
import Card from "../components/Card/Card";
import Slider from "../components/Slider/Slider";


function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading}) {

    const renderItems = () => {
        // react может сам проходить по массиву, поэтому необходимо его получить forEach не подходит, тк ничего не возвращает. Метод map filter find... - возвращают данные 
        // filter проходится по массиву и исключает все элементы item у которых нет того, что написано в searchValue чтобы не было проблем с регистром переводим все в нижний 
        // через map прогоняем весь массив и через пропсы передаем имя цену и url в компонент Card 
        //   если загрузка идет, то пепердаем массив из 10 undefined объектов, если загрузка не идет - передаем items
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (
            
        isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
            
          <Card 
              key={index}
              onFavorite ={(obj) => onAddToFavorite(obj)}
              //получаем объект с конкретными кроссовками из Card.js можно было вместо obj взять просто item отсюда
              onPlus ={(obj) => onAddToCart(obj)}
              loading={isLoading}
              //в конце передаем объект item
              {... item}
          />
      ))

    }
    return (
        
        <div className="content p-40">
             <Slider/>
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
          {renderItems()}
        </div>
      </div>
    
    )
}

export default Home;