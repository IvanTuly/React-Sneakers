import React from 'react';
//библиотека react skeleton
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
//добавляем .module в название scss чтобы работало - это подход css module

import { AppContext } from "../../App"

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
    added = false,
    loading = false
}) {

    //из useContext берем функцию isItemAdded
    const { isItemAdded, isItemFavorited } = React.useContext(AppContext);

    // hook useState - для отслеживания состояния. React.useState(false) - значение по умолчанию. isAdded-переменная, setIsAdded - функция которая меняет значение
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    // переменная и внутрь передают функцию
    //если функция должна получать параменты, то вызывать  ()=> onClickButton(a,b)
    const onClickPlus = () => {
        //вызываем метод из пропсов
        onPlus({ id, parentId, title, price, imageUrl });
    }

    const onClickFavorite = () => {
        onFavorite({ id, parentId, title, price, imageUrl })
        setIsFavorite(!isFavorite)
    }


    return (
        // подключаем стиль через модуль, подключаем как объект."имя класса"
        <div className={styles.sneakerCard}>
            {
                loading ?
                <ContentLoader 
                speed={2}
                width={240}
                height={340}
                viewBox="0 0 240 340"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
    <rect x="0" y="0" rx="0" ry="0" width="240" height="240" /> 
    <rect x="185" y="270" rx="0" ry="0" width="45" height="45" /> 
    <rect x="13" y="245" rx="0" ry="0" width="220" height="12" /> 
    <rect x="13" y="268" rx="0" ry="0" width="130" height="12" /> 
    <rect x="13" y="295" rx="0" ry="0" width="100" height="11" />
              </ContentLoader>
                    : 
                            
                
                    <>
                    <div className={styles.sneakerPhoto}>
	                    <img className={styles.photo} src={process.env.PUBLIC_URL + imageUrl} alt="Sneaker photo"/>
                        <img 
                        onClick={onClickFavorite} 
                        className={styles.like} 
                        src={isItemFavorited(parentId) ? process.env.PUBLIC_URL + "/img/heart-button-on.svg" : process.env.PUBLIC_URL + "/img/heart-button-off.svg" } 
                        alt="Like"/>
       	                <p className={styles.price}>{price} $</p>                 
                    </div>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subTitle}>Originals</div>
                    {/* если передали onPlus - отображаем кнопку +, если нет - не отображаем */}
                    {onPlus && (
                    <img 
                    className={styles.cart} 
                    onClick={onClickPlus} 
                    src={isItemAdded(parentId) ? process.env.PUBLIC_URL + "/img/addButtonOn.svg" : process.env.PUBLIC_URL + "/img/addButtonOff.svg" } 
                    alt="Plus Button" />
                    )}
                    </>

                            

                    

            }
        </div>
    )
}
export default Card;
