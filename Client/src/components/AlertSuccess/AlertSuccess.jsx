import style from "./AlertSuccess.module.css"
import { BsCheckCircle } from "react-icons/bs";

const AlertSuccess = ({ texto }) => {
  return(
    <div className={style.successContainerAlert}>
      <BsCheckCircle className={style.alertSuccess}/>
      <p className={style.success}>{texto}</p>
    </div>
  );
};

export default AlertSuccess;