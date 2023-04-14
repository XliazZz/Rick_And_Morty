import style from "./Error.module.css"
import img from "../Asserts/error.png"

const Errors = () => {
    return(
        <div className={style.error} >
            <h3 className="insulto">¡@#%$!</h3>
            <h1 className={style.notfound} >Page not found.</h1>
            <h3>Wubba Lubba Dub Dub.</h3>
            <h2 className={style.primero1} >4</h2>
        <img className={style.fondoError} src={img} alt="" />
            <h2 className={style.segundo2} >4</h2>
            <h4 className={style.youGun} >your <b>portal</b> gun must be busted... </h4>
        </div>
    )
}

export default Errors