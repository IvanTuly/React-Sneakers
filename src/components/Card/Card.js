import React from 'react'
import styles from './Card.module.scss'
//добавляем .module в название scss чтобы работало - это подход css module

function Card({key, id, title, price, imageUrl, onFavorite, onPlus, favorited = false}) {

    // hook useState - для отслеживания состояния. React.useState(false) - значение по умолчанию. isAdded-переменная, setIsAdded - функция которая меняет значение
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    // переменная и внутрь передают функцию
    //если функция должна получать параменты, то вызывать  ()=> onClickButton(a,b)
    const onClickPlus = () =>{
        //вызываем метод из пропсов
        onPlus({title, price, imageUrl});
        // !-будет чередовать true и false
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () =>{
        onFavorite({id, title, price, imageUrl})
        setIsFavorite(!isFavorite)
    }


    return (
        // подключаем стиль через модуль, подключаем как объект."имя класса"
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img onClick={onClickFavorite} src={isFavorite ? "/img/heart-button-on.svg" : "/img/heart-button-off.svg"} alt="Unliked" />
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>price:</span>
                    <b>{price} $</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/addButtonOn.svg" : "/img/addButtonOff.svg"} alt="Plus Button" />

            </div>
        </div>
    )
}
export default Card;