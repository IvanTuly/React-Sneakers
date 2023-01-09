import Card from "./components/Card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
  {name: 'Man Sneakers Nike MDB', price: '149', imageUrl: "/img/sneakers/sneaker 2.png"},
  {name: 'Man Sneaker New Balance 574', price: '105', imageUrl: "/img/sneakers/sneaker 5.png"},
  {name: 'Man Sneakers Adidas NMD', price: '129', imageUrl: "/img/sneakers/sneaker 1.png"}
];

function App() {
  return ( <div className="wrapper clear">
    <Drawer/>
    <Header/>

    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>All sneakers</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input placeholder="Search..." />
        </div>
      </div>

      <div className="d-flex">
        {/* react может сам проходить по массиву, поэтому необходимо его получить forEach не подходит, тк ничего не возвращает. Метод map filter find... - возвращают данные */}
        {/* через map прогоняем весь массив и через пропсы передаем имя цену и url в компонент Card */}
        {arr.map((obj) => (
        <Card title={obj.name} price={obj.price} imageUrl={obj.imageUrl} />
      ))}
      </div>
    </div>

  </div>
  );
}

export default App;
