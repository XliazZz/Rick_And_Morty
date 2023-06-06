import style from "./RandomCard.module.css"


const RandomCard = ({ id, name, status, origin, image, location }) => {

  const calculateFontSize = (location) => {
    if (location.length < 10) {
      return "25px";
      } else if (location.length < 15) {
      return "20px";
      } else if (location.length < 20) {
      return "21px";
      } else if (location.length < 25) {
      return "20px";
      } else if (location.length < 30) {
      return "19px";
      } else if (location.length < 35) {
      return "11px";
      } else {
      return "9px";
      }
    };

  const calculateStatus = (status) => {
    if (status === "Alive") {
      return  'green';
        } else if (status === "Dead") {
      return  "red";
        } else if (status === "unknown") {
      return  "gray";
        }
    }

  return(
      <div className={style.contenedorRandomCard}>

        <img className={style.fotoRandom} src={image} alt={name} />

        <div className={style.infoRandom} > 
          <div className={style.textosRandom}>
                    
            <div className={style["status-container"]} >
                <div
                  className={style["status-circle"]}
                  style={{ backgroundColor: calculateStatus(status) }}
                  data-status={status}
                ></div>
            </div>

            <h2 style={{fontSize: "22px"}} >{name}</h2>

            <h2>Origin: {origin}</h2>

            <h2 style={{fontSize: calculateFontSize(location)}} >Location: {location}</h2>

          </div>
        </div>
      </div>
    )
}

export default RandomCard;