
import {SERVER_URL} from '../const/setting';
import { postUserLogin, getUserStatus, deleteUserStatus } from './api';

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";
export const AUTH_LOGIN_WAITING = "AUTH_LOGIN_WAITING";
// Check sessions
export const AUTH_GET_STATUS = "AUTH_GET_STATUS";
export const AUTH_GET_STATUS_SUCCESS = "AUTH_GET_STATUS_SUCCESS";
export const AUTH_GET_STATUS_FAILURE = "AUTH_GET_STATUS_FAILURE";
export const AUTH_LOGOUT = "AUTH_LOGOUT";


const ip = SERVER_URL;

/* LOGIN */
export function loginRequest(id, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API REQUEST
    return postUserLogin(id, password)
    .then(response => response.json())
    .then((response) => {
        console.debug(response);
        if(response.id){
            // SUCCEED
            dispatch(loginSuccess(response));
        } else if (response[0].id) {
            // SUCCEED
            dispatch(loginSuccess(response[0]));
        } else{
            // FAILED
            dispatch(loginFailure());
        }
    })
    .catch(response => {
        console.error(response);
        dispatch(loginFailure());
    });
  };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}
 
export function loginSuccess(info) {
    console.debug("loginSuccess : ", info);
    return {
        type: AUTH_LOGIN_SUCCESS,
        id: info.id,
        manager_name: info.name,
        // manager_name: info.manager_name,
        business_name: info.business_name,
    };
}
 
export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

export function loginWaiting(){
    return{
        type: AUTH_LOGIN_WAITING
    };
}


export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting

        console.log('____getStatus', getStatus())

        dispatch(getStatus());
        return getUserStatus()
        .then(response => response.json())
        .then((response) => {
            if(response.err==undefined){
                // SUCCEED
                dispatch(getStatusSuccess(response.info));
            }else{
                // FAILED
                dispatch(getStatusFailure());
            }
        });
        
    };
}
 
export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}
 
export function getStatusSuccess(info) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        id:info.id,
        manager_name:info.manager_name,
        business_name:info.business_name,
    };
}
 
export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}
export function logoutRequest() {
    return (dispatch) => {
        return deleteUserStatus()
        .then((response) => {
            dispatch(logout());
        });
    };
}
 
export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
