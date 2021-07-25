
import {SERVER_URL} from '../const/setting';
import { postUserLogin, getUserStatus, deleteUserStatus } from './api';
import { postBusinessGet } from './api';

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";
export const AUTH_LOGIN_WAITING = "AUTH_LOGIN_WAITING";
// Check business
export const AUTH_BUSINESS = "AUTH_BUSINESS";
export const AUTH_BUSINESS_SUCCESS = "AUTH_BUSINESS_SUCCESS";
export const AUTH_BUSINESS_FAILURE = "AUTH_BUSINESS_FAILURE";
export const AUTH_BUSINESS_WAITING = "AUTH_BUSINESS_WAITING";
// Check sessions
export const AUTH_GET_STATUS = "AUTH_GET_STATUS";
export const AUTH_GET_STATUS_SUCCESS = "AUTH_GET_STATUS_SUCCESS";
export const AUTH_GET_STATUS_FAILURE = "AUTH_GET_STATUS_FAILURE";
export const AUTH_LOGOUT = "AUTH_LOGOUT";


const ip = SERVER_URL;

/* BUSINESS */
export function businessRequest(id, business_id) {
    return (dispatch) => {
      // Inform Login API is starting
      dispatch(business_login());

      // API REQUEST
      return postBusinessGet(id)
      .then(response => response.json())
      .then((response) => {
        console.debug("businessRequest", response)
          if (response[0].id) {
              // SUCCEED
              if (!business_id) business_id = response[0].id
              dispatch(businessSuccess(response, business_id));
          } else{
              // FAILED
              dispatch(businessFailure());
          }
      })
      .catch(response => {
          console.error(response);
          dispatch(businessFailure());
      });
    };
  }

  export function business_login() {
    return {
        type: AUTH_BUSINESS
    };
}

export function businessSuccess(business_info, business_id) {
    return {
        type: AUTH_BUSINESS_SUCCESS,
        business_info: business_info,
        business_name: business_id,
    };
}
 
export function businessFailure() {
    return {
        type: AUTH_BUSINESS_FAILURE
    };
}

export function businessWaiting(){
    return{
        type: AUTH_BUSINESS_WAITING
    };
}

/* LOGIN */
export function loginRequest(id, password) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());

    // API REQUEST
    return postUserLogin(id, password)
    .then(response => response.json())
    .then((response) => {
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
