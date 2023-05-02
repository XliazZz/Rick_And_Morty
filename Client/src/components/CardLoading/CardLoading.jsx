import style from "./CardLoading.module.css";

const CardLoading = () => {
    return (
        <div className={style.cardLoading}>
            <div className={style.imageLoading}></div>
            <div className={style.nameLoading}></div>
            <div className={style.statusLoading}></div>
        </div>
    )
};

export default CardLoading;