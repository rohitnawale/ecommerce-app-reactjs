import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as actions from '../../../store/actions/auth'
import Header from '../../../components/UI/Header/Header'
import Footer from '../../../components/UI/Footer/Footer'
import classes from './login.css'
import Spinner from '../../../components/UI/Spinner/Spinner'


class Login extends Component {

    state ={
        isLoggedIn: null,
        loginResponse: null,
        loginStatus:null,
        email: "",
        password:"",
        loading: false
    }

    getEmailHandler = (event) => {
        event.preventDefault()
        this.setState({email:event.target.value})
    }

    getPasswordHandler = (event) => {
        event.preventDefault()
        this.setState({password:event.target.value})
    }

    //send a login request to server
    login = (event) => {
        event.preventDefault()
        this.setState({loading:true})
        const authData = {
            "email":this.state.email,
            //"johnsnoww@gmail.com"
            // "password":"Red@1234"
            "password":this.state.password
        }
        // console.log(typeof(document.cookie))
        axios.post("https://xp-ecomapp.herokuapp.com/api/users/login", authData)
            .then(res => {
                if(res.status === 400){
                    this.setState({loading: false, isLoggedIn:false, loginStatus: "Log In failed. Check your credentials"}) 
                }
                else{
                    console.log(res.data)
                    // document.cookie = `token=${res.data.token}`
                    this.props.login(res.data.user, res.data.token)
                    console.log("loggedin state in redux", this.props.isLoggedInSuccessfully)
                    if(this.props.isLoggedInSuccessfully){
                        console.log("Logged in")
                        this.setState({loading: false, isLoggedIn:true, loginResponse:true, loginStatus: "Logged In Successfully!!"})
                        
                        //if the user redirected from cart..redirect to placeorder otherwise just redirect to previous page
                        
                        if(this.props.isToPlaceOrder){
                            this.props.history.push('/placeorder')
                        }
                        else{
                            //console.log(document.cookie)
                            this.props.history.go(-1)
                        }
                        
                    }
                    else{}
                }
            })
            .catch(err => {
                //console.log(err)
                this.setState({loading: false, loginResponse:true, loginStatus: "Log In failed. Check your credentials"})

            })
    }
    render(){

        
        return(
            <div>
                
                    <div className={"container"}>
                    <Header/>
                        <div className="row">
                            <div className="col-sm-2">
  
                            </div>   
                            

                            <div className = {classes.Login + " col-sm-7"}>
                                {this.state.loading ? <Spinner/> : <div>
                            <h2><label>Login using Email and Password</label></h2>
                                <form>
                                    <input type="email" placeholder="Email Address" onChange={(event) => this.getEmailHandler(event)}></input><br/><br/>
                                    <input type="password" placeholder="Password" onChange={(event) => this.getPasswordHandler(event)}></input><br/><br/>
                                    <button type="submit" onClick={(event) =>this.login(event)}>Login</button>
                                </form>
                                <br/>
                                {this.state.loginResponse ? <p>{this.state.loginStatus}</p> : null}
                                </div>}
                            </div>
                        </div>

                        <div className={classes.Signup + " row"}>
                            <div className="col-sm-5">
                                <h2>New User?  <Link to="/signup"><label>Sign Up</label></Link></h2>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className="row">
                        <Footer/>
                    </div>
                    
            </div>
                    
            

        )
    }
}

const mapStateToProps = state => {
    return{
        isLoggedInSuccessfully: state.auth.isLoggedIn,
        isToPlaceOrder: state.auth.isToPlaceOrder
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        login: (user, token) => dispatch(actions.login(user, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login)
