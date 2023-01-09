function Drawer() {
    return (
        <div style={{ display: 'none' }} className="overlay">
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Cart <img className="removeBtn cu-p" src="/img/remove-button.svg" alt="Remove Button" /></h2>

                <div className="items">
                    <div className="cartItem d-flex align-center mb-20">
                        <img className="cartItemImg mr-20" width={70} height={70} src="/img/sneakers/sneaker 0.png" alt="Sneakers" />

                        <div className="mr-15">
                            <p mb-5>Man sneakers Nike Air Flow</p>
                            <b>150 $</b>
                        </div>
                        <img className="removeBtn" src="/img/remove-button.svg" alt="Remove Button" />
                    </div>

                    <div className="cartItem d-flex align-center mb-20">
                        <img className="cartItemImg mr-20" width={70} height={70} src="/img/sneakers/sneaker 0.png" alt="Sneakers" />

                        <div className="mr-15">
                            <p mb-5>Man sneakers Nike Air Flow</p>
                            <b>150 $</b>
                        </div>
                        <img className="removeBtn" src="/img/remove-button.svg" alt="Remove Button" />
                    </div>
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
        </div>
    )
}
export default Drawer;