import React, {Component} from 'react'
import {connect} from 'react-redux'

import classes from './product.css'
import * as actions from '../../../store/actions/cart'

class Product extends Component {
    state = {
        isCart: false,
        buttonText: "Add To Cart",
        count: 0,
        inStock: true

    }

    componentDidMount(){
        if(this.props.cart.lenght>0){
            this.setState({isCart:true})
        }
        //disable the add to cart button if product is out of stock
        if(this.props.quantity <=0){
            this.setState({inStock:false, buttonText:"Out of Stock"})
        }
    }

    //check if user has added anything to cart or not
    changeCartState = () => {
        if(this.state.isCart === true){
            this.setState({isCart: !this.state.isCart, buttonText:"Add to cart"})
            this.props.clearItemFromCart(this.props.productData)
            console.log(this.props.cart)
        }
        else{
            this.setState({count:0 ,isCart: !this.state.isCart, buttonText:"Remove from cart"})
            
        }
    }

    //increse the quantity of products, also update in redux state
    addToCart = () => {
        this.setState({count: this.state.count + 1})
        this.props.addToCart(this.props.productData, this.state.count+1, this.props.id)
        console.log(this.props.cart)
        // console.log(this.props.itemCounts)
    }

    //decrese the quantity of products, also update in redux state
    removeFromCart = () => {
        if(this.state.count > 0){
            this.setState({count: this.state.count - 1})
            this.props.removeFromCart(this.props.productData)
            console.log(this.props.cart)
        }
    }
    render(){
        return(
            <div>
            <div className={classes.Product + " row"} >
                <div className={"col-sm-3"}>
                    <img className ={classes.Image} src={this.props.imgLink} alt=""/>
                    
                </div>
                <div className ={"col-sm-5"}>
                    <h1 style={{float:"left"}}>{this.props.name}</h1>
                    <h3>Rs.{this.props.price}({this.props.priceTag})</h3>
                </div>

                <div className={"col-sm-4"}>
                   
                
                    <button className={classes.AddToCart} disabled={!this.state.inStock ? true: false} onClick ={this.changeCartState}>{this.state.buttonText}</button>
                    {this.state.isCart ? 
                    <div>
                        <h6>{this.state.count + " items in cart"}</h6>
                            <button onClick={this.addToCart}>+</button>
                            <button onClick={this.removeFromCart}>-</button>
                    </div>: null}
                
                </div>
                
            </div>
            </div>
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
        removeFromCart: (product) => dispatch(actions.removeFromCart(product)),
        clearItemFromCart:(product) => dispatch(actions.clearItemFromCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Product)