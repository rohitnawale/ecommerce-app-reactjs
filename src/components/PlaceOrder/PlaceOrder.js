import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import classes from './PlaceOrder.css'
import Header from '../../components/UI/Header/Header'
import Footer from '../../components/UI/Footer/Footer'
import Spinner from '../UI/Spinner/Spinner'

//axios.defaults.headers.patch['Authorization'] = `Bearer ${document.cookie.split("=")[1]}` // for PATCH requests

class PlaceOrder extends Component{
    //storing state properties in localstorage 
    // so as user cant re-order from same cart even after page refresh
    state= {
        loading: false,
        user: JSON.parse(localStorage.getItem('user')),
        cart: JSON.parse(localStorage.getItem('cart')),
        changeAddress: false,
        newAddress: false,
        house:null,
        landmark:null,
        city:null,
        pincode:null,
        orderPlaced: localStorage.getItem('orderPlaced') !== null ? localStorage.getItem('orderPlaced').length>0  ?localStorage.getItem('orderPlaced') === "true": null : null,
        orderStatusText: localStorage.getItem('orderStatusText') !== null ? localStorage.getItem('orderStatusText').length >0 ? localStorage.getItem('orderStatusText'): null : null,
        orderID: localStorage.getItem('orderID') !== null ? localStorage.getItem('orderID').length >0 ? localStorage.getItem('orderID'): null : null,
        orderButtonText: localStorage.getItem('orderButtonText') !== null ? localStorage.getItem('orderButtonText').length>0 ? localStorage.getItem('orderButtonText'): "Order Now": "Order Now"
    }

    componentDidMount(){
        console.log(this.state.user)
        console.log(this.state.cart)
    }

    changeHouseHandler = (event) => {
        this.setState({house: event.target.value})
    }

    changeLandmarkHandler = (event) => {
        this.setState({landmark: event.target.value})
    }

    changeCityHandler = (event) => {
        this.setState({city: event.target.value})
    }

    changePincodeHandler = (event) => {
        this.setState({pincode: event.target.value})
    }

    //set the new address details in state
    changeAddressStatus = () => {
        this.setState({changeAddress: !this.state.changeAddress, newAddress:false,
            house:null,
            landmark:null,
            city:null,
            pincode:null
        })
    }

    //check if user wants to get order delivered on new address
    changeNewAddress = () => {
        this.setState({newAddress: true})
    }

    //confirm and send the order data to server and receive reponse
    sendOrderToServer = () => {
        this.setState({loading:true})
        let products = []
        this.state.cart.forEach(item => {
            if(item.product !== null){
                products.push({"productid": item.product._id, "items": item.quantity})
            }
        })
        //add header for user auth
        const headers = {
            "Authorization": `Bearer ${document.cookie.split("=")[1]}`
        }
        //add order details. Future implementation will have more entities related to order
        const order = {
            "products": products,
            "amount": this.props.amount,
            "date": new Date().toISOString().slice(0,10)
        }
        //console.log(document.cookie.split("=")[1])

        axios.patch("https://xp-ecomapp.herokuapp.com/api/users/placeOrder", order,  {
            headers: headers
          })
            .then(res => {
                console.log(res)
                this.setState({loading: false, orderPlaced: true,  orderID:res.data._id, orderStatusText: "Order placed Successfully", orderButtonText: "Order placed Successfully :)"})
                localStorage.setItem('orderPlaced', 'true')
                localStorage.setItem('orderID', `${res.data._id}`)
                localStorage.setItem('orderStatusText', "Order placed Successfully")
                localStorage.setItem('orderButtonText', "Order placed Successfully")
                localStorage.removeItem('cart')
                localStorage.removeItem('totalAmount')
            })
            .catch(err => {
                this.setState({loading: false, orderPlaced: true, orderStatusText:"Order Failed. Try Again",orderButtonText: "Order Failed :("})
                console.log(err)
            })

    }

    render(){
        let user = this.state.user
        let addressChangeButtonText = "Deliver here"
        if(this.state.newAddress){
            addressChangeButtonText = "Order will be delivered on this address!!"
        }
        return(
            <div>
            <Header/>
                <div className={classes.main +"container"}>
                    <div className="row">
                        <div className="col-sm-2">

                        </div>  
                        <div className = {classes.PlaceOrder + " col-sm-11"}>
                            <h2>Hi, {user.name.firstName}</h2>
                            <h3>Your Order Details: {this.state.orderID ? <h3> Order ID: {this.state.orderID}</h3> : null } </h3>
                            {!this.state.orderPlaced?
                            <ul>
                                <li><p><b>Name: {user.name.firstName + " " + user.name.lastName}</b></p></li>
                                <li><p><b>Address: {user.address.house + ", " + user.address.city + "-" + user.address.pincode}</b> 
                                    </p><p style={{color:"red"}} onClick={this.changeAddressStatus}>Deliver to another address ?</p></li>
                                    {this.state.changeAddress ? 
                                       <li>
                                    
                                       <form>
                                           <input type="text" placeholder="House" onChange={this.changeHouseHandler} disabled={this.state.newAddress}/>
                                           <input type="text" placeholder="Landmark" onChange={this.changeLandmarkHandler} disabled={this.state.newAddress}/>
                                           <input type="text" placeholder="City" onChange={this.changeCityHandler} disabled={this.state.newAddress}/>
                                           <input type="number" placeholder="Pincode" onChange={this.changePincodeHandler} disabled={this.state.newAddress}/><br/>
                                            <label style={{color:"green", padding:"5px"}} onClick={this.changeNewAddress}>{addressChangeButtonText}</label>
                                           <label style={{color:"red", padding:"5px"}} onClick={this.changeAddressStatus}>Cancel</label>
                                       </form></li>
                                       
                                       : null}
                                <li><p><b>Mobile Number: {user.mobile}</b></p></li>
                                <li><p><b>Email: {user.email}</b></p></li>
                                <li><p><b>Order Amount: Rs.{localStorage.getItem('totalAmount')}</b></p></li>
                                <li><select name="payment">
                                    <option selected>Select Payment Type</option>
                                    <option name="cash" value="cash">Cash</option>
                                    <option name="cash" value="card">Card/UPI</option>
                                    </select></li>
                            </ul>: null}
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className="col-sm-5">

                        </div>
                        <div className="col-sm-3">
                            {this.state.loading ? <Spinner/> :
                            <button type="button" className={classes.OrderButton} disabled={this.state.orderPlaced} onClick={this.sendOrderToServer}>
                                {this.state.orderButtonText}</button>}
                            {/* {this.state.orderPlaced ? <p>{this.state.orderStatusText}</p> : null} */}
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <footer>
                    <Footer/>
                    </footer>
                    
                </div>
                
        </div>
        )
    }
}

// get the gloabl state from redux
const mapStateToProps = state => {
    return{
        amount: state.cart.totalAmount
    }
}

export default connect(mapStateToProps) (PlaceOrder)