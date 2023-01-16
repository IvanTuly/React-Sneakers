import React from "react";
import {Route, Routes} from 'react-router-dom'
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import Orders from "./pages/Orders";



//Context - 
export const AppContext = React.createContext({});

function App() {
  //массив для json файла с данными кроссовок
  const [items, setItems] = React.useState([])
  //массив для хранения специальных предложений
  const [offers, setOffers] = React.useState([])
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
          try {
          //устанавливаем отображение страницы в загрузке данных
          setIsLoading(true);

          //Через библиотеку axios отправляя get запрос получаем сразу результат без обработки json кроссовок, корзины и избранных
          //Promise.all позволяет отправить сразу несколько запросов. promise - который будет выполнять массив prommise axios.get - promise и вернет массив выполненных promise
          //если хотя бы один запрос не выполнется, то мы сразу получим error, хотя другие запросы могли пройти - иногда такой вариант может не подходить при разработке
          const [cartResponse, favoritesResponse,itemsResponse, offerResponse] = await Promise.all([
            axios.get("https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/cart.json"), 
            axios.get("https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/favorites.json"), 
            axios.get("https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/items.json"), 
            axios.get("https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/offers.json")
          ]);
  
          //устанавливаем отображение страницы c данными
          setIsLoading(false);
  
          //если в firebase нет данных он передает null а не пустой объект
          cartResponse.data === null ? setCartItems([]) : setCartItems(Object.values(cartResponse.data));
  
          favoritesResponse.data === null ? setFavorites([]) : setFavorites(Object.values(favoritesResponse.data));

          offerResponse.data === null ? setOffers([]) : setOffers(Object.values(offerResponse.data));
  
          setItems(Object.values(itemsResponse.data))
  
        } catch (error) {
          alert("Unable to load data")
          console.log(error)
        }
        }
  
        fetchData();
        


  }, [])

  //функция добавления в корзину конкретных кроссовок
  const onAddToCart = (obj) =>{
    //добавляем в массив путем замены предыдущих данных на обновленные
    //prev - прыдудущие данные. берем предыдущие данные, вызываем функцию которая к ним добавит объект и передает все в переменную
    try {
      if(cartItems.find(item => Number(item.parentId) === Number(obj.parentId))) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !==Number(obj.parentId)));
        axios.delete(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/cart/key_${obj.parentId}.json`);
      }
      else {
        // через библиотеку axios отправляем post запрос ключ - это длина массива корзины
        axios.put(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/cart/key_${obj.parentId}.json`, JSON.stringify(obj))
        setCartItems(prev => [...prev, obj])
        // .then(res =>setCartItems(prev => [...prev, res.data]))
      }
    }catch(error){
      alert("Unable to add sneakers")
      console.log(error)
    }
  }

  const onRemoveCartItem = (parentId) => {
    try {
          //prev - прыдудущие данные. при помощи filter отфильтровываем элемент с id который надо удалить
    setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(parentId)));
    //через библиотеку axios отправляем delete запрос  
    axios.delete(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/cart/key_${parentId}.json`)
      
    } catch (error) {
      alert("Unable to remove Item from cart")
      console.log(error)
    }
  }

  //функция добавления в избранное используем LS тк в mocApi только 2 бесплатных массива :(
  const onAddToFavorite = async (obj) =>{
      try {
              //ищем объект с таким же id как и у передаваемого, если есть. то удаляем
      if(favorites.find(item => Number(item.id) === Number(obj.id))){
        axios.delete(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/favorites/key_${obj.id}.json`);
        //удаляем из массива отфильтровывая по id
        setFavorites((prev) => [...prev.filter((item) => Number(item.id) !== Number(obj.id))]);
      } else{
        //когда дождется ответа, то запишет его в переменную resp - работает используя async. В принципе аналогично .then
        // {data} - из ответа берем ответ.data и записываем в переменную data
        const {data} = await axios.put(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/favorites/key_${obj.id}.json`, JSON.stringify(obj))

        setFavorites((prev) => [...prev, data]);
      }

      } catch (error){
        alert("Unable to add favorites")
        console.log(error)
      }
  }

  //функция поиска. таким образом динамически меняем содержимое input и переменной useState searchValue
  const onChangeSearchInput = (event) =>{
                  //свойство которое будет выделять у карточки кнопку добавления в корзину как добавлено или нет
              //some - как метод find, но вернет вместо объекта - true или false
    setSearchValue(event.target.value)
  }

  const isItemAdded = (parentId) => {
    if (parentId !=null){
      //проходит по массиву объектов и метод  some возвращает try если такой id найден
      return cartItems.some((obj) => Number(obj.parentId) === Number(parentId));
    }
  }

  const isItemFavorited = (parentId) => {
    if (parentId !=null){
      //проходит по массиву объектов и метод  some возвращает try если такой id найден
      return favorites.some((obj) => Number(obj.parentId) === Number(parentId));
    }
  }

  return ( 

    //все приложение будет знать, что есть в AppContext
  <AppContext.Provider value={{items, offers, cartItems, favorites, isItemAdded, isItemFavorited, onAddToFavorite, onAddToCart, setCartOpened, setCartItems}}>
    <div className={cartOpened ? "wrapper clear overflowHidden":' wrapper clear'}>
    
    
      <Drawer items={cartItems} onClose={()=>setCartOpened(false)} onRemoveItem={onRemoveCartItem } opened={cartOpened} />
    
     
      <Header onClickCart={()=>setCartOpened(true)}/>



      <Routes>
          <Route path="/React-Sneakers/"
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

          <Route path="/React-Sneakers/favorites" 
            element={
              <Favorites/>
            }
          ></Route>

          <Route path="/React-Sneakers/orders" 
            element={
              <Orders/>
            }
          ></Route>
        </Routes>
    </div>
  </AppContext.Provider>

  );
}

export default App;
