import React from 'react'
import './Slider.scss'


export default function BtnBuy({buy, btnColor}) {
    console.log(btnColor)
  return (
    <button 
        style={{
            background: `#${btnColor}`,
        }}
        onClick={buy}
        className="btnBuy">
            Buy 
    </button>
  )
}