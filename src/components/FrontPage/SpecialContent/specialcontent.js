import React from 'react'

import classes from './specialcontent.css'


const specialContent = (props) => {
    return(
        <div className={classes.SpecialContent} style={{"backgroundImage": "url('" + props.imgLink +"')" }}>
            <h1>50% off on fashion</h1> 
            <h2>Levi's, Flying Machine and many more</h2>
            <h4>+ EXPLORE</h4>
        </div>
    )
}

export default specialContent