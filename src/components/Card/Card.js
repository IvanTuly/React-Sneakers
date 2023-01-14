import React from 'react';
//библиотека react skeleton
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
//добавляем .module в название scss чтобы работало - это подход css module

import {AppContext} from "../../App"

function Card({
    key, 
    id, 
    parentId,
    title, 
    price, 
    imageUrl, 
    onFavorite, 
    onPlus, 
    favorited = false, 
    added=false,
    loading=false
}) {

    //из useContext берем функцию isItemAdded
    const {isItemAdded} = React.useContext(AppContext);
    
    // hook useState - для отслеживания состояния. React.useState(false) - значение по умолчанию. isAdded-переменная, setIsAdded - функция которая меняет значение
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    // переменная и внутрь передают функцию
    //если функция должна получать параменты, то вызывать  ()=> onClickButton(a,b)
    const onClickPlus = () =>{
        //вызываем метод из пропсов
        onPlus({id, parentId, title, price, imageUrl});
    }

    const onClickFavorite = () =>{
        onFavorite({id, parentId, title, price, imageUrl})
        setIsFavorite(!isFavorite)
    }


    return (
        // подключаем стиль через модуль, подключаем как объект."имя класса"
        <div className={styles.card}>
            {
                loading ?
                    <ContentLoader 
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
                    <rect x="0" y="107" rx="3" ry="3" width="150" height="15" /> 
                    <rect x="0" y="130" rx="3" ry="3" width="93" height="15" /> 
                    <rect x="118" y="155" rx="8" ry="8" width="32" height="32" /> 
                    <rect x="0" y="160" rx="8" ry="8" width="80" height="24" />
                    </ContentLoader> 
                    : <> 
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
                            {/* если передали onPlus - отображаем кнопку +, если нет - не отображаем */}
                        {onPlus && (<img 
                            className={styles.plus} 
                            onClick={onClickPlus} 
                            src={isItemAdded(parentId) ? "/img/addButtonOn.svg" : "/img/addButtonOff.svg"} 
                            alt="Plus Button" 
                            />)}            
                        </div>
                    </>

            }
        </div>
    )
}
export default Card;
