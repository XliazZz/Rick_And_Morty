import style from "./Form.module.css"
import { useState } from "react"
import validation from "../validation/validation"
import { BiArrowBack } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import LoginGoogle from "./LoginGoogle"

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
    
  const clientId = "529370659061-m0muo9lem1imsorkb8jbq7qkkb5c1kuo.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={style.contenedorDiv}>
        <NavLink to="/">
          <button className={style.backForm}><BiArrowBack></BiArrowBack></button>
        </NavLink>

        <form onSubmit={handleSubmit} className={style.contenedorForm}>
          <label className={style.labelForm} htmlFor="email">Email:</label>
          <input
          id="email"
          name="email" 
          type="email"
          placeholder="Type your email..."
          value={userData.email} 
          className={style.inputForm} 
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

          <button
            type="submit"
            disabled={
            !userData.email ||
            !userData.password ||
            Object.values(errors).some((error) => error.length > 0)
            }
            className={style.botonForm}
          >
            Submit
          </button>
          <LoginGoogle />
        </form>
      </div>
    </GoogleOAuthProvider>
  )
}

export default Form