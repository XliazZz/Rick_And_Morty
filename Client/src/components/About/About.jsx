import style from "./About.module.css"
import htmlImg from "../Asserts/about/html.png"
import cssImg from "../Asserts/about/css.svg"
import javascriptImg from "../Asserts/about/javascript.png"
import reactImg from "../Asserts/about/react.png"
import redux from "../Asserts/about/redux.png"
import sql from "../Asserts/about/sql.png"
import express from "../Asserts/about/express.png"
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

const About = () => {

  const techSkills = [{ tech: 'Html', image: htmlImg }, { tech: 'Css', image: cssImg }, { tech: 'JavaScript', image: javascriptImg }, { tech: 'React', image: reactImg }, { tech: 'Redux', image: redux }, { tech: 'Express', image: express },  { tech: 'PostgreSQL', image: sql } ]

  return(
    <div className={style.divBienvenido}>
      <h1 className={style.subtitle}>Elias Martinez</h1>
      <h3 className={style.h3About}>20 years. Argentina, Buenos Aires.</h3>

      <h3 className={style.h3About}>My social media</h3>

      <div className={style.redesSociales}>
        <a href="https://www.github.com/XliazZz" target="_blank" rel="noreferrer">
          <FaGithub className={style.icono} />
        </a>
        <a href="https://www.instagram.com/eliasx._" target="_blank" rel="noreferrer">
            <FaInstagram className={style.icono} />
        </a>
        <a href="https://www.linkedin.com/in/elias-martinez-040980246/" target="_blank" rel="noreferrer">
            <FaLinkedin className={style.icono} />
        </a>
      </div>

      <h2>A webpage created with:</h2>
      <ul className={style.unorderedList}> 
        {techSkills.map(skill => (
          <li className={style.listItem} key={skill}>{skill.tech}<img src={skill.image} alt={skill.tech} /></li>
        ))}
      </ul>
    </div>
  );
};

export default About