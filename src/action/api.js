import {SERVER_URL} from '../const/setting';

function _createPostInit(body_data) {
    return {
        method: "POST",
        credentials: 'include',
        headers: {
        'Content-type': 'application/json'
        },
        body: body_data
    }
}
function _createPostInitNoBody() {
    return {
        method: "POST",
        credentials: 'include',
        headers: {
        'Content-type': 'application/json'
        }
    }
}
function _createGetInit() {
    return {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        }
    }
}
function _createDeleteInit() {
    return {
        method: "DELETE",
        credentials: 'include'
    }
}

export function postUserLogin(id, password) {
    const body = JSON.stringify({id, password})
    return fetch(`${SERVER_URL}/signin`, _createPostInit(body))
}

export function postBusinessGet(id) {
    const body = JSON.stringify({id})
    return fetch(`${SERVER_URL}/selectBusiness`, _createPostInit(body))
}
export function postSelectWorker(business) {
    const body = JSON.stringify({business})
    return fetch(`${SERVER_URL}/selectWorker`, _createPostInit(body))
}
export function selectWorkTodo(bang, year, month, date, worker) {
    const body = JSON.stringify({bang, year, month, date, worker})
    return fetch(`${SERVER_URL}/selectWorkTodo`, _createPostInit(body))
}
export function getUserStatus() {
    return fetch(`${SERVER_URL}/signin?type=session`, _createGetInit())
}
export function deleteUserStatus() {
    return fetch(`${SERVER_URL}/signin?type=session`, _createDeleteInit())
}
