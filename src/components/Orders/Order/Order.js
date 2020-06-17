import React, { Component } from 'react'
import axios from 'axios'

import classes from './Order.css'

class Order extends Component {

    state ={
        failedToLoadProduct:null,
        productsData: ""
    }

    componentDidMount(){
        let message = null
        
        this.props.products.forEach(product => {
            axios.get(`https://xp-ecomapp.herokuapp.com/api/getProduct/${product.productid}`)
            .then(res => {
                //console.log(product.items +"x " + res.data.name )
                let products = this.state.productsData
                products += (" (" + product.items.toString() +"x " + res.data.name + ")\t")
                console.log(products)
                this.setState({productsData: products})
            })
            .catch(err => {
                console.log(err)
                message = true
            })
        })
        
            //console.log(products)
            this.setState({failedToLoadProduct: message})
    }
    render(){
        return(
            <div className={classes.Order}>
                <ul>
                <li><h4><label>Products : </label>{this.state.failedToLoadProduct === true ? <h4>Failed to load products </h4> : this.state.productsData}</h4></li>
                <li><h4><label>Order ID : </label>{this.props.id}</h4></li>
                <li><h4><label>Date: </label>{this.props.date}</h4></li>
                <li><h4><label>Amount: Rs.</label>{this.props.amount}</h4></li>
                </ul>
                
            </div>
        )
    }
}


export default Order