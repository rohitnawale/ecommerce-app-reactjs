import React from 'react'

import classes from './Footer.css'

const footer = () => {
    return(
        <div className={classes.Footer}>
            <div className={classes.Firstrow}>
                <p>Social</p>
                <p>Help</p>
                <p>Policy</p>
                <p>Partners</p>
            </div>
            <br/>
            <h5>Contact Us</h5>
            <h5>About</h5>
        </div>
    )
}

export default footer