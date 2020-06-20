import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'
const initialState = {
    cart:[
        {
            product:null,
            quantity:0
        }
    ],
    totalAmount:0
}

//add the items in cart
const addToCart = (state, action) => {
    let updatedCart = [...state.cart]
    let isRepeat = false

    //check if the product is already added in cart
    for(let i=0;i<state.cart.length;i++){
        if(state.cart[i].product !== null){
            console.log("{}", action.productData)
            if(state.cart[i].product._id === action.productData._id){
                isRepeat = true
                break
            }
        }
    }

    // console.log(isRepeat)
    //if the product is already just increment the amount
    //otherwise add the new product to cart
    if(isRepeat){
         // eslint-disable-next-line
        let getIndex = state.cart.findIndex(p => {
             if(p.product !== null){
                return p.product._id === action.productData._id
             }
        })
        updatedCart[getIndex].quantity += 1
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    else{
        if(state.cart[0].product === null){
            state.cart.length = 0
        }
        state.cart.push({product: action.productData, quantity: action.quantity})
        updatedCart = [...state.cart]
        localStorage.setItem('cart', JSON.stringify(updatedCart))    
    }
    
    return updateObject(state, {cart: updatedCart})
}

//decrease the quantity of products in cart
//remove the product from array if quantity is zer0
const removeFromCart = (state, action) => {
    let updatedCart = [...state.cart]
     // eslint-disable-next-line
    let getIndex = state.cart.findIndex(p => {
        if(p.product !== null){
           return p.product._id === action.productData._id
        }
   })
   
   if(updatedCart[getIndex].quantity === 0){
       updatedCart = removeByAttr(updatedCart, 'product', action.productData)
   }
   else{
   updatedCart[getIndex].quantity -= 1
   }
   localStorage.removeItem('cart')
   localStorage.setItem('cart', JSON.stringify(updatedCart))   
   return updateObject(state, {cart: updatedCart})
}

//clear the cart by deleting all the elements in cart array
const clearItemFromCart = (state, action) => {
    let updatedCart = [...state.cart]
    updatedCart = removeByAttr(updatedCart, 'product', action.productData)
   //updatedCart[getIndex].quantity = 0
    localStorage.removeItem('cart')
    localStorage.setItem('cart', JSON.stringify(updatedCart)) 
    return updateObject(state, {cart: updatedCart})
}

const updatedCartAmount = (state, action) => {
    return updateObject(state, {totalAmount: action.amount})
}



const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_CART: return addToCart(state, action)
        case actionTypes.REMOVE_FROM_CART: return removeFromCart(state, action)
        case actionTypes.CLEAR_ITEM_FROM_CART: return clearItemFromCart(state, action)
        case actionTypes.UPDATE_CART_AMOUNT: return updatedCartAmount(state, action)
        
        default: return state
    }
}

// function to remove an object in array by attribute and value
var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 ) ){ 
            console.log("[remove by attr]",arr[i])
            console.log("[remove by attr]",value)
            if(arr[i].product._id === value._id){
                console.log("item removed: ", value.name)
                arr.splice(i,1);
                break
            }

       }
    }
    console.log("after removing", arr)
    return arr;
}


export default reducer