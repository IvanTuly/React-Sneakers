import React from 'react';
import axios from 'axios';
import Info from './Info'
import { AppContext } from '../App';

// функция задержки чтобы удалять из mockApi по 1му элементу, тк нет удаления всего массива
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

//деструктуризация вместо props пишем конкретные методы, и это позволяет указать значение по умолчанию как в items=[]
function Drawer({ onClose, onRemoveItem, items = [] }) {
    const {cartItems, setCartItems} = React.useContext(AppContext)
    const [orderId, setOrderId] = React.useState(false);
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

   

    const onClickOrder = async () =>{
        try {
            setIsLoading(true)
            //передаем заказ на бэк
            const {data} = await axios.post(`https://63bfc2a0a177ed68abb77341.mockapi.io/orders`, {items: cartItems});

            //удаляем все элементы из корзины на бэке. не нашел как очистить сразу все содержимое, поэтому удаляем через id
            for (let i=0; i<cartItems.length; i++){
                const item = cartItems[i]
                await axios.delete(`https://63bd3185d6600623889cf1e5.mockapi.io/cart/${item.id}`);
                await delay(1000)
            }

            //берем id чтобы отобразить в тексте заказ оформлен
            setOrderId(data.id);
            //очищаем кознину на бэке
            // await axios.put("https://63bd3185d6600623889cf1e5.mockapi.io/cart/", []);
            //ставим состояние корзины как заказ выполнен, вместо кроссовок увидим надпись
            setIsOrderCompleted(true);
            //очищаем массив корзины
            setCartItems([]);
 
            
        } catch (error) {
            alert("Unable to make an order " + error)
        }
        setIsLoading(false)
    }

    // style={{ display: 'none' }}
    return (
        <div className="overlay">
            <div className="drawer">
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
                                        <img onClick={() => onRemoveItem(obj.parentId)} className="removeBtn" src="/img/remove-button.svg" alt="Remove Button" />
                                    </div>
                                ))}
                            </div>

                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Sum:</span>
                                        <div></div>
                                        <b>300$</b>
                                    </li>
                                    <li>
                                        <span>Tax 5%: </span>
                                        <div></div>
                                        <b>15$</b>
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