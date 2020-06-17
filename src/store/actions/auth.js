import * as actionTypes from './actionTypes';

export const login = (user,token) => {
    return{
        type: actionTypes.LOGIN,
        user,
        token
    }
}

export const logout = () => {
    return{
        type: actionTypes.LOGOUT
    }
}

export const isToPlaceOrder = () => {
    return{
        type: actionTypes.IS_TO_PLACEORDER
    }
}