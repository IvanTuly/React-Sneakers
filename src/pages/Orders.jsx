import React from "react";
import Card from "../components/Card/Card";
import {AppContext} from "../App"
import axios from "axios";

export function Orders() {
    const {onAddToCart, onAddToFavorite} =React.useContext(AppContext)
    //массив для файла с данными заказов
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {

        async function fetchData(){
            try {
                const { data } = await axios.get("https://react-sneakers-5eab4-default-rtdb.europe-west1.firebasedatabase.app/orders/order.json")
            
                if (data === null){
                    setOrders([])
                  }else{
                    setOrders(Object.values(data).flat())
                  }
                
            } catch (error) {
                alert("Unable to load orders, error: " + error )
            }
              setIsLoading(false)
        }
        fetchData()
        
    }, []);



    return (
       
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>My Orders</h1>
        </div>
  
        <div className="d-flex flex-wrap">

          {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                      <Card 
                      key={index}
                      onFavorite ={(obj) => onAddToFavorite(obj)}
                      loading={isLoading}
                      //в конце передаем объект item
                      {... item}
                  />


            
        ))}
        </div>
      </div>

    )
}

export default Orders;