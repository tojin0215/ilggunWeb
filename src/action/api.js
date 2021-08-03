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

// export function selectWorkTodo(bang, year, month, date, worker) {
//     const body = JSON.stringify({bang, year, month, date, worker})
//     return fetch(`${SERVER_URL}/selectWorkTodo`, _createPostInit(body))
// }


// User
export function searchId(user_id) {
    const body = JSON.stringify({id: user_id})
    return fetch(`${SERVER_URL}/searchId`, _createPostInit(body)).then(result => result.json())
}

export function selectUsername(user_id) {
    const body = JSON.stringify({id: user_id})
    return fetch(`${SERVER_URL}/selectUsername`, _createPostInit(body)).then(result => result.json())
}

// Work
export function selectWorker(business_id) {
    const body = JSON.stringify({business: business_id})
    return fetch(`${SERVER_URL}/selectBusinessByWorker`, _createPostInit(body))
}
export function deleteWorker(business_id, worker_id) {
    const body = JSON.stringify({workername: worker_id, business: business_id})
    return fetch(`${SERVER_URL}/deleteWorker`, _createPostInit(body))
}
export function selectOvertimework(business_id, year, month) {
    const body = JSON.stringify({year: year, month: month, business: business_id})
    return fetch(`${SERVER_URL}/selectOvertimework`, _createPostInit(body))
}
export function selectTimelog(business_id, year, month, date) {
    const body = JSON.stringify({year: year, month: month, date: date, bang: business_id})
    return fetch(`${SERVER_URL}/selectTimelog`, _createPostInit(body))
}
export function selectTimelogAsWorker(business_id, worker_id, year, month, date) {
    const body = JSON.stringify({year: year, month: month, date: date, bang: business_id, workername: worker_id})
    return fetch(`${SERVER_URL}/selectTimelogAsWorker`, _createPostInit(body))
}
// export function selectWorkTodo(business_id, worker_id, year, month, date) {
//     const body = JSON.stringify({year: year, month: month, date: date, bang: business_id, worker: worker_id})
//     return fetch(`${SERVER_URL}/selectWorkTodo`, _createPostInit(body))
// }
export function addWorkTodo(business_id, worker_id, year, month, date, todo) {
    const body = JSON.stringify({year: year, month: month, date: date, bang: business_id, worker: worker_id, todo: todo})
    return fetch(`${SERVER_URL}/addWorkTodo`, _createPostInit(body))
}
export function addWorkTodoCheck(business_id, worker_id, year, month, date, todo) {
    const body = JSON.stringify({year: year, month: month, date: date, bang: business_id, worker: worker_id, todo: todo})
    return fetch(`${SERVER_URL}/addWorkTodoCheck`, _createPostInit(body))
}
export function deleteWorkTodo(business_id, worker_id, year, month, date, todo) {
    const body = JSON.stringify({year: year, month: month, date: date, bang: business_id, worker: worker_id, key: todo})
    return fetch(`${SERVER_URL}/deleteWorkTodo`, _createPostInit(body))
}
export function selectWorkerAsDay(business_id, worker_id, year, month, date, day) {
    const body = JSON.stringify({year: year, month: month, date: date, business: business_id, worker: worker_id, day: day})
    return fetch(`${SERVER_URL}/selectWorkerAsDay`, _createPostInit(body))
}
export function selectWorkerAsDayAsWorker(business_id, worker_id, year, month, date, day) {
    const body = JSON.stringify({year: year, month: month, date: date, business: business_id, workername: worker_id, day: day})
    return fetch(`${SERVER_URL}/selectWorkerAsDayAsWorker`, _createPostInit(body))
}
export function otherAllowance(business_id, worker_id, year, month) {
    const body = JSON.stringify({year: year, month: month, bang: business_id, id: worker_id})
    return fetch(`${SERVER_URL}/otherAllowance`, _createPostInit(body))
}

// Business
export function delBusiness(business_id) {
    const body = JSON.stringify({bang: business_id})
    return fetch(`${SERVER_URL}/delBusiness`, _createPostInit(body))
}
export function selectBusiness(business_id) {
    const body = JSON.stringify({id: business_id})
    return fetch(`${SERVER_URL}/selectBusiness`, _createPostInit(body))
}
export function selectWorkerByType(business_id, type) {
    // type = 1// 미계약
    // type = 2// 계약
    const body = JSON.stringify({business: business_id, type: type})
    return fetch(`${SERVER_URL}/selectWorkerByType`, _createPostInit(body))
}
export function selectBusinessByName(business_id) {
    const body = JSON.stringify({bname: business_id})
    return fetch(`${SERVER_URL}/selectBusinessByName`, _createPostInit(body))
}

// ContractForm
export function selectContractform2(user_id, business_id) {
    const body = JSON.stringify({id: user_id, bang: business_id})
    return fetch(`${SERVER_URL}/selectContractform2`, _createPostInit(body))
}
export function selectContractform(user_id, business_id) {
    const body = JSON.stringify({id: user_id, bang: business_id})
    return fetch(`${SERVER_URL}/selectContractform`, _createPostInit(body))
}

// Message
export function selectReceivedMessage(to_user_id) {
    const body = JSON.stringify({t: to_user_id})
    return fetch(`${SERVER_URL}/selectReceivedMessage`, _createPostInit(body))
}
export function selectReceivedNewMessage(to_user_id) {
    const body = JSON.stringify({t: to_user_id})
    return fetch(`${SERVER_URL}/selectReceivedNewMessage`, _createPostInit(body))
}
export function selectSentMessage(from_user_id) {
    const body = JSON.stringify({id: from_user_id})
    return fetch(`${SERVER_URL}/selectSentMessage`, _createPostInit(body))
}
export function sendMessage(from_user_id, from_user_name, to_user_id, to_user_name, message, time) {
    const body = JSON.stringify({
        system: 1,
        type: 1,
        f: from_user_id,
        f_name: from_user_name,
        t: to_user_id,
        t_name: to_user_name,
        message: message,
        time: time
    })
    return fetch(`${SERVER_URL}/sendMessage`, _createPostInit(body))
}
export function alterReadMessage(message_id) {
    const body = JSON.stringify({ind: message_id})
    return fetch(`${SERVER_URL}/alterReadMessage`, _createPostInit(body))
}
export function delMessage(message_id) {
    const body = JSON.stringify({ind: message_id})
    return fetch(`${SERVER_URL}/delMessage`, _createPostInit(body))
}

// upload
export function upload(business_id, file) {
    // const body = JSON.stringify({body: JSON.stringify({bname: file_name, file: file})})
    const form = new FormData();
    form.append("business_id", business_id);
    form.append("userfile", file);
    return fetch(
        `http://127.0.0.1:3000/upload`, {
            method: "POST",
            credentials: 'include',
            body: form,
        })
    return fetch(
        `${SERVER_URL}/upload`, {
            method: "POST",
            credentials: 'include',
            body: form,
        })
}
export function download(business_id, file_name) {
    // const body = JSON.stringify({body: JSON.stringify({bname: file_name, file: file})})
    return fetch(
        `http://127.0.0.1:3000/download/${business_id}/${file_name}`,
        {})
    return fetch(
        `${SERVER_URL}/download/${business_id}/${file_name}`,
        {})
}
export function filelist(business_id) {
    const body = JSON.stringify({business_id: business_id})
    return fetch(`http://127.0.0.1:3000/log/download`, _createPostInit(body))
    return fetch(`${SERVER_URL}/log/download`, _createPostInit(body))
}

// File
export function getBase64(file) {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
