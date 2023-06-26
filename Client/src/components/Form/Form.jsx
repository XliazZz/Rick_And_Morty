import style from "./Form.module.css"
import { useState, useEffect } from "react";
import validation from "../validation/validation"
import { BiArrowBack } from "react-icons/bi"
import { NavLink } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import LoginGoogle from "./LoginGoogle"
import AlertError from "../AlertError/AlertError"
import AlertSuccess from "../AlertSuccess/AlertSuccess"
import { useNavigate } from "react-router";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();

  const [errores, setErrores] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/loading');
      }, 1000); // Ajusta el tiempo de espera en milisegundos (en este caso, 2 segundos)
    }
  }, [success, navigate]);

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
  
  const login = async (userData) => {
    const { email, password, userName } = userData;
    const URL = 'http://localhost:3001/api/signin';
  
    try {
      let endpoint = URL;
      if (email) {
        endpoint += `?email=${email}&password=${password}`;
      } else if (userName) {
        endpoint += `?userName=${userName}&password=${password}`;
      } else {
        console.error('Email or userName is required.');
        return;
      }
  
      const { data } = await axios.get(endpoint);
      const { token } = data; 
      localStorage.setItem('token', token); 
      setSuccess(true);
      setErrores(null);
    } catch (error) {
      setErrores(error.response.data.msg);
      setSuccess(false);
    }
  };

  const handleSubmit = (event) => {
        event.preventDefault()
        login(userData);
  }
    
  const clientId = "529370659061-m0muo9lem1imsorkb8jbq7qkkb5c1kuo.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={style.div1}>
        <NavLink to="/">
          <button className={style.backForm}>
            <BiArrowBack></BiArrowBack>
          </button>
        </NavLink>

        <form onSubmit={handleSubmit} className={style.form}>

          <div className={style.formGroup}>
            <label className={style.labelForm} htmlFor="email">
              Email:
            </label>

            <div className={style.inputContainer}>
              <input
                id="email"
                name="email" 
                type="email"
                placeholder="Type your email..."
                value={userData.email} 
                className={style.inputForm} 
                onChange={handleChange}  
              />
              <div className={`${style.errorContainer} ${errors.email ? style.errorVisible : style.errorHidden}`}>
                {errors.email && <p className={style.errorForm}>{errors.email}</p>} 
              </div>
            </div>
          </div>


          <div className={style.formGroup}>
            <label className={style.labelForm} htmlFor="password">
              Password:
            </label>

            <div className={style.inputContainer}>
              <input 
                id="password"
                name="password"
                value={userData.password}
                className={style.inputForm} 
                type="password"
                placeholder="Type your password..."
                onChange={handleChange} 
              />
              <div className={`${style.errorContainer} ${errors.password ? style.errorVisible : style.errorHidden}`}>
                {errors.password && <p className={style.errorForm} >{errors.password}</p> } 
              </div>
            </div>
          </div>

          <div className={style.div2}>
            <button
              type="submit"
              disabled={
              !userData.email ||
              !userData.password ||
              Object.values(errors).some((error) => error.length > 0)
              }
              className={style.botonForm}
            >
              Log In
            </button>

            <h4 className={style.h4Register}>Do you not hava a account? <NavLink className={style.linkSign} to={"/login"}>Sign Up</NavLink> </h4>
          </div>
                    
        <div className={style.div3}>
          <LoginGoogle />
        </div>

        </form>
        {errores && success === false && (
        <div >
          <AlertError error={errores} />
        </div>
      )}

      {errores === null && success && (
        <div >
          <AlertSuccess texto={"Log In success"} />
        </div>
      )}
      </div>
    </GoogleOAuthProvider>
  )
}

export default Form