import React from 'react';
import axios from 'axios';

import styles from './Drawer.module.scss'

import Info from '../Info'
import { AppContext } from '../../App';


//деструктуризация вместо props пишем конкретные методы, и это позволяет указать значение по умолчанию как в items=[]
function Drawer({ onClose, onRemoveItem, opened, items = [] }) {
    const {cartItems, setCartItems} = React.useContext(AppContext)
    const [orderId, setOrderId] = React.useState(false);
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + sum, 0)
   
    //если доработать то можно добавить счетчик заказов
    // axios.put(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/orders/orderCounter.json`,"1")
    // const orderCounter = axios.get(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/orders/orderCounter/123.json`)
    // console.log(orderCounter.data)

    const onClickOrder = async () =>{
        try {
            setIsLoading(true)
            //передаем заказ на бэк и сохраняем ответ response.data
            const {data} = await axios.post(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/orders/order/.json`, JSON.stringify(cartItems))
            //удаляем все элементы из корзины на бэке. не нашел как очистить сразу все содержимое, поэтому удаляем через id
            await axios.delete(`https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/cart.json`);
 

            //берем id созданный firebase чтобы отобразить в тексте заказ оформлен, тк он очень длинный будем показывать только последний несколько символов
            setOrderId(data.name.slice(15));

            //ставим состояние корзины как заказ выполнен, вместо кроссовок увидим надпись
            setIsOrderCompleted(true);
            //очищаем массив корзины
            setCartItems([]);
 
            
        } catch (error) {
            alert("Unable to make an order ")
            console.log(error)
        }
        setIsLoading(false)
    }

    // первый div -добавляем класс overlay и смотрим opened - если true добавляем еще класс overlayVisible который сделает корзину видимой
    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible:''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Cart <img onClick={onClose} className="removeBtn cu-p" src="/img/remove-button.svg" alt="Close Button" />
                </h2>


                { 
                    items.length > 0 ? 
                        <>
                            <div className="items">
 
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <img className="cartItemImg mr-20" width={70} height={70} src={obj.imageUrl} alt="Sneakers" />

                                        <div className="mr-15">
                                            <p mb-5>{obj.title}</p>
                                            <b>{obj.price}</b>
                                        </div>
                                        {/* при удалении берем id кроссовок, который генерирует mocapi и передаем его через props, чтобы потом при помощи id удалить его в бэке */}
                                        <img onClick={() => onRemoveItem(obj.id)} className="removeBtn" src="/img/remove-button.svg" alt="Remove Button" />
                                    </div>
                                ))}
                            </div>

                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Sum:</span>
                                        <div></div>
                                        <b>{totalPrice} $</b>
                                    </li>
                                    <li>
                                        <span>Tax 5%: </span>
                                        <div></div>
                                        <b>{totalPrice*0.05}$</b>
                                    </li>
                                </ul>

                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Checkout <img src="/img/arrow.svg" alt="Arrow" /></button>
                            </div>
                        </>



                        :
                        <Info 
                        title={isOrderCompleted ? "Order completed" : "Empty cart" }
                        description={isOrderCompleted ? `Your order #${orderId} will be delivered` :"You need to add at least one pair of sneakers to make order"} 
                        image={isOrderCompleted ? "/img/order-completed.png" : "/img/empty-cart.png"}/>

                } 






            </div>
        </div>
    )
}
export default Drawer;