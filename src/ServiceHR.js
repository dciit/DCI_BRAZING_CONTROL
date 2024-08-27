import Axios from "axios";
const httphr = Axios.create({
    baseURL: 'http://dciweb.dci.daikin.co.jp/hrapi/login',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});

export default httphr;

export function API_HR_LOGIN(param) {
    return new Promise(resolve => {
        httphr.post(``, param).then((res) => {
            resolve(res.data);
        })
    })
}