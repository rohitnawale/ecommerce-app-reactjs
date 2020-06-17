import React, { Component } from 'react'
import axios from 'axios'

import classes from './Orders.css'
import Header from '../../components/UI/Header/Header'
import Footer from '../../components/UI/Footer/Footer'
import Order from './Order/Order'
import Spinner from '../UI/Spinner/Spinner'

class Orders extends Component{
    state = {
        //storing user data in localstorage to persist data afer page refresh
        user: JSON.parse(localStorage.getItem('user')),
        loading: false
    }

    componentWillMount(){
        this.setState({loading: true})
        //load all the Orders
        //Pagination feature to be added here to limit number of Orders shown at a time
        //user token is added to header
        const headers = {
            "Authorization": `Bearer ${document.cookie.split("=")[1]}`
        }
        axios.get('https://xp-ecomapp.herokuapp.com/api/users/me',  {
            headers: headers
          })
            .then(res => {
                localStorage.removeItem('user')
                localStorage.setItem('user', JSON.stringify(res.data))
                this.setState({user: res.data, loading: false})
            })
            .catch(err => {
                console.log(err)
            })
    }
    render(){
        let listOfOrders = "Loading..."
        if( this.state.user.orders.length > 0){
        listOfOrders = this.state.user.orders.map(order => (
            <Order 
                products = {order.products}
                key = {order._id}
                id = {order._id}
                date= {order.date.toString().split("T")[0]}
                amount = {order.amount}
            />
        ))
        }
        else{
            listOfOrders = "Your order history is empty!"
        }
        return(
            <div>
                 <Header/>
                    <div className={"container"}>
                        <div className="row">
                            <div className="col-sm-2">
  
                            </div>
                            
                            <div className = {classes.Orders + " col-sm-11"}>
                            
                                <h3 style={{float:"left", padding:"10px"}}> Your Orders History: </h3>
                                <br/><br/><br/><br/>
                                    {this.state.loading ? <Spinner/> :listOfOrders}
                            </div>
                        </div>

                        <div className={"row"}>
                            <div className="col-sm-5">

                            </div>
                            <div className="col-sm-3">

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

export default Orders