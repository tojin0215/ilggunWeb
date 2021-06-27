
import userinfoAction from '../action/index';

const {SET_USER, SET_BUSINESS} = userinfoAction.userinfo;


const userinfo = (state = [], action) => {
    switch (action.type) {
      case SET_USER:
        return {
            ...state , username:action.text
        }
      case SET_BUSINESS:
        console.log("setbusiness state: ");
        console.log(state);
        return {
            ...state , businessname:action.text
        }
      default:
        return state;
    }
}
export default userinfo;
