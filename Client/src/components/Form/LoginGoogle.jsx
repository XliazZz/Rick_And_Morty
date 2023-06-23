import { GoogleLogin } from "@react-oauth/google";
import decodedJwt from "../../utils/decoded"
import axios from "axios"; 
import { useNavigate } from "react-router";

const LoginGoogle = () => {
  const navigate = useNavigate();

  const handleError = () => {
    console.log("Login failed");
  };

  const handleSuccess = async (credentialResponse) => {
    console.log("credentialResponse", credentialResponse);
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;
      const { payload } = decodedJwt(token);

      const { email} = payload;
      
      try {
        const URL = 'http://localhost:3001/api/signingoogle';
        let endpoint = URL;
        if (email) {
          endpoint += `?email=${email}`;
        } 
        else {
          console.error('Email is required.');
          return;
        }
    
        const { data } = await axios.get(endpoint);
        const { token } = data; 
        localStorage.setItem('token', token); 
        navigate('/characters')
      } catch (error) {
        console.log(error);
      }
      console.log("payload credential", payload);
    }
  };

  return(
    <>
      <GoogleLogin 
        type="icon" 
        theme="filled_blue" 
        size="medium" 
        shape="circle" 
        useOneTap 
        onError={handleError} 
        onSuccess={handleSuccess}
      />
    </>
  );
}; 

export default LoginGoogle;