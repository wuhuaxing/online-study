import axios from 'axios'
import qs from 'qs'

// axios.defaults.baseUrl = 'http://www.aposs.cn:8083/'
axios.defaults.timeout = 5000

//POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data)
  }
  config.headers = {
  	'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config
},(error) =>{
   alert("错误的传参");
  return Promise.reject(error);
});

export default axios