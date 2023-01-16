import React from 'react'
import {Link} from 'react-router-dom'

export default function EmptyArrayBlock({pageTitle, title, subTitle}) {
  return (
    <div className="content p-40">
    <div className="d-flex align-center justify-between mb-50">
      <h1>{pageTitle}</h1>
    </div>
    <div className="emptyInformation">
      <img src={process.env.PUBLIC_URL +"/img/smile.png"} alt="Sad Smile" />
      <h2>{title}</h2>
      <p>{subTitle}</p>
      <Link to="/React-Sneakers/">
      <button onClick={console.log("click")} className="greenButton w10p">
          <img src={process.env.PUBLIC_URL +"/img/arrow.svg"} alt="arrow" /> Choose sneakers
      </button>
      </Link>
    </div>
    </div>
  )
}
