import React from 'react'

import classes from './sidebar.css'

const sidebar = (props) => {

    let categories = null
    if(props.categories !== undefined){
        categories = props.categories.map(element => (
            <h5 key={element}><li><input type="radio" name="check" value = {element} onClick={(event) => props.filter(event)}/> {element}</li></h5>
        ))
    }
    return(
        <div className={classes.Sidebar}>
            <div className={classes.Categories}>
                <h2> Categories</h2>
                <ul>
                <h5><li><label onClick={(event) => props.filter(event)}><input type="radio" name="check" value = "all"/>All</label></li></h5>
                    {categories}
                </ul>
            </div>

            {/* <div className={classes.Filters}>
                <h2>Filters</h2>
                <ul>
                    <li> <label><input type="radio" name="check"/> Sort By Asc</label></li>
                    <li> <label><input type="radio" name="check"/> Sort By Desc</label></li>
                    <li> <label><input type="radio" name="check"/> Sort By Price</label></li>
                </ul>
            </div> */}
            
        </div>
    )
}

export default sidebar