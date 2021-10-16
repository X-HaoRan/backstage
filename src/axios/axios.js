import axios from 'axios'

//创建默认实例
const instance = axios.create({
    baseURL:`http://hrv.panbl.cn:8888/api/private/v1/`,
    timeout: 5000
});

instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token=localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = token;
    }
    return config;
  });

//暴露实例对象
export default instance;