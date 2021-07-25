// action type
const SET_USER = 'SET_USER'
const SET_BUSINESS = 'SET_BUSINESS'
const GET_USER = 'GET_USER'
const GET_BUSINESS = 'GET_BUSINESS'

// action creators
function setUser(text) {
	return { type: SET_USER, text };
}

function setUser2() {
  return (dispatch) => {
	return fetch("api/set.json").then(
		res => res.json().then(data => dispatch(setUser(data.useridx)))
	);
  };
}
function setBusiness(text) {
	console.debug("setBusiness",text);
	return { type: SET_BUSINESS, text };
}

function setBusiness2() {
  return (dispatch) => {
	return fetch("api/set.json").then(
		res => res.json().then(data => dispatch(setBusiness(data.businessname)))
	);
  };
}


export  {
	SET_USER,
	SET_BUSINESS,
	setUser,
	setUser2,
    setBusiness,
    setBusiness2
}
