import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Register.module.css";
import validationRegister from "../validation/validationRegister";
import { registerUser } from "../../redux/Actions/actions";
import jerryMusculoso from "../Asserts/jerryMusculoso.png";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false); // nueva variable de estado

    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        gender: "", // El valor seleccionado del género se guardará aquí
    });

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
        dispatch(registerUser(userData));
        console.log(userData);
        } catch (error) {
        console.error("Error", error.message);
        }
    };

    const isFormValid =
        !userData.email ||
        !userData.password ||
        !userData.name ||
        !userData.lastname ||
        Object.values(errors).some((error) => error.length > 0);

    const success = useSelector((state) => state.success )

    return (
        <div className={style.contenedorDiv}>
        <NavLink to="/">
            <button className={style.backForm}>
            <BiArrowBack className={style.botonBackCursor} />
            </button>
        </NavLink>

        <form className={style.contenedorForm} onSubmit={handleSubmit}>
            <div className={style.formGroup}>
            <label className={style.labelForm} htmlFor="name">
                Name:
            </label>
            <input
                className={style.inputForm}
                value={userData.name}
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="Type your name..."
            />
            {errors.name && <p className={style.p1}>{errors.name}</p>}
            </div>

            <div className={style.formGroup}>
            <label className={style.labelForm} htmlFor="lastname">
                LastName:
            </label>
            <input
                className={style.inputForm}
                value={userData.lastname}
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Type your lastname..."
                onChange={handleChange}
            />
            {errors.lastname && <p className={style.p2}>{errors.lastname}</p>}
            </div>

            <div className={style.formGroup}>
                <label className={style.labelForm} htmlFor="email">
                    Email:
                </label>
                <input
                    className={style.inputForm}
                    value={userData.email}
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Type your email..."
                    onChange={handleChange}
                />
                {errors.email && <p className={style.p3}>{errors.email}</p>}
            </div>

            <div className={style.formGroup}>
                <label className={style.labelForm} htmlFor="password">
                    Password:
                </label>
                <input
                    className={style.inputForm}
                    value={userData.password}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Type your password"
                    onChange={handleChange}
                    />
                    {errors.password && <p className={style.p4}>{errors.password}</p>}
            </div>

                <div className={style.Genero}>
                    <label htmlFor="male">Male</label>
                    <input
                        className={style.male}
                        type="radio"
                        id="male"
                        name="gender"
                        value="Masculino" // Asigna el valor directamente aquí
                        checked={userData.gender === "Masculino"} // Asegura que se marque la opción seleccionada
                        onChange={handleChange}
                    />

                    <label htmlFor="female">Female</label>
                    <input
                        className={style.female}
                        type="radio"
                        id="female"
                        name="gender"
                        value="Femenino" // Asigna el valor directamente aquí
                        checked={userData.gender === "Femenino"} // Asegura que se marque la opción seleccionada
                        onChange={handleChange}
                    />

                    <label htmlFor="other">Other</label>
                    <input
                        className={style.other}
                        type="radio"
                        id="other"
                        name="gender"
                        value="Otro" // Asigna el valor directamente aquí
                        checked={userData.gender === "Otro"} // Asegura que se marque la opción seleccionada
                        onChange={handleChange}
                    />
                </div>

        <div className={style.terms}>
            <label htmlFor="terms">I accept the terms and conditions</label>
            <input                         
                className={style.female}
                type="checkbox" 
                name="terms" 
                id="terms" required 
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
    </form>
    {success === true && (
        <div>
            <p className={style.success}>User created successfully</p>
        </div>
    )}

    <img className={style.fotoPNG} src={jerryMusculoso} alt="" />
    </div>
);
};

export default Register;