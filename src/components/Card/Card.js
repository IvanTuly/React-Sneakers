import styles from './Card.module.scss'
//добавляем .module в название scss чтобы работало - это подход css module

function Card(props) {

    // переменная и внутрь передают функцию
    //если функция должна получать параменты, то вызывать  ()=> onClickButton(a,b)
    const onClickButton = () =>{
        alert(props.price)
    }


    return (
        // подключаем стиль через модуль, подключаем как объект."имя класса"
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/img/heart-button-on.svg" alt="Unliked" />
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="Sneakers" />
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>price:</span>
                    <b>{props.price} $</b>
                </div>
                <button className="button" onClick={onClickButton}>
                    <img width={11} height={11} src="/img/plus.svg" alt="" />
                </button>
            </div>
        </div>
    )
}
export default Card;