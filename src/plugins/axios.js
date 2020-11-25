import axios from 'axios';
import { Notification } from 'element-ui';
// 默认可以找到index.js
import router from '@/router'
// 设置baseURL
axios.defaults.baseURL = 'http://localhost:3003';


// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // console.log(config);
    // 给configheader添加token
    let { token } = sessionStorage;
    config.headers.Authorization = `Bearer ${token}`;
    // 在发送请求之前做些什么
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function({
    status,
    data,
    statusText
}) {
    if (status === 200) {
        return data;
    }
}, function({ response }) {

    let { status, statusText, data } = response;
    // console.log(status, statusText, data)
    switch (status) {
        case 401:
            let expiredTime = new Date(data.inner.expiredAt).toLocaleString();
            Notification.error({
                    title: "错误",
                    message: `登录超时,有限期至${expiredTime}，请重新登录`
                })
                // 组件外部，使用router实例进行跳转				
                // 获取当前地址
            let { path } = router.history.current;
            router.replace({
                path: '/login',
                query: { redirect: path }
            })

            break;
        case 404:
            console.error(status, statusText);
            break;
        case 500:
            console.error(status, statusText);
            break;
        default:
            break;
    }
});