import {Link} from 'react-router-dom'

function Header(props) {
    return (
        <header className="d-flex justify-between align-center">
            <Link to="/">
            <div className="headerLeft d-flex align-center"> 
                <img width={40} height={40} src="/img/logo.png" alt="logo"/>
                <div className="headerInfo">
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5">Best sneakers store</p>
                </div>
            </div>
            </Link>
            <ul className="headerRight d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="/img/cart.svg" alt="cart"/>
                    <span>130 $</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="/favorites">
                    <img width={18} height={18} src="/img/heart.svg" alt="favorite"/>
                    </Link>
                </li>
                <li>
                    <img width={18} height={18} src="/img/acount.svg" alt="user"/>
                </li>
            </ul>
        </header>

    )
}

export default Header;
