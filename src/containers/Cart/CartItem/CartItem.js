import React, { Component } from 'react'
import {connect} from 'react-redux'

import classes from './cartItem.css'
import * as actions from '../../../store/actions/cart'

class CartElement extends Component{

    state = {
        count:0
    }

    componentDidMount(){
        this.setState({count: this.props.quantity})
    }
    
    //change product quantity while checking out
    //state is updated globally in redux store
    addToCart = () => {
        this.setState({count: this.state.count + 1})
        this.props.addToCart(this.props.productData, this.state.count+1, this.props.id)
        this.props.changeCartAmount("add", this.props.productData.price)
        console.log(this.props.cart)
        // console.log(this.props.itemCounts)
    }

    removeFromCart = () => {
        if(this.state.count > 0){
            this.setState({count: this.state.count - 1})
            this.props.removeFromCart(this.props.productData, this.state.count, this.props.id)
            this.props.changeCartAmount("remove", this.props.productData.price)
            console.log(this.props.cart)
        }
        else if(this.state.count === 0){
            this.props.clearItemFromCart(this.props.productData)
        }
    }
    render(){
        return(
            // <div className={"container"}>
            <div className={classes.Product + " row "} >
                <div className={"col-sm-3"}>
                    <img className ={classes.Image} src={this.props.imgLink} alt=""/>
                    
                </div>
                <div className ={"col-sm-5"}>
                    <h1 style={{float:"left"}}>{this.props.name}</h1>
                    <h3>Rs.{this.props.price}({this.props.priceTag})</h3>
                </div>

                <div className={"col-sm-2"}>
                                    
                    <div>
                        <h6>{this.state.count + " items in cart"}</h6>
                            <button onClick={this.addToCart}>+</button>
                            <button onClick={this.removeFromCart}>-</button>
                    </div>
                
                </div>
                
            </div>
            // </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        cart:state.cart.cart,
        products: state.cart.products,
        itemCounts: state.cart.itemCounts
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addToCart: (product, quantity, key) => dispatch(actions.addToCart(product, quantity, key)),
        removeFromCart: (product, quantity, key) => dispatch(actions.removeFromCart(product, quantity, key)),
        clearItemFromCart:(product) => dispatch(actions.clearItemFromCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CartElement)