const USERINFO_ID = "userInfo::id"
const USERINFO_PW = "userInfo::pw"
const USERINFO_BUSINESS_ID = "userInfo::business_id"
const USERINFO_IS_LOGGED_IN = "userInfo::is_logged_in"

const USERINFO_TRUE = "1"
const USERINFO_FALSE = "0"


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
    return Buffer.from(localStorage.getItem(USERINFO_ID), 'base64').toString('utf8');
}
export function getUserInfoPw() {
    return Buffer.from(localStorage.getItem(USERINFO_PW), 'base64').toString('utf8');
}
export function getUserInfoBusinessId() {
    return Buffer.from(localStorage.getItem(USERINFO_BUSINESS_ID), 'base64').toString('utf8');
}

export function setUserInfoIsLoggedIn(is_logged_in) {
    if (is_logged_in) localStorage.setItem(USERINFO_IS_LOGGED_IN, USERINFO_TRUE);
    else localStorage.setItem(USERINFO_IS_LOGGED_IN, USERINFO_FALSE)
}
export function setUserInfoId(id) {
    localStorage.setItem(USERINFO_ID, Buffer.from(id, "utf8").toString('base64'));
}
export function setUserInfoPw(pw) {
    localStorage.setItem(USERINFO_PW, Buffer.from(pw, "utf8").toString('base64'));
}
export function setUserInfoBusinessId(business_id) {
    if (!business_id) business_id = ""
    localStorage.setItem(USERINFO_BUSINESS_ID, Buffer.from(business_id, "utf8").toString('base64'));
}
