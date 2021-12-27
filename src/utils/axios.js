import axios from 'axios'
import Antd from 'ant-design-vue'

const baseUrl = process.env.VUE_APP_API_BASE_URL

class HttpRequest {
    constructor() {
        this.baseUrl = baseUrl
    }

    getInsideConfig() {
        return {
            baseURL: this.baseUrl,
            timeout: 15000 // 请求超时时间
        }
    }

    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            const {data, status} = res
            return {data, status}
        }, error => {
            let errorInfo = error.response
            if (!errorInfo) {
                const {request: {statusText, status}, config} = JSON.parse(JSON.stringify(error))
                errorInfo = {
                    statusText,
                    status,
                    request: {responseURL: config.url}
                }
            }
            if (errorInfo.data.code) {
                Antd.message.error(errorInfo.data.msg)
            }
            return Promise.reject(error)
        })
    }

    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

export default HttpRequest
