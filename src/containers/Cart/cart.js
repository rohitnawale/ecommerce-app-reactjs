import React, { Component } from 'react'
import {connect} from 'react-redux'

import * as actions from '../../store/actions/auth'
import classes from './cart.css'
import Header from '../../components/UI/Header/Header'
import Categories from '../../components/UI/Categories/categories'
import Footer from '../../components/UI/Footer/Footer'
import CartElement from './CartItem/CartItem'
import { updateCartAmount } from '../../store/actions/cart'

class Cart extends Component{
    //save the cart in localstorage to persist even after refresh
    state = {
        cart: JSON.parse(localStorage.getItem('cart')),
        totalAmount:0,
        ifModifyCart: false
    }

    componentDidMount(){
        let newCart = JSON.parse(localStorage.getItem('cart'))
        let amount = 0
        if(newCart !== null){
        newCart.forEach(item => {
            if(item.product !== null && item.product !== undefined){
                amount += item.product.price * item.quantity
            }
        })
    }

        this.setState({cart: newCart, totalAmount: amount})
        this.props.updateCartAmount(this.state.totalAmount)
        console.log(this.state.cart)
    }

    //updating the cart amount in redux store too
    changeCartAmount = (operation, amount) =>{
        if(operation === "add"){
            this.setState({totalAmount: this.state.totalAmount + amount})
            this.props.updateCartAmount(this.state.totalAmount)
        }
        else if(operation === "remove"){
            this.setState({totalAmount: this.state.totalAmount - amount})
            this.props.updateCartAmount(this.state.totalAmount)
        }
    }

    //if the user is logged in, redirect user to placeorder
    //or redirect him to login or sign up
    redirectToOrder = () => {
        this.props.updateCartAmount(this.state.totalAmount)
        if(this.props.isLoggedIn){
            localStorage.removeItem('orderPlaced')
            localStorage.removeItem('orderStatusText')
            localStorage.removeItem('orderID')
            localStorage.removeItem('orderButtonText')
            localStorage.setItem('totalAmount', this.state.totalAmount)
            this.props.history.push('/placeorder')
        }
        else{
            this.props.istoPlaceOrder()
            localStorage.removeItem('orderPlaced')
            localStorage.removeItem('orderStatusText')
            localStorage.removeItem('orderID')
            localStorage.removeItem('orderButtonText')
            localStorage.setItem('totalAmount', this.state.totalAmount)
            this.props.history.push('/login')
        }
    }

    render(){
        let cartItems = "Your Cart Is Empty :("
        if(this.state.cart !== null){
        if(this.state.cart.length>1){
            console.log(this.state.cart)
            // eslint-disable-next-line
            cartItems = this.state.cart.map(item => {
                if(item.product !== null && item.product !== undefined){
                    console.log("[sdfmkns]: ", item.product)
                  return  <CartElement
                        key={item.product._id}
                        id={item.product._id}
                        productData={item.product}
                        imgLink = "https://media.gettyimages.com/photos/red-apple-with-droplet-picture-id185071735?s=612x612"
                        name={item.product.name}
                        price={item.product.price}
                        priceTag={item.product.priceTag}
                        quantity={item.quantity}
                        changeCartAmount={this.changeCartAmount}
                    />
                }
            })
        }
    }
        
        return(
            <div>
                <Header/>
                    <div className={"container"}>
                        <Categories/>
                        <div className="row">
                            <div className="col-sm-2">
  
                            </div>
                            <label><b><h1>Your Cart</h1></b></label>   
                            <div className = {classes.Products + " col-sm-11"}>
                            
                                {cartItems}
                                <h3 style={{float:"right", padding:"10px"}}>Your total cart amount is: {this.state.totalAmount}</h3>
                            </div>
                        </div>

                        <div className={"row"}>
                            <div className="col-sm-5">

                            </div>
                            <div className="col-sm-3">
                                <button type="button" className={classes.AddToCart} disabled={cartItems === "Your Cart Is Empty :(" ? true : false} onClick={this.redirectToOrder}>
                                {cartItems === "Your Cart Is Empty :(" ?<p>Add products to continue</p>: <p>Checkout</p>}</button>
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
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return{
        istoPlaceOrder: () => dispatch(actions.isToPlaceOrder()),
        updateCartAmount: (amount) => dispatch(updateCartAmount(amount))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Cart)