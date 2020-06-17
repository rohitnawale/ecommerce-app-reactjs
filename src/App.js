//ecomapp

import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Cart from './containers/Cart/cart'
import PlaceOrder from './components/PlaceOrder/PlaceOrder'
import Login from './containers/Auth/Login/Login'
import Signup from './containers/Auth/Signup/Signup'
import Orders from './components/Orders/Orders'
import FrontPage from '../src/components/FrontPage/FrontPage'
import Products from '../src/components/Products/products'
import './App.css';

class App extends Component {
  render() {
    //routes accessible to all user
    let routes = (
        <Switch>
        <Route path="/products" component={Products}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/" component={FrontPage}/>
        <Redirect to ="/"/>
      </Switch>
    )
    //routes accessible to authenticated users
      if(this.props.isLoggedIn){
        routes = (
          <Switch>
          <Route path="/products" component={Products}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/placeorder" component={PlaceOrder}/>
          <Route path="/" component={FrontPage}/>
          <Redirect to ="/"/>
        </Switch>
        )
      }
    

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
      isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps) (App);
