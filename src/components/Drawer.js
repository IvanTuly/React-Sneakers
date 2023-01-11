
//деструктуризация вместо props пишем конкретные методы, и это позволяет указать значение по умолчанию как в items=[]
function Drawer({ onClose, onRemoveItem, items = [] }) {
    // style={{ display: 'none' }}
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">
                    Cart <img onClick={onClose} className="removeBtn cu-p" src="/img/remove-button.svg" alt="Close Button" />
                </h2>

                {
                    items.length > 0 ?
                    <div>
                                                    <div className="items">
                                {items.map((obj) => (
                                    <div className="cartItem d-flex align-center mb-20">
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
                                        <b>300$</b>
                                    </li>
                                    <li>
                                        <span>Tax 5%: </span>
                                        <div></div>
                                        <b>15$</b>
                                    </li>
                                </ul>

                                <button className="greenButton">Checkout <img src="/img/arrow.svg" alt="Arrow" /></button>
                            </div>
                    </div>

                     

                        :
                        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                            <img className="mb-20" width={120} height={120} src="/img/empty-cart.png" alt="Empty Cart" />
                            <h2>Empty cart</h2>
                            <p className="opacity-6">You need to add at least one pair of sneakers to make order</p>
                            <button onClick={onClose} className="greenButton">
                                <img src="/img/arrow.svg" alt="arrow" /> Choose sneakers
                            </button>
                        </div>

                }






            </div>
        </div>
    )
}
export default Drawer;