import style from "./ScrollTop.module.css"
import { GrLinkTop } from "react-icons/gr"


const ScrollTop = () => {
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return(
        <button className={style.botonTop} onClick={scrollToTop} ><GrLinkTop></GrLinkTop></button>
    );
}

export default ScrollTop;