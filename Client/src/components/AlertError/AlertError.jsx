import style from "./AlertError.module.css"
import { FiAlertCircle } from "react-icons/fi";

const AlertError = ({ error }) => {
  return(
    <div  className={style.errorContainerAlert}>
      <FiAlertCircle className={style.alert}/>
      <p className={style.error}>{error}</p>
    </div>
  );
};

export default AlertError;