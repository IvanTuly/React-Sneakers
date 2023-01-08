function App() {
  return <div className="wrapper clear">

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

  <div className="content p-40">
    <h1 className="mb-40">All sneakers</h1>
    
    <div className="d-flex">
      <div className="card">
      <img width={133} height={112} src="/img/sneakers/sneaker 0.png" alt="Sneakers"/>
      <h5>Man Sneakers Nike MDB</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>price:</span>
          <b>150 $</b>
        </div>
        <button className="button">
        <img width={11} height={11} src="/img/plus.svg" alt=""/>
        </button>
      </div>
      </div>

      <div className="card">
      <img width={133} height={112} src="/img/sneakers/sneaker 1.png" alt="Sneakers"/>
      <h5>Man Sneakers Nike MDB</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>price:</span>
          <b>150 $</b>
        </div>
        <button className="button">
        <img width={11} height={11} src="/img/plus.svg" alt=""/>
        </button>
      </div>
      </div>

      <div className="card">
      <img width={133} height={112} src="/img/sneakers/sneaker 2.png" alt="Sneakers"/>
      <h5>Man Sneakers Nike MDB</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>price:</span>
          <b>150 $</b>
        </div>
        <button className="button">
        <img width={11} height={11} src="/img/plus.svg" alt=""/>
        </button>
      </div>
      </div>

      <div className="card">
      <img width={133} height={112} src="/img/sneakers/sneaker 3.png" alt="Sneakers"/>
      <h5>Man Sneakers Nike MDB</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>price:</span>
          <b>150 $</b>
        </div>
        <button className="button">
        <img width={11} height={11} src="/img/plus.svg" alt=""/>
        </button>
      </div>
      </div>
      
    </div>
  </div>

</div>
}

export default App;
