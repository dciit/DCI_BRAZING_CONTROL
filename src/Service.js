import Axios from "axios";
const http = Axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});

export default http;

export function ServiceGetLineControl() {
    return new Promise(resolve => {
        http.get(`/brazing/linecontrol`).then((res) => {
            resolve(res.data);
        })
    })
}

export function ServiceGetUser(lineControl) {
    return new Promise(resolve => {
        http.get(`/brazing/user/` + lineControl).then((res) => {
            console.log(res)
            resolve(res.data);
        })
    });
}

export const ServiceGetColsMatrix = (second) => {
    return new Promise((resolve) => {
        http.get(`/brazing/matrix/column`).then((res) => {
            resolve(res.data)
        })
    })
}

export const ServiceGetDataMatrix = () => {
    return new Promise(resolve => {
        http.get(`/brazing/matrix`).then((res) => {
            resolve(res.data);
        })
    })
}

export const ServiceLogin = (empcode) => {
    return new Promise(resolve => {
        http.post(`/user/login`, { code: empcode }).then((res)=>{
            resolve(res.data);
        })
    })
}