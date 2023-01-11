import React from "react";
import {Route, Routes} from 'react-router-dom'
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import Card from "./components/Card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  //массив для json файла с данными кроссовок
  const [items, setItems] = React.useState([])
  //массив для хранения товаров в корзине
  const [cartItems, setCartItems] = React.useState([])
  //массив для хранения закладок 
  const [favorites, setFavorites] = React.useState([])
  //для работы поиска
  const [searchValue, setSearchValue] = React.useState('')
  //отслеживаем открыта боковая корзина или нет
  const [cartOpened, setCartOpened] = React.useState(false)




  //такой код React.useEffect вызовет fetch запрос только один раз, тк мы не задаем функцию рендера  []
  React.useEffect(() => {
      //через библиотеку axios отправляя get запрос получаем сразу результат без обработки json
      axios.get("https://63bd3185d6600623889cf1e5.mockapi.io/items").then(res => {
        setItems(res.data)
      })
      //берем данные для корзины
      axios.get("https://63bd3185d6600623889cf1e5.mockapi.io/cart").then(res => {
        setCartItems(res.data)
      })

      const favoritesLS = JSON.parse(localStorage.getItem('favorites'))
      //парсим JSON из ls и записываем в favorites с помощью метода setFavorites
      if (favoritesLS !=null){
        setFavorites(favoritesLS)
      }

  }, [])

  //функция добавления в корзину конкретных кроссовок
  const onAddToCart = (obj) =>{
    //добавляем в массив путем замены предыдущих данных на обновленные
    //prev - прыдудущие данные. берем предыдущие данные, вызываем функцию которая к ним добавит объект и передает все в переменную
    

    //через библиотеку axios отправляем post запрос  
    axios.post("https://63bd3185d6600623889cf1e5.mockapi.io/cart", obj)
    .then(res =>setCartItems(prev => [...prev, res.data]))
  }
  const onRemoveCartItem = (id) => {
    console.log("id = "+id)
    //prev - прыдудущие данные. при помощи filter отфильтровываем элемент с id который надо удалить
    setCartItems(prev => prev.filter(item => item.id !== String(id)));
    //через библиотеку axios отправляем post запрос  
    axios.delete(`https://63bd3185d6600623889cf1e5.mockapi.io/cart/${id}`)
  }

    //функция добавления в избранное используем LS тк в mocApi только 2 бесплатных массива :(
    const onAddToFavorite = (obj) =>{

      //проверяем, если массив пустой - то добавляем один объект, если массив не пустой - то будем добавлять и перезаписывать
      if (favorites != null){
        //ищем индекс объекта по id если такой есть то удаляем, если нет - добавляем
        const index = favorites.findIndex(res => res.id == obj.id);
        if (index !== -1){
          console.log("удаляем")
          favorites.splice(index, 1)
        }else{
          console.log("добавляем")
          setFavorites((prev) => [...prev, obj]);
        }
      } else{
          console.log("favorites = null")
              setFavorites(obj);
      }

      console.log(favorites)
              //сохраняем в LS  
              localStorage.setItem('favorites', JSON.stringify(favorites));

    }

  //функция поиска. таким образом динамически меняем содержимое input и переменной useState searchValue
  const onChangeSearchInput = (event) =>{
    setSearchValue(event.target.value)
  }

  return ( <div className="wrapper clear">
    {cartOpened ? <Drawer items={cartItems} onClose={()=>setCartOpened(false)} onRemoveItem={onRemoveCartItem} /> :null }
    <Header onClickCart={()=>setCartOpened(true)}/>

    <Routes>
        <Route path="/"
          element={
            <Home 
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={(obj) => onAddToFavorite(obj)}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>

        <Route path="/favorites" 
          element={
            <Favorites 
              items={favorites}
              onAddToFavorite={onAddToFavorite}
            />
          }
        ></Route>
      </Routes>


  </div>
  );
}

export default App;
