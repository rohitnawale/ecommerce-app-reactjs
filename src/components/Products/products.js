import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import classes from './products.css'
import Product from '../Products/Product/product'
import Header from '../UI/Header/Header'
import Categories from '../UI/Categories/categories'
import Sidebar from '../UI/Sidebar/sidebar'
import Footer from '../UI/Footer/Footer'
import Spinner from '../UI/Spinner/Spinner'

class Products extends Component {
    state = {
        products : [],
        categories:[],
        loading: false
    }

    componentDidMount(){
        //initially display all the products in a section
        // pagination support to be added here to show limited number of products at a time
        this.setState({loading:true})
        axios.get("https://xp-ecomapp.herokuapp.com/api/products/Grocery")
            .then((res => {
                console.log(res.data)
                this.setState({products: res.data, loading: false})
            }))
            .catch((err => {
                console.log(err)
                this.setState({loading:false})
            }))

        //fetch all the categories in a section and display them in sidebar
        axios.get("https://xp-ecomapp.herokuapp.com/api/products/categories/Grocery")
        .then((res => {
            // console.log(res.data)
            this.setState({categories: res.data})
        }))
        .catch((err => {
            console.log(err)
        }))
    }

    //filter the products according to category
    filter = (category) => {
        this.setState({loading:true})
        // console.log(category.target.value)
        let url = ""
        if(category.target.value === "all"){
            url = "https://xp-ecomapp.herokuapp.com/api/products/Grocery"
        }
        else{
            url = "https://xp-ecomapp.herokuapp.com/api/products/Grocery/" + category.target.value
        }
        axios.get(url)
            .then((res => {
                //console.log(res.data)
                this.setState({products: res.data, loading: false})
            }))
            .catch((err => {
                console.log(err)
                this.setState({loading:false})
            }))
    }

    render(){
        let products = null
        if(this.state.products.length >0 ){
            products = this.state.products.map(product => (
                <Product name ={product.name}
                productData = {product}
                key={product._id}
                id={product._id}
                price = {product.price}
                priceTag = {product.priceTag}
                imgLink = {product.imgLink}
                section = {product.section}
                category = {product.category}
                />
            ))
        }
        return(
            <div className={classes.Products}>
                    <Header/>
                    <div className="container">
                    <Categories/>
                    <div className="row">
                        <div className="col-sm-3">
                            <Sidebar
                            categories={this.state.categories}
                            filter = {this.filter}
                            removeFilter = {this.componentDidMount}
                            />  
                        </div>

                        <div className = "col-sm-9">
                            {this.state.loading === false ? products : <Spinner/>}
                        </div>
                    </div>
                    <div className={classes.RedirectToCart +" row"}>
                        <Link to="/cart">
                                <span className={"btn btn-info btn-lg glyphicon glyphicon-shopping-cart"}> Cart</span>
                        </Link>
                    </div>
                    </div>
                    
                    
                    <Footer/>
            </div>
        )
    }
}

export default Products