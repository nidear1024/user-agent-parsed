'use strict'

var REGSTR_EDGE = /edge\/[\d.]+/gi;
var REGSTR_IE = /trident\/[\d.]+/gi;
var REGSTR_OLD_IE = /msie\s[\d.]+/gi;
var REGSTR_FF = /firefox\/[\d.]+/gi;
var REGSTR_CHROME = /chrome\/[\d.]+/gi;
var REGSTR_SAF = /safari\/[\d.]+/gi;
var REGSTR_OPERA = /opr\/[\d.]+/gi;
var REGSTR_OPERA_TOUCH = /opt\/[\d.]+/gi;
var REGSTR_WECHAR = /MicroMessenger\/[\d.]+/gi;
var REGSTR_VIVSLDI = /Vivaldi\/[\d.]+/gi;
var REGSTR_UC = /UBrowser\/[\d.]+/gi;
var REGSTR_MI = /MiuiBrowser\/[\d.]+/gi;
var REGSTR_SAMSUNG = /SamsungBrowser\/[\d.]+/gi;
var REGSTR_QQ = /QQBrowser\/[\d.]+/gi;
var REGSTR_FB = /FBAV\/[\d.]+/gi;
var REGSTR_APPLE_PHONE = /(iphone|ipod|ipad)/gi;
var REGSTR_APPLE_SYSTEM_VERSION = /OS [\d._]*/gi;
var REGSTR_NUM = /[^0-9|_.]/gi;
var REGSTR_UNDERLINR = /_/gi;
var REGSTR_ISMOBILE = /iphone|ios|android|mobile|ipad|symbos|iemobile|phone|bb10/i;

var spider_sign_arr = [
    "baiduspider", "googlebot",
    "360spider", "bingbot",
    "bytespider", "applebot",
    "msnbot", "sosospider",
    "sosoimagespider", "baidu transcoder",
    "sogou pic spider", "sogou web spider", "sogou-test-spider",
    "youdaobot", "easouspider",
    "huaweisymantecspider", "yisouspider",
    "yahoo! slurp", "yahoo contentmatch crawler",
    "twiceler", "qihoobot",
    "naverBot", "surveybot",
    "discobot", "yanga worldsearch bot",
    "bot", "spider",
];


/**
 * @description
 * @param {*String} useragent
 * @returns {*Json} { "Browser Name": "unknow", "Browser Version": "unknow" }
 */
function getBrowserInfo(useragent) {
    let browserInfo = {
        "Browser Name": "unknow",
        "Browser Version": "unknow"
    };
    let agent = useragent.toString().toLowerCase();


    // Spider
    let isSpider = spider_sign_arr.some(function (item) {
        if (agent.indexOf(item) > 0) {
            browserInfo["Browser Name"] = "Spider " + item;
            browserInfo["Browser Version"] = "";
            return true;
        }
    }) || false;

    if (isSpider) return browserInfo;

    // IE
    if (agent.indexOf('trident') > 0) {
        browserInfo["Browser Name"] = "IE+";
        browserInfo["Browser Version"] = agent.match(REGSTR_IE)[0].split('/')[1];
        return browserInfo;
    }
    // OLD_IE
    if (agent.indexOf('msie') > 0) {
        browserInfo["Browser Name"] = "IE-";
        browserInfo["Browser Version"] = agent.match(REGSTR_OLD_IE)[0].split(' ')[1];
        return browserInfo;
    }

    // SamsungBrowser
    if (agent.indexOf('samsungbrowser') > 0) {
        browserInfo["Browser Name"] = "SamsungBrowser";
        browserInfo["Browser Version"] = agent.match(REGSTR_SAMSUNG)[0].split('/')[1];
        return browserInfo;
    }
    // FaceBook
    if (agent.indexOf('fbav') > 0) {
        browserInfo["Browser Name"] = "FaceBook";
        browserInfo["Browser Version"] = agent.match(REGSTR_FB)[0].split('/')[1];
        return browserInfo;
    }
    // QQBrowser
    if (agent.indexOf('qqbrowser') > 0) {
        browserInfo["Browser Name"] = "QQBrowser";
        browserInfo["Browser Version"] = agent.match(REGSTR_QQ)[0].split('/')[1];
        return browserInfo;
    }

    // MiuiBrowser
    if (agent.indexOf('miuibrowser') > 0) {
        browserInfo["Browser Name"] = "MiuiBrowser";
        browserInfo["Browser Version"] = agent.match(REGSTR_MI)[0].split('/')[1];
        return browserInfo;
    }
    // UBrowser
    if (agent.indexOf('ubrowser') > 0) {
        browserInfo["Browser Name"] = "UC";
        browserInfo["Browser Version"] = agent.match(REGSTR_UC)[0].split('/')[1];
        return browserInfo;
    }
    // Vivaldi
    if (agent.indexOf('vivaldi') > 0) {
        browserInfo["Browser Name"] = "Vivaldi";
        browserInfo["Browser Version"] = agent.match(REGSTR_VIVSLDI)[0].split('/')[1];
        return browserInfo;
    }
    // Edge
    if (agent.indexOf('edge') > 0) {
        browserInfo["Browser Name"] = "Edge";
        browserInfo["Browser Version"] = agent.match(REGSTR_EDGE)[0].split('/')[1];
        return browserInfo;
    }
    // Firefox
    if (agent.indexOf('firefox') > 0) {
        browserInfo["Browser Name"] = "Firefox";
        browserInfo["Browser Version"] = agent.match(REGSTR_FF)[0].split('/')[1];
        return browserInfo;
    }
    // Opera
    if (agent.indexOf('opr') > 0) {
        browserInfo["Browser Name"] = "Opera";
        browserInfo["Browser Version"] = agent.match(REGSTR_OPERA)[0].split('/')[1];
        return browserInfo;
    }
    // Opera Touch
    if (agent.indexOf('opt') > 0) {
        browserInfo["Browser Name"] = "Opera Touch";
        browserInfo["Browser Version"] = agent.match(REGSTR_OPERA_TOUCH)[0].split('/')[1];
        return browserInfo;
    }
    // WeChat
    if (agent.indexOf('micromessenger') > 0) {
        browserInfo["Browser Name"] = "WeChat";
        browserInfo["Browser Version"] = agent.match(REGSTR_WECHAR)[0].split('/')[1];
        return browserInfo;
    }
    // Safari
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
        browserInfo["Browser Name"] = "Safari";
        browserInfo["Browser Version"] = agent.match(REGSTR_SAF)[0].split('/')[1];
        return browserInfo;
    }
    // Chrome
    if (agent.indexOf('chrome') > 0) {
        browserInfo["Browser Name"] = "Chrome";
        browserInfo["Browser Version"] = agent.match(REGSTR_CHROME)[0].split('/')[1];
        return browserInfo;
    }

    return browserInfo;
}

/**
 * @description 获取客户端系统
 * @param {*String} useragent
 * @returns {*Json}  {"System OS Name":"Unknown"}
 */
function getSystemOS(useragent) {
    let systemOS = "Unknown";
    let agent = useragent.toString().toLowerCase();

    if (agent.indexOf('mac os x') > -1) {
        let type = agent.match(REGSTR_APPLE_PHONE);
        if (type) {
            let name = (type[0]).toString();
            systemOS = name.charAt(0).toUpperCase() + name.slice(1) + " " + getVersion(useragent, 'iphone');
        } else {
            systemOS = 'Mac OS ' + getVersion(useragent, 'mac os x');
        }
    } else if (agent.indexOf('symbos') > -1) {
        systemOS = 'SymbOS ' + getVersion(useragent, 'symbos');
    } else if (agent.indexOf('cros') > -1) {
        systemOS = 'Chromium OS ' + getVersion(useragent, 'cros');
    } else if (agent.indexOf('windows phone') > -1) {
        systemOS = 'Windows Phone ' + getVersion(useragent, 'windows phone');
    } else if (agent.indexOf('android') > -1) {
        systemOS = 'Android ' + getVersion(useragent, 'android');
    } else if (agent.indexOf('bb10') > -1) {
        systemOS = 'BlackBerry ' + getVersion(useragent, 'bb10');
    } else if (agent.indexOf('iemobile') > -1) {
        systemOS = 'WinPhone ' + getVersion(useragent, 'iemobile');
    } else if (agent.indexOf('ubuntu') > -1) {
        systemOS = 'Ubuntu ' + getVersion(useragent, 'ubuntu');
    } else if (agent.indexOf('debian') > -1) {
        systemOS = 'Debian ' + getVersion(useragent, 'debian');
    } else if (agent.indexOf('linux') > -1) {
        systemOS = 'Linux ' + getVersion(useragent, 'linux');
    } else if (agent.indexOf('windows nt 5.0') > -1) {
        systemOS = 'Windows 2000'
    } else if (agent.indexOf('windows nt 5.1') > -1 || agent.indexOf('windows nt 5.2') > -1) {
        systemOS = 'Windows XP'
    } else if (agent.indexOf('windows nt 6.0') > -1) {
        systemOS = 'Windows Vista'
    } else if (agent.indexOf('windows nt 6.1') > -1 || agent.indexOf('windows 7') > -1) {
        systemOS = 'Windows 7'
    } else if (agent.indexOf('windows nt 6.2') > -1 || agent.indexOf('windows 8') > -1) {
        systemOS = 'Windows 8'
    } else if (agent.indexOf('windows nt 6.3') > -1) {
        systemOS = 'Windows 8.1'
    } else if (agent.indexOf('windows nt 6.2') > -1 || agent.indexOf('windows nt 10.0') > -1) {
        systemOS = 'Windows 10'
    }

    return { "System OS Name": systemOS };
}


function getVersion(useragent, type) {
    let subNum = {
        "linux": 8,
        "android": 8,
        "bb10": 5,
        "iemobile": 9,
        "cros": 5,
        "ubuntu": 7,
        "windows phone": 14,
        "mac os x": 9,
    }[type];
    let agent = useragent.toString().toLowerCase();

    if (type === "cros" || type === "mac os x") {
        return agent.substr(agent.indexOf(type) + subNum, agent.indexOf(')', agent.indexOf(type)) - agent
            .indexOf(type) - subNum).replace(REGSTR_UNDERLINR, '.');
    }
    if (type === "ubuntu") {
        return agent.substr(agent.indexOf(type) + subNum, agent.indexOf(' ', agent.indexOf(type)) - agent
            .indexOf(type) - subNum);
    }
    if (type === "iphone") {
        return agent.match(REGSTR_APPLE_SYSTEM_VERSION).toString().replace(REGSTR_NUM, '').replace(
            REGSTR_UNDERLINR, '.');
    }

    return agent.substr(agent.indexOf(type) + subNum, agent.indexOf(';', agent.indexOf(type)) - agent
        .indexOf(type) - subNum);
}

/**
 * @description 检查是不是爬虫
 * @param {*String} useragent
 * @returns {*Json} { "isSpider": false }
 */
function checkSpider(useragent) {
    let agent = useragent.toString().toLowerCase();
    let isSpider = spider_sign_arr.some(function (item) {
        if (agent.indexOf(item) > 0) {
            return true;
        }
    }) || false;

    return { "isSpider": isSpider };
}

/**
 * @description 检查客户端类型
 * @param {*String} useragent
 * @param {*Boolean} [upperCase=true]
 * @returns {*Json} { "machineType": "Unknown" }
 */
function getMachineType(useragent, upperCase = true) {
    let agent = useragent.toString().toLowerCase();
    let machineType = upperCase ? "Unknown" : "unknown";
    if (!REGSTR_ISMOBILE.test(agent)) {
        machineType = upperCase ? "PC" : "pc";
    } else {
        machineType = upperCase ? "Mobile" : "mobile";
    }
    return { "machineType": machineType };
}

function getAllInfo(useragent) {
    let systemOS = getSystemOS(useragent);
    let browserInfo = getBrowserInfo(useragent);
    let isSpider = checkSpider(useragent);
    let machineType = getMachineType(useragent);
    return Object.assign(systemOS, browserInfo, isSpider, machineType);
}



module.exports = {
    getSystemOS: getSystemOS,
    getBrowserInfo: getBrowserInfo,
    checkSpider: checkSpider,
    getMachineType: getMachineType,
    getAllInfo: getAllInfo,
}