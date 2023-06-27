import style from "./Loading.module.css"
import portal from "../Asserts/PortalInicio.png"
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
      setTimeout(() => {
        navigate('/characters');
      }, 1500); 
    
  }, [navigate]);
  return (
    <div className={style.div1}>
      <div className={style.div2}>
        <img className={style.portal} src={portal} alt="Portal" />
        <h2 className={style.texto}>Redirected...</h2>
      </div>
    </div>
  );
};

export default Loading;