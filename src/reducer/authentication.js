import authenticationAction from '../action/index';

const {AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,AUTH_LOGIN_WAITING, AUTH_GET_STATUS, AUTH_GET_STATUS_SUCCESS,AUTH_GET_STATUS_FAILURE, AUTH_LOGOUT} = authenticationAction.authentication;
const { AUTH_BUSINESS, AUTH_BUSINESS_SUCCESS, AUTH_BUSINESS_FAILURE, AUTH_BUSINESS_WAITING, AUTH_BUSINESS_UPDATE}  = authenticationAction.authentication;


const authentication = (state =
    {
      userinfo : {
        id:"", manager_name:"", business_name:"", business_info:[]
      },
      login : {
        status: 'FAILURE'
      },
      status : {}
    }, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                login : {
                    status: 'WAITING'
                }
            }
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                userinfo:{
                  id:action.id,
                  manager_name:action.manager_name,
                  business_name:action.business_name,
                },
                login: {
                    status: 'SUCCESS'
                },
                status: {
                    ...state.status,
                    isLoggedIn: true,
                    currentUser: action.id
                }
            }
        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                login:{
                    status: 'FAILURE'
                }
            }
       
        case AUTH_LOGIN_WAITING:
            return {
                ...state,
                login:{
                    status: 'PERMITWAITING'
                }
            }     
        case AUTH_GET_STATUS:
                return {
                  ...state,
                  status: {
                    ...state.staus,
                    isLoggedIn: true
                  }
                }
        case AUTH_GET_STATUS_SUCCESS:
                return {
                  ...state,
                  userinfo:{
                    id:action.id,
                    manager_name:action.manager_name,
                    business_name:action.business_name,
                  },
                  status: {
                    ...state.status,
                    valid: true,
                    currentUser: action.id
                  }
                }
        case AUTH_GET_STATUS_FAILURE:
              return {
                  ...state,
                  userinfo:{
                    id:'',
                    manager_name:'',
                    business_name:'',
                  },
                  status: {
                    ...state.status,
                    valid: false,
                    isLoggedIn: false
                  }
              }
          case AUTH_LOGOUT:
              return {
                    ...state,
                    userinfo:{
                      id:'',
                      manager_name:'',
                      business_name:'',
                    },
                    status: {
                      ...state.status,
                      isLoggedIn: false,
                      currentUser: ''
                    }
              }
          case AUTH_BUSINESS:
            return state;
          
          case AUTH_BUSINESS_SUCCESS:
            return {
                  ...state,
                  userinfo:{
                    ...state.userinfo,
                    business_info: action.business_info,
                    business_name: action.business_name,
                  },
                  status: {
                    ...state.status
                  }
            }
          
          case AUTH_BUSINESS_FAILURE:
            return {
                  ...state,
                  userinfo:{
                    ...state.userinfo,
                    business_info: [],
                    business_name: "",
                  },
                  status: {
                    ...state.status
                  }
            }
          case AUTH_BUSINESS_UPDATE:
            return {
                  ...state,
                  userinfo:{
                    ...state.userinfo,
                    business_name: action.business_name,
                  },
                  status: {
                    ...state.status
                  }
            }
        
        default:
            return state;
    }
}
export default authentication;