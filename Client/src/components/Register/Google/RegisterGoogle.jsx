import { GoogleLogin } from "@react-oauth/google";
import decodedJwt from "../../../utils/decoded";
import axios from "axios"; 
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import AlertError from "../../AlertError/AlertError";
import AlertSuccess from "../../AlertSuccess/AlertSuccess";

const RegisterGoogle = () => {
  const navigate = useNavigate();

  const [errores, setErrores] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleError = () => {
    console.log("Register failed");
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/loading');
      }, 1000); // Ajusta el tiempo de espera en milisegundos (en este caso, 2 segundos)
    }
  }, [success, navigate]);

  const handleSuccess = async (credentialResponse) => {
    console.log("credentialResponse", credentialResponse);
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;
      const { payload } = decodedJwt(token);

      const { email, family_name, given_name } = payload;

      const name = given_name;
      const lastname = family_name;

      if (email && family_name && given_name) {
        try {
          const response = await axios.post("http://localhost:3001/api/signupgoogle", {
            name,
            lastname,
            email,
          });
          console.log("Data send success:", response.data);

          try {
            const URL = 'http://localhost:3001/api/signingoogle';
            let endpoint = URL;
            if (email) {
              endpoint += `?email=${email}`;
            } else {
              console.error('Email invalid.');
              return;
            }
          
            const { data } = await axios.get(endpoint);
            const { token } = data; 
            localStorage.setItem('token', token);
            setSuccess(true);
            setErrores(null);
          } catch (error) {
            console.log(error);
          }
          
        } catch (error) {
          setErrores(error.response.data.error);
          setSuccess(false);
        };
      };
    };
  };

  return (
    <>
      {errores && success === false && (
        <div >
          <AlertError error={errores} />
        </div>
      )}

      {errores === null && success && (
        <div >
          <AlertSuccess texto={"User create"} />
        </div>
      )}

      <GoogleLogin
        theme="filled_black"
        size="medium"
        text="signup_with"
        shape="circle"
        locale="en"
        useOneTap
        onError={handleError}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default RegisterGoogle;
