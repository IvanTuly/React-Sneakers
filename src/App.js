import React from "react";
import {Route, Routes} from 'react-router-dom'
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvuYu4ZkW-CrE-8hvbhmaO0M0zbhdQ3SM",
  authDomain: "react-sneakers-5eab4.firebaseapp.com",
  projectId: "react-sneakers-5eab4",
  storageBucket: "react-sneakers-5eab4.appspot.com",
  messagingSenderId: "661660216494",
  appId: "1:661660216494:web:b7dc3abf9f3ff5066a113f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Context - 
export const AppContext = React.createContext({});

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
  //отслеживаем загрузку страницы, чтобы выводить скелетон
  const [isLoading, setIsLoading] = React.useState(true)




  //такой код React.useEffect вызовет fetch запрос только один раз, тк мы не задаем функцию рендера  []
  React.useEffect(() => {
      //сам useEffect не может быть async - поэтому создаем асинхронную функцию внутри
      //используем, чтобы контролировать порядок загрузки данных, иначе может быть что корзина и изранные загрузятся позже основных данных и не повлияют на визуальное отображение
      async function fetchData(){
        //устанавливаем отображение страницы в загрузке данных
        setIsLoading(true);

        //берем данные для корзины
        const cartResponse = await axios.get("https://63bd3185d6600623889cf1e5.mockapi.io/cart")
        //берем данные для favorites
        const favoritesResponse = await axios.get("https://63bfc2a0a177ed68abb77341.mockapi.io/favorites")
        //Через библиотеку axios отправляя get запрос получаем сразу результат без обработки json
        const itemsResponse = await axios.get("https://63bd3185d6600623889cf1e5.mockapi.io/items")

        //устанавливаем отображение страницы c данными
        setIsLoading(false);

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)

      }

      fetchData();
  }, [])

  //функция добавления в корзину конкретных кроссовок
  const onAddToCart = (obj) =>{
    console.log(obj)
    //добавляем в массив путем замены предыдущих данных на обновленные
    //prev - прыдудущие данные. берем предыдущие данные, вызываем функцию которая к ним добавит объект и передает все в переменную
    try {
      if(cartItems.find(item => Number(item.parentId) === Number(obj.parentId))) {
        axios.delete(`https://63bd3185d6600623889cf1e5.mockapi.io/cart/${obj.parentId}`)
         setCartItems(prev => prev.filter(item => Number(item.parentId) !==Number(obj.parentId)))
      }
      else {
        // через библиотеку axios отправляем post запрос  
        axios.post("https://63bd3185d6600623889cf1e5.mockapi.io/cart", obj)
        setCartItems(prev => [...prev, obj])
        // .then(res =>setCartItems(prev => [...prev, res.data]))
      }
    }catch(error){
      alert("Unable to add sneakers")
    }
  }
  const onRemoveCartItem = (parentId) => {
    console.log("id = "+parentId)
    //prev - прыдудущие данные. при помощи filter отфильтровываем элемент с id который надо удалить
    setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(parentId)));
    //через библиотеку axios отправляем delete запрос  
    axios.delete(`https://63bd3185d6600623889cf1e5.mockapi.io/cart/${parentId}`)
  }

    //функция добавления в избранное используем LS тк в mocApi только 2 бесплатных массива :(
    const onAddToFavorite = async (obj) =>{
      try {
              //ищем объект с таким же id как и у передаваемого, если есть. то удаляем
      if(favorites.find(item => Number(item.id) === Number(obj.id))){
        axios.delete(`https://63bfc2a0a177ed68abb77341.mockapi.io/favorites/${obj.id}`);
        //удаляем из массива отфильтровывая по id
        setFavorites((prev) => [...prev.filter((item) => Number(item.id) !== Number(obj.id))]);
      } else{
        //когда дождется ответа, то запишет его в переменную resp - работает используя async. В принципе аналогично .then
        // {data} - из ответа берем ответ.data и записываем в переменную data
        const {data} = await axios.post(`https://63bfc2a0a177ed68abb77341.mockapi.io/favorites/`, obj)

        setFavorites((prev) => [...prev, data]);
      }

      } catch (error){
        alert("Unable to add favorites")
      }
    }

  //функция поиска. таким образом динамически меняем содержимое input и переменной useState searchValue
  const onChangeSearchInput = (event) =>{
                  //свойство которое будет выделять у карточки кнопку добавления в корзину как добавлено или нет
              //some - как метод find, но вернет вместо объекта - true или false
    setSearchValue(event.target.value)
  }

  const isItemAdded = (parentId) => {
    //проходит по массиву объектов и метод  some возвращает try если такой id найден
    return cartItems.some((obj) => Number(obj.parentId) === Number(parentId));
  }

  return ( 
    //все приложение будет знать, что есть в AppContext
  <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
    <div className="wrapper clear">
      {cartOpened ? <Drawer items={cartItems} onClose={()=>setCartOpened(false)} onRemoveItem={onRemoveCartItem} /> :null }
      <Header onClickCart={()=>setCartOpened(true)}/>

      <Routes>
          <Route path="/"
            element={
              <Home 
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={(obj) => onAddToFavorite(obj)}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>

          <Route path="/favorites" 
            element={
              <Favorites/>
            }
          ></Route>
        </Routes>
    </div>
  </AppContext.Provider>

  );
}

export default App;
