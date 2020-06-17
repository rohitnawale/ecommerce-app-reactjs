import * as actionTypes from './actionTypes';

export const addToCart = (productData, quantity, key) => {
    return{
        type: actionTypes.ADD_TO_CART,
        productData,
        quantity,
        key
    }
}

export const removeFromCart = (productData) => {
    return{
        type: actionTypes.REMOVE_FROM_CART,
        productData
    }
}

export const clearItemFromCart = (productData) => {
    return{
        type: actionTypes.CLEAR_ITEM_FROM_CART,
        productData
    }
}

export const updateCartAmount = (amount) => {
    return{
        type: actionTypes.UPDATE_CART_AMOUNT,
        amount
    }
}