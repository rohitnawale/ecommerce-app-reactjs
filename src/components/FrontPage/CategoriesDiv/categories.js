import React from 'react'
import {Link} from 'react-router-dom'

import classes from './categories.css'

const categories = (props) => {
    return(
        <div className={classes.Category} style={{"backgroundImage": "url('" + props.imgLink +"')" }}>
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTOq8q0ZH767AY0O4S5tNzjogEJjSNHT9IPE9HW5toTW0lqWO2e&usqp=CAU"></img> */}
            <h3>{props.h3Text}</h3>
            <Link to={props.link}><h4>+ EXPLORE</h4></Link>
        </div>
    )
}

export default categories