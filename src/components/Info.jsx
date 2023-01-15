import React from 'react'
import { AppContext } from '../App';

const Info = ({image, title, description}) => {
    const {setCartOpened} = React.useContext(AppContext)

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
        <img className="mb-20" width={120} src={process.env.PUBLIC_URL + image} alt="Empty Cart" />
        <h2>{title}</h2>
        <p className="opacity-6">{description}</p>
        <button onClick={() => setCartOpened(false)} className="greenButton">
            <img src={process.env.PUBLIC_URL +"/img/arrow.svg"} alt="arrow" /> Choose sneakers
        </button>
    </div>
  )
}

export default Info;
