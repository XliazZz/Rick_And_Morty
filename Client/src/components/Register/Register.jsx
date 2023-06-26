import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Register.module.css";
import validationRegister from "../validation/validationRegister";
import { registerUser, resetRegister } from "../../redux/Actions/actions";
import jerryMusculoso from "../Asserts/jerryMusculoso.png";
import { BiArrowBack } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { BsCheckCircle } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"
import RegisterGoogle from "./Google/RegisterGoogle";
import axios from "axios";

const Register = () => {
  const clientId = "529370659061-m0muo9lem1imsorkb8jbq7qkkb5c1kuo.apps.googleusercontent.com";
  const dispatch = useDispatch();
  let success = useSelector((state) => state.success )
  let error = useSelector((state) => state.error )
  const location = useLocation();

  const [errors, setErrors] = useState({});
  let [userData, setUserData] = useState({
      name: "",
      lastname: "",
      email: "",
      password: "",
      gender: "", 
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    setErrors(validationRegister({ ...userData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Realizar la solicitud POST
      await dispatch(registerUser(userData));
  
      const email = userData.email;
      const password = userData.password;
  
      if (userData.email) {
        const URL = 'http://localhost:3001/api/signin';
        let endpoint = URL + `?email=${email}&password=${password}`;
  
        // Realizar la solicitud GET
        const { data } = await axios.get(endpoint);
        const { token } = data;
        localStorage.setItem('token', token);
        navigate('/loading');
      } else {
        console.error('Email is required.');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  useEffect(() => {
    // Restablecer los valores iniciales del estado cuando se cambia de ruta
    setUserData({
      name: "",
      lastname: "",
      email: "",
      password: "",
      gender: "",
    });
    setErrors({});
    dispatch(resetRegister()); // Restablecer los valores globales de success y error
  }, [dispatch, location]);

  const isFormValid =
    !userData.email ||
    !userData.password ||
    !userData.name ||
    !userData.lastname ||
    Object.values(errors).some((error) => error.length > 0);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={style.div1}>
        <NavLink to="/">
          <button className={style.backForm}>
          <BiArrowBack className={style.botonBackCursor} />
          </button>
        </NavLink>

        <form className={style.form} onSubmit={handleSubmit}>
          
          <div className={style.formGroup}>
            <label className={style.labelForm} htmlFor="name">
                  Name:
            </label>

            <div className={style.inputContainer}>
              <input
                className={style.inputForm}
                value={userData.name}
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="Type your name..."
                disabled={success}
              />
              <div className={`${style.errorContainer} ${errors.name ? style.errorVisible : style.errorHidden}`}>
                {errors.name && <p className={style.errorForm}>{errors.name}</p>}
              </div>
            </div>
          </div>

          <div className={style.formGroup}>
            <label className={style.labelForm} htmlFor="lastname">
              LastName:
            </label>
            <div className={style.inputContainer}>
              <input
                className={style.inputForm}
                value={userData.lastname}
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Type your lastname..."
                onChange={handleChange}
                disabled={success}
              />
              <div className={`${style.errorContainer} ${errors.lastname ? style.errorVisible : style.errorHidden}`}>
                {errors.lastname && <p className={style.errorForm}>{errors.lastname}</p>}
              </div>
            </div>
          </div>

          <div className={style.formGroup}>
            <label className={style.labelForm} htmlFor="email">
              Email:
            </label>

            <div className={style.inputContainer}>
              <input
                className={style.inputForm}
                value={userData.email}
                type="text"
                id="email"
                name="email"
                placeholder="Type your email..."
                onChange={handleChange}
                disabled={success}
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
                className={style.inputForm}
                value={userData.password}
                type="password"
                id="password"
                name="password"
                placeholder="Type your password"
                onChange={handleChange}
                disabled={success}
              />
              <div className={`${style.errorContainer} ${errors.password ? style.errorVisible : style.errorHidden}`}>
                {errors.password && <p className={style.errorForm}>{errors.password}</p>}
              </div>
            </div>
          </div>

          <div className={style.genero}>
            <label htmlFor="male">Male</label>
            <input
              className={style.male}
              type="radio"
              id="male"
              name="gender"
              value="Male" // Asigna el valor directamente aquí
              checked={userData.gender === "Male"} // Asegura que se marque la opción seleccionada
              onChange={handleChange}
              disabled={success}
            />

            <label htmlFor="female">Female</label>
            <input
              className={style.female}
              type="radio"
              id="female"
              name="gender"
              value="Female" // Asigna el valor directamente aquí
              checked={userData.gender === "Female"} // Asegura que se marque la opción seleccionada
              onChange={handleChange}
              disabled={success}
            />

            <label htmlFor="other">Other</label>
            <input
              className={style.other}
              type="radio"
              id="other"
              name="gender"
              value="Other" // Asigna el valor directamente aquí
              checked={userData.gender === "Other"} // Asegura que se marque la opción seleccionada
              onChange={handleChange}
              disabled={success}
            />
          </div>

          <div className={style.div2}>
            <div className={style.terms}>
              <label htmlFor="terms">I accept the terms and conditions</label>
              <input                         
                className={style.female}
                type="checkbox" 
                name="terms" 
                id="terms" required 
                disabled={success}
              />
            </div>

          {success === true ? null : (
            <button
              type="submit"
              disabled={isFormValid}
              className={style.botonForm}
            >
              Register
            </button>
          )}

          <h4 className={style.h4Register}>Do you hava a account? <NavLink className={style.linkSign} to={"/login"}>Sign In</NavLink> </h4>
        </div>

        <hr style={{ width: '90%' } } />
        <div className={style.div3}>
          <RegisterGoogle/>
        </div>

        </form>

        {success && !error && (
          <div className={style.successContainerAlert}>
            <BsCheckCircle className={style.alertSuccess}/>
            {success && <p className={style.success}>User created</p>}
          </div>
        )}

        <img className={style.fotoPNG} src={jerryMusculoso} alt="Cromulon" />

        { error && !success && 
        <div className={style.errorContainerAlert}>
          <FiAlertCircle className={style.alert}/>
          {error && <p className={style.error1}>{error}</p>}
        </div> } 
          
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;