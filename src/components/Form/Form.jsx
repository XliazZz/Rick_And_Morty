import style from "./Form.module.css"
import { useState } from "react"
import validation from "../validation/validation"

const Form = ({ login }) => {

    const [errors, setErrors] = useState({})
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData);
    }   

    return (
        <div className={style.contenedorDiv}>
            <form onSubmit={handleSubmit} className={style.contenedorForm}>
                <label className={style.labelForm} htmlFor="email">Email:</label>
                <input
                id="email"
                name="email" 
                value={userData.email} 
                className={style.inputForm} 
                type="email"
                placeholder="Type your email..."
                onChange={handleChange}  />
                {errors.email && <p className={style.p1}>{errors.email}</p> } 

                <label className={style.labelForm2} htmlFor="password">Password:</label>
                <input 
                id="password"
                name="password"
                value={userData.password}
                className={style.inputForm2} 
                type="password"
                placeholder="Type your password..."
                onChange={handleChange} />
                {errors.password && <p className={style.p2} >{errors.password}</p> } 

                <button className={style.botonForm} 
                disabled={!userData.email || !userData.password || errors.email || errors.password} >Submit</button>
            </form>
        </div>
    )
}

export default Form