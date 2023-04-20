import style from "./About.module.css"
import htmlImg from "../Asserts/about/html.png"
import cssImg from "../Asserts/about/css.svg"
import javascriptImg from "../Asserts/about/javascript.png"
import reactImg from "../Asserts/about/react.png"
import redux from "../Asserts/about/redux.png"

const About = () => {

    const techSkills = [{ tech: 'Html', image: htmlImg }, { tech: 'Css', image: cssImg }, { tech: 'JavaScript', image: javascriptImg }, { tech: 'React', image: reactImg }, { tech: 'Redux', image: redux }]

    return(
        <div className={style.divBienvenido}>
            <h1 className={style.subtitle}>Elias Martinez</h1>
            <ul className={style.unorderedList}> 
                {techSkills.map(skill => (
                <li className={style.listItem} key={skill}>{skill.tech}<img src={skill.image} alt={skill.tech} /></li>
                    ))}
            </ul>
        </div>
    )
}

export default About