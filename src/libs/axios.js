import axios from "axios";
import { ElMessage } from "element-plus";
import { setToken, getToken } from "@/libs/tools";
import { ElLoading } from "element-plus";
import storage from "good-storage";
let loading; //定义loading变量

function startLoading() {
    //使用Element loading-start 方法
    loading = ElLoading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
    });
}

function endLoading() {
    //使用Element loading-close 方法
    loading.close();
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
}

// 环境判断设置baseURL
// const baseURL = config.baseURL
const baseURL = "/api"; //解决前端跨域

// 定义请求头 使用JSON格式

axios.defaults.baseURL = baseURL; // Default base path

// axios.defaults.headers.post["Content-Type"] = "application/json;charSet=UTF-8";

axios.defaults.headers.get["Content-Type"] = "application/json;charSet=UTF-8";

axios.defaults.headers.put["Content-Type"] = "application/json;charSet=UTF-8";

// axios.defaults.headers.delete["Content-Type"] =
//   "application/json;charSet=UTF-8";

axios.defaults.headers.patch["Content-Type"] = "application/json;charSet=UTF-8";

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    if (!(config.data instanceof FormData)) {
        // 对非FormData类型数据进行处理
        if ((config.method === "post" && config.headers.post["Content-Type"].indexOf("application/x-www-form-urlencoded") !== -1) ||
            (config.method === "put" && config.headers.put["Content-Type"].indexOf("application/x-www-form-urlencoded") !== -1)) {
            config.transformRequest = [function(data) {
                let ret = "";

                for (let item in data) {
                    ret += encodeURIComponent(item) + "=" + encodeURIComponent(data[item]) + "&";
                }

                if (ret.length > 0) {
                    return ret.substring(0, ret.length - 1);
                } else {
                    return ret;
                }
            }];
        } else if (config.method === "delete") {
            config.transformRequest = [function(data) {
                let ret = "";
                let params = data;

                for (let item in params) {
                    ret += encodeURIComponent(item) + "=" + encodeURIComponent(params[item]) + "&";
                }

                if (ret.length > 0) {
                    return ret.substring(0, ret.length - 1);
                } else {
                    return ret;
                }
            }];
        }
    }

    // 携带token 身份验证
    let Token = getToken();
    if (Token) {
        config.headers.common["X-Access-Token"] = getToken();
        // config.headers.Authorization = `Bearer ${Token}`
    }
    showFullScreenLoading();
    return config;
}, (error) => {
    return Promise.reject(error);
});
// 添加响应拦截器
var errorNum = 0;
axios.interceptors.response.use((response) => {
    tryHideFullScreenLoading();
    if (response.status !== 200) {
        //  console.log("请求信息", response);
        return Promise.reject(new Error("Error"));
    } else {
        return response;
    }
}, (error) => {
    tryHideFullScreenLoading();
    if (error.response.data.code == 401) {
        errorNum = errorNum + 1
        if (errorNum == 1) {
            ElMessage.error(error.response.data.data);
            setTimeout(() => {
                storage.set("isLogin", false)
                window.location.href = '/'
            }, 2000)
            return false;
        }
    }
    return Promise.reject(error);
});
export default {
    /**
     * get 方法封装
     * @param url
     * @param params
     * @returns {Promise}
     */
    get(url, params = {}, config = {}) {
        return new Promise((resolve, reject) => {
            // 若使用this.$http.get('qyolg5_1GB3ak1aU2jmKq1nWpMs.js', {bu: 'DiUrXmptcGdhZJ8BogErlAEr'}) 方式传参 必须使用 {params:params}
            // 若使用this.$http.get('qyolg5_1GB3ak1aU2jmKq1nWpMs.js?bu=DiUrXmptcGdhZJ8BogErlAEr') 方式传参 必须使用 params
            axios.get(url, {
                params: params,
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    // get请求下载文件 归档下载
    downloadGet(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params,
            }).then((res) => {
                // resolve(res.data);
                let link = document.createElement("a");
                link.style.display = "none";
                link.href = res.request.responseURL;
                link.click();
            }).catch((err) => {
                reject(err);
            });
        });
    },
    /**
     * post
     * @param url
     * @param params 请求数据
     * @param config 请求头参数
     * @returns {Promise}
     */
    post(url, params = {}, config = {}) {
        if (config.headers) {
            axios.defaults.headers.post["Content-Type"] = config.headers["Content-Type"];
        } else {
            axios.defaults.headers.post["Content-Type"] = "application/json;charSet=UTF-8";
        }
        return new Promise((resolve, reject) => {
            axios.post(url, params).then((res) => {
                resolve(res.data);
            }, (err) => {
                reject(err);
            });
        });
    },

    /**
     * deleteRequest 方法封装
     * @param url
     * @param params
     * @returns {Promise}
     */
    deleteRequest(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.delete(url, params).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * put 方法封装
     * @param url
     * @param params
     * @returns {Promise}
     */
    put(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * patch 方法封装
     * @param url
     * @param params
     * @returns {Promise}
     */
    patch(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.patch(url, params).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     *  上传文件
     * @param {String} method
     * @param {String} url
     * @param {FormData} formData
     * @returns
     */
    upload(method, url, formData) {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data;",
                    "X-Access-Token": getToken(),
                },
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * 下载
     * @param {String} method 下载请求方法
     * @param {String} url 下载请求路径
     * @returns
     */
    download(method, url, filename) {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: url,
                responseType: "blob",
            }).then((res) => {
                // resolve(res);
                if (!res) {
                    return;
                }

                let url = window.URL.createObjectURL(res.data);
                let link = document.createElement("a");
                link.style.display = "none";
                link.href = url;
                var contentDisposition = res.headers["content-disposition"];

                if (filename == null || filename == undefined || filename == '') {
                    link.setAttribute("download", decodeURI(contentDisposition.substring(contentDisposition.indexOf("filename=") + "filename=".length)));
                } else {
                    debugger
                    link.setAttribute("download", filename + contentDisposition.substring(contentDisposition.lastIndexOf(".")));
                }

                document.body.appendChild(link);
                link.click();
            }).catch((err) => {
                reject(err);
            });
        });
    },
};