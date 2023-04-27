import style from "./About.module.css"
import htmlImg from "../Asserts/about/html.png"
import cssImg from "../Asserts/about/css.svg"
import javascriptImg from "../Asserts/about/javascript.png"
import reactImg from "../Asserts/about/react.png"
import redux from "../Asserts/about/redux.png"
import sql from "../Asserts/about/sql.png"
import express from "../Asserts/about/express.png"

const About = () => {

    const techSkills = [{ tech: 'Html', image: htmlImg }, { tech: 'Css', image: cssImg }, { tech: 'JavaScript', image: javascriptImg }, { tech: 'React', image: reactImg }, { tech: 'Redux', image: redux }, { tech: 'Express', image: express }, { tech: 'SQL', image: sql }]

    return(
        <div className={style.divBienvenido}>
            <h1 className={style.subtitle}>Elias Martinez</h1>
            <h2>A webpage created with:</h2>
            <ul className={style.unorderedList}> 
                {techSkills.map(skill => (
                <li className={style.listItem} key={skill}>{skill.tech}<img src={skill.image} alt={skill.tech} /></li>
                    ))}
            </ul>
        </div>
    )
}

export default About