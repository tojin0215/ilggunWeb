const USERINFO_ID = "userInfo::id"
const USERINFO_PW = "userInfo::pw"
const USERINFO_BUSINESS_ID = "userInfo::business_id"
const USERINFO_IS_LOGGED_IN = "userInfo::is_logged_in"

const USERINFO_TRUE = "1"
const USERINFO_FALSE = "0"


function setter(key, value) {
    if (value) localStorage.setItem(key, Buffer.from(value, "utf8").toString('base64'));
    else localStorage.removeItem(key)
}
function getter(key) {
    const value = localStorage.getItem(key)
    return (value) ? Buffer.from(value, 'base64').toString('utf8') : null;
}

export function getUserInfo() {
    return {
        isLoggedIn: getUserInfoIsLoggedIn(),
        id: getUserInfoId(),
        pw: getUserInfoPw(),
        business_id: getUserInfoBusinessId(),
    }
}
export function setUserInfo(id, pw, business_id) {
    setUserInfoIsLoggedIn(true);
    setUserInfoId(id);
    setUserInfoPw(pw);
    setUserInfoBusinessId(business_id);
}
export function clearUserInfo() {
    localStorage.clear();
}

export function getUserInfoIsLoggedIn() {
    return Boolean(Number(localStorage.getItem(USERINFO_IS_LOGGED_IN)))
}
export function getUserInfoId() {
    return getter(USERINFO_ID);
}
export function getUserInfoPw() {
    return getter(USERINFO_PW);
}
export function getUserInfoBusinessId() {
    return getter(USERINFO_BUSINESS_ID);
}

export function setUserInfoIsLoggedIn(is_logged_in) {
    if (is_logged_in) localStorage.setItem(USERINFO_IS_LOGGED_IN, USERINFO_TRUE);
    else localStorage.setItem(USERINFO_IS_LOGGED_IN, USERINFO_FALSE)
}
export function setUserInfoId(id) {
    setter(USERINFO_ID, id)
}
export function setUserInfoPw(pw) {
    setter(USERINFO_PW, pw)
}
export function setUserInfoBusinessId(business_id) {
    setter(USERINFO_BUSINESS_ID, business_id)
}
