import Cookies from "js-cookie";
// cookie保存的天数
const cookieExpires = 1;
export const TOKEN_KEY = "token";

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 });
};
export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) return token;
    else return false;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length);
    let i = -1;
    let res = [];
    while (++i < len) {
        const item = arr2[i];
        if (arr1.indexOf(item) > -1) res.push(item);
    }
    return res;
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]));
};

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = (num) => {
    return num < 10 ? "0" + num : num;
};

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent;
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1;
    };
    if (isExplorer("MSIE")) return "IE";
    else if (isExplorer("Firefox")) return "Firefox";
    else if (isExplorer("Chrome")) return "Chrome";
    else if (isExplorer("Opera")) return "Opera";
    else if (isExplorer("Safari")) return "Safari";
};

/**
 * @param {String} time 时间字符串
 * @returns 'yyyy-MM-dd HH:mm:ss' 日期
 */
export const formatDatetime = function(time) {
    if (time !== null && time !== undefined && time != "") {
        if (time.lastIndexOf(".") !== -1) {
            time = time.substring(0, time.lastIndexOf(".")).replace(/-/g, "/");
        } else {
            time = time.replace(/-/g, "/");
        }
        time = time.replace(/T/g, " ");

        var date = new Date(time);
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    } else {
        return "-";
    }
};

/**
 *
 * @param {String} time 时间字符串
 * @returns 'yyyy-MM-dd' 日期
 */
export const formatDate = function(time) {
    if (time !== null && time !== undefined && time != "") {
        if (time.lastIndexOf(".") !== -1) {
            time = time.substring(0, time.lastIndexOf(".")).replace(/-/g, "/");
        } else {
            time = time.replace(/-/g, "/");
        }
        time = time.replace(/T/g, " ");

        var date = new Date(time);
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        return year + "-" + month + "-" + day;
    } else {
        return "";
    }
};

/**
 * 
 * @param {File} file 图片文件
 * @param {String} callback 转换完成后的回调函数
 */
export const imgFileToBase64 = function(file, callback) {
    var reader = new FileReader();

    reader.readAsDataURL(file.raw);
    reader.onload = function(e) {
        callback(this.result); //base64编码
    };
};

/**
 * 
 * @param 身份证校验
 */
export const isIdNo = function(cardId) {
        var regIdNo = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return regIdNo.test(cardId)
    }
    /**
     * 
     * @param 手机号校验
     */
export const isPhone = function(phone) {
        var regPhone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        return regPhone.test(phone)
    }
    /**
     * 
     * @param 是否有汉字
     */
export const isChinese = function(str) {
    var regStr = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    return regStr.test(str)
}

// 处理流程显示数据
export const handleData = function(obj) {
    // 处理数据 相关百分比转化
    obj.odrTotalRate = verifyXc(obj.odrTotalRate);
    obj.odrMinRate = verifyXc(obj.odrMinRate);
    obj.odrBonusRate = verifyXc(obj.odrBonusRate);
    obj.odrReturnRate = verifyXc(obj.odrReturnRate);
    obj.odrProfitRate = verifyXc(obj.odrProfitRate);
    obj.odrFirstSysRate = verifyXc(obj.odrFirstSysRate);
    obj.odrFirstRate = verifyXc(obj.odrFirstRate);
    obj.odrGrossRate = verifyXc(obj.odrGrossRate);
    obj.odrLoanRate = verifyXc(obj.odrLoanRate);
    obj.odrProRate = verifyXc(obj.odrProRate);
    obj.odrAddInterest = verifyXc(obj.odrAddInterest); //加息
    obj.odrMonInterest = verifOdrMon(obj.odrMonInterest).toFixed(5); //月息
    obj.odrMonInterest = upFixed(obj.odrMonInterest, 2);
    return obj;
}


function verifyXc(value) {
    if (value) {
        var s = (value * 100000000000) / 1000000000;
        return strip(s);
    } else {
        return 0;
    }
}

function strip(num, precision = 12) {
    return parseFloat(num.toPrecision(precision));
}

function verifOdrMon(value) {
    // 针对月息单独处理 千分比 保留小数2位
    if (value) {
        var s = (value * 1000000000) / 1000000;
        return s;
    } else {
        return 0;
    }
}

function upFixed(num, fix) {
    // num为原数字，fix是保留的小数位数
    let result = "0";
    if (Number(num) && fix > 0) {
        // 简单的做个判断
        fix = +fix || 2;
        num = num + "";
        if (/e/.test(num)) {
            // 如果是包含e字符的数字直接返回
            result = num;
        } else if (!/\./.test(num)) {
            // 如果没有小数点
            result = num + `.${Array(fix + 1).join("0")}`;
        } else {
            // 如果有小数点
            num = num + `${Array(fix + 1).join("0")}`;
            let reg = new RegExp(`-?\\d*\\.\\d{0,${fix}}`);
            let floorStr = reg.exec(num)[0];
            if (+floorStr >= +num) {
                result = floorStr;
            } else {
                let floorNumber = +floorStr + +`0.${Array(fix).join("0")}1`;
                let point = /\./.test(floorNumber + "") ? "" : ".";
                let floorStr2 = floorNumber + point + `${Array(fix + 1).join("0")}`;
                result = reg.exec(floorStr2)[0];
            }
        }
    }
    return result;
}


// 流程处理非空
export const verifEmpty = function(value) {
    if (value) {
        return value - 0;
    } else {
        return 0;
    }
}
export const verifBfb = function(value) {
    if (value) {
        return (value * 10000000) / 1000000000;
    } else {
        return 0;
    }
}
export const verifQfb = function(value) {
    if (value) {
        return (value * 100000000) / 100000000000;
    } else {
        return 0;
    }
}