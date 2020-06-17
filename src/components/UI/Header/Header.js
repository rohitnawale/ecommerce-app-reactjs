import React,{Component} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import * as actions from '../../../store/actions/auth'
import classes from './Header.css'



class Header extends Component{

    routeChange = () => {
        let history = useHistory()
        history.push('/cart')
    }
    render(){
        return(
            <div className={classes.Header}>
                <p>Logo</p>
                <form>
                    <input className={classes.Input} type="text" placeholder="Search for products, brands and more" />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
                {!this.props.isLoggedIn ? 
                    <Link to="/login"><p>Login</p> </Link>
                    :<p onClick={this.props.logout}>Logout</p>
                }
                {this.props.isLoggedIn ? <Link to="/orders"><p>Orders</p></Link> : null}
                <Link to="/cart"><p>Cart</p> </Link>
            </div>
        )
    }

} 
     
const mapStateToProps = state =>{
    return{
        isLoggedIn: state.auth.isLoggedIn
    }
}  

const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch(actions.logout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (Header)