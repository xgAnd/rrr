
import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.headers.common.Accept = 'application/*';
async function getRequest(url,params={}) {
    let axiosResponse=''
    try {
        axiosResponse = await axios.get(url);
    }catch (e){
        console.log('eeeee',e)
        axiosResponse={status:-1}
    }

    return axiosResponse;


}


async function postRequest(url,params) {
    let axiosResponse=''
    try {
        axiosResponse = await axios.post(url,{...params});
    }catch (e){
        axiosResponse={status:-1}
    }

    return axiosResponse;

}

module.exports={
    getRequest,
    postRequest
}