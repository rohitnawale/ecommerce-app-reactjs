import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initalState = {
    isLoggedIn: document.cookie.length >0 ? true : false,
    isToPlaceOrder: false
}

//login the user and store token send by server in cookies
const login = (state, action) => {
    document.cookie = `token=${action.token}`
    localStorage.setItem('user', JSON.stringify(action.user))
    return updateObject(state, {isLoggedIn: true})
}

const setisToPlaceOrder = (state, action) =>{
    return updateObject(state, {isToPlaceOrder: true})
}

//logout the user and delete the cookie
//set the date to passed date so as to delete the cookie
const logout = (state, action) => {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    localStorage.removeItem('user')
    return updateObject(state, {isLoggedIn: false})
}

const reducer = (state = initalState, action) => {
    switch(action.type){
        case actionTypes.LOGIN : return login(state, action)
        case actionTypes.LOGOUT : return logout(state, action)
        case actionTypes.IS_TO_PLACEORDER: return setisToPlaceOrder(state, action)
        
        default : return state
    }
}

export default reducer