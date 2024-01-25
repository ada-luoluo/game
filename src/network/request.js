import axios from 'axios'
import router from '../router'

export function request(config) {
    //1.创建axios的实例
    const instance = axios.create({
        baseURL: 'https://api.1x1games.com/api',
        // timeout: 5000
    })

    //2.1请求拦截
    instance.interceptors.request.use(config => {
        // config.headers = {'Content-Disposition':'attachment'}

        //语言切换
        const language = localStorage.getItem('language') || 'hk'
        if (language == "hk") {
            config.headers = {'locale-key':'1'}
        } else if (language == "cn") {
            config.headers = {'locale-key':'2'}
        } else {
            config.headers = {'locale-key':'3'}
        }

        const token = localStorage.getItem('token');
        if (token !== null) { // 判断是否需要添加token
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    }, err => {
        console.log(err)
    });

    //2.2 响应拦截  一定要记得返回!!!!
    instance.interceptors.response.use(res => {
        //401
        if (res.data.code === 401) {
            // 判断是否为未授权错误
            if (router.currentRoute.value.name === 'Exchange') {
                // 如果当前页面是 Exchange，不返回登录.Exchange中个人积分需要token授权,但是不授权也可以查看其它信息
            } else if (router.currentRoute.value.name === 'exchangeDetails') {
                 //不登錄
            } else {
                // 否则跳转到登录页面
                router.push({
                    name: 'Login',
                   // query: { redirect: router.currentRoute.value.fullPath },
                })
            }
        }
        return res
    }, err => {
        console.log(err)
    });

    //3.发送网络请求
    return instance(config)
}

