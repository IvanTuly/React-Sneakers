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
    const { isItemAdded } = React.useContext(AppContext);

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
                    : 
                            
                
                    <>
                    <div className={styles.sneakerPhoto}>
	                    <img className={styles.photo} src={process.env.PUBLIC_URL + imageUrl} alt="Sneaker photo"/>
                        <img onClick={onClickFavorite} className={styles.like} src={isFavorite ? process.env.PUBLIC_URL + "/img/heart-button-on.svg" : process.env.PUBLIC_URL + "/img/heart-button-off.svg" } alt="Like"/>
       	                <p className={styles.price}>{price} $</p>                 
                    </div>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subTitle}>Originals</div>
                    {/* если передали onPlus - отображаем кнопку +, если нет - не отображаем */}
                    {onPlus && (<img className={styles.cart} onClick={onClickPlus} src={isItemAdded(parentId) ? process.env.PUBLIC_URL + "/img/addButtonOn.svg" : process.env.PUBLIC_URL + "/img/addButtonOff.svg" } alt="Plus Button" />)}
                    </>

                            

                    

            }
        </div>
    )
}
export default Card;
