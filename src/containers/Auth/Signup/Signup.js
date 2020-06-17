import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import * as actions from '../../../store/actions/auth'
import Header from '../../../components/UI/Header/Header'
import Footer from '../../../components/UI/Footer/Footer'
import classes from './Signup.css'

//check if form contains any errors. Return true if any, false otherwise
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

class Signup extends Component{
    //state to manage any errors related to specific form field
    state = {
        firstName: null,
        lastName: null,
        house:null,
        landmark:null,
        city: null,
        pincode:null,
        mobile:null,
        email:null,
        password:null,
        confirmPassword:null,
        errors:{
            firstName: "",
            lastName: "",
            house:"",
            landmark:"",
            city: "",
            pincode:"",
            mobile:"",
            email:"",
            password:"",
            confirmPassword:""
        },
        isFormValid: false,
        errorFromServer:null,
        currentError: null
    }

    //check for error after every change in form
    inputChangedHandler = (event) =>{
        const { name, value } = event.target;
        let errors = this.state.errors
        let password = this.state.password
        switch(name){
            case 'firstName':
                break

            case 'lasName':
                break

            case 'pincode':
                errors.pincode = value.length !== 6 ? 'Pincode should be 6 digits!': ''
                break

            case 'mobile':
                errors.mobile = value.length !== 10 ? 'Mobile number should be 10digits!':''
                break

            case 'confirmPassword':
                errors.confirmPassword = password !== value ? 'Password should match': ''
                break

            default:
                break 
        }

        this.setState({errors, [name]:value})
    }

    /* send a signup requet to server if the form is correct
       user will be redirected on successful signup
       otherwise user will stay on the same page
       Basic error handling at client side is implemented.
       Erros from server side are still needed to be handled and displayed to user 
    */
    handleSubmit = (event) => {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
          console.info('Valid Form')
          this.setState({isFormValid: true})
          const user = {
              "name":{
                  "firstName": this.state.firstName,
                  "lastName": this.state.lastName
              },
              "address":{
                  "house":this.state.house,
                  "landmark": this.state.landmark,
                  "city": this.state.city,
                  "pincode": this.state.pincode
              },
              "mobile":this.state.mobile,
              "email": this.state.email,
              "password":this.state.password
          }
          
          axios.post("https://xp-ecomapp.herokuapp.com/api/users/signup", user)
            .then(res => {
                console.log(res)
                this.props.login(res.data.user, res.data.token)
                if(this.props.isLoggedInSuccessfully){
                if(this.props.isToPlaceOrder){
                    
                    this.props.history.push('/placeorder')
                }
                else{
                    this.props.history.go(-2)
                }
            }
                
            })
            .catch(err=>{
                console.log(err.toString())
                this.setState({isFormValid:false, errorFromServer:err.errmsg})
                
            })
        }else{
          console.error('Invalid Form')
          this.setState({isFormValid:false})
        }
      }

    render(){
        return(
           <div> 
            <div className={"container"}>
            <Header/>
                <div className="row">
                    <div className="col-sm-2">

                    </div>   
                    

                    <div className = {classes.Signup + " col-sm-7"}>
                    <h2><label>Enter the details to get started!</label></h2>
                        <form>
                        <input autocomplete="false" name="hidden" type="text" style={{display:"none"}}/>
                            <input type="text" name="firstName"placeholder="First Name" onChange={(event) => this.inputChangedHandler(event)}></input><br/><br/>
                            <input type="text" name="lastName"placeholder="Last Name" onChange={(event) => this.inputChangedHandler(event)}></input><br/><br/>
                            <input type="text" name="house"placeholder="House/ Flat Number" onChange={(event) => this.inputChangedHandler(event)}></input><br/><br/>
                            <input type="text" name="landmark"placeholder="Landmark" onChange={(event) => this.inputChangedHandler(event)}></input><br/><br/>
                            <input type="text" name="city"placeholder="City" onChange={(event) => this.inputChangedHandler(event)}></input><br/><br/>
                            <input type="number" name="pincode"placeholder="Pincode" onChange={(event) => this.inputChangedHandler(event)}></input><br/>{this.state.errors.pincode !== null ? <p>{this.state.errors.pincode}</p>: null}<br/>
                            <input type="number" name="mobile" placeholder="Mobile Number" onChange={(event) => this.inputChangedHandler(event)}></input><br/>{this.state.errors.mobile !== null ? <p>{this.state.errors.mobile}</p>: null}<br/>
                            <input type="email" name="email" placeholder="Email Address" onChange={(event) => this.inputChangedHandler(event)}></input><br/><br/>
                            <input type="password" name="password"placeholder="Password" onChange={(event) => this.inputChangedHandler(event)} autoComplete="off"></input><br/><br/>
                            <input type="password" name="confirmPassword"placeholder="Confirm Password" onChange={(event) => this.inputChangedHandler(event)} autoComplete="off"></input><br/>{this.state.errors.confirmPassword !== null ? <p>{this.state.errors.confirmPassword}</p>: null}<br/>
                            {this.state.errorFromServer? <p>{this.state.errorFromServer}</p>: null}
                            <button type="submit" onClick={(event) =>this.handleSubmit(event)}>Signup</button>
                        </form>
                    </div>
                </div>

                <div className={ "row"}>
                    
                    
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
export default connect(mapStateToProps, mapDispatchToProps) (Signup)