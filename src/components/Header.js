function Header() {
    return (
        <header className="d-flex justify-between align-center">
            <div className="headerLeft d-flex align-center">
                <img width={40} height={40} src="/img/logo.png" />
                <div className="headerInfo">
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5">Best sneakers store</p>
                </div>
            </div>
            <ul className="headerRight d-flex">
                <li className="mr-30">
                    <img width={18} height={18} src="/img/cart.svg" />
                    <span>130 $</span>
                </li>
                <li>
                    <img width={18} height={18} src="/img/account.svg" />
                </li>
            </ul>
        </header>

    )
}

export default Header;
