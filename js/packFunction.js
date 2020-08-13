/* 兼容浏览器获得下一个元素兄弟节点 */
function getNextNode(dom){
    if(dom.nextElementSibling){
        return dom.nextElementSibling;
    }else{
        return dom.nextSibling;
    }
}

/* 兼容浏览器获得上一个兄弟元素节点 */
function getBeforNode(dom){
    if(dom.previousElementSibling){
        return dom.previousElementSibling;
    }else{
        return dom.previousSibling;
    }
}

/* 兼容浏览器获得第一个元素子节点 */
function getFirstChild(dom){
    if(dom.firstElementChild){
        return dom.firstElementChild;
    }else{
        return dom.firstChild;
    }
}

/* 兼容浏览器获得最后一个元素子节点 */
function getLastChild(dom){
    if(dom.lasttElementChild){
        return dom.lastElementChild;
    }else{
        return dom.lastChild;
    }
}

/* 兼容浏览器通过类名获取节点 */
function byClass(classN){
    var n = document.all;
    if(n[0].currentStyle){
        var arr = [];
        for(i = 0; i < n.length; i++){
            if(n[i].className === classN){
                arr.push(n[i]);
            }
        }
        return arr;
    }else{
        return document.getElementsByClassName(classN);
    }
}

/* 兼容浏览器获取元素样式 */
function getStyle(dom,sty){
    if(dom.currentStyle){
        return dom.currentStyle[sty]; // --> 因为sty是变量所以不能用.sty  (对象通过变量访问)
    }else{
        return getComputedStyle(dom,null)[sty];
    }
}

/* 兼容浏览器创建事件监听器 */
function addEvent(dom,type,fn){
    if(dom.attachEvent){
        dom.attachEvent('on' + type, fn);  //IE6,7,8
    }else{
        dom.addEventListener(type, fn);
    }
}

/* 兼容进行事件委托，parent为父元素，type为事件类型，selector为选择器（可为id，class，tagname），callback为执行函数 */
function on(parent,type,selector,callback){
    addEvent(parent,type,function (ev){
        var e = ev || event;
        var target = e.target || e.srcElement;
        var sel_first = selector.substr(0,1);
        var sel_last = null;
        var sel_type = null;
        switch(sel_first){
            case '.': 
                sel_last = selector.slice(1);
                sel_type = 'className';
                break;
            case '#': 
                sel_last = selector.slice(1);
                sel_type = 'id';
                break;
            default:
                sel_last = selector.toUpperCase();
                sel_type = 'tagName';
        }
        while(target !== parent){
            if (target[sel_type] === sel_last) {
                callback.call(target,e);
                break;
            }
            target = target.parentNode;
        }
    });
}

/* 匀速运动，dom改变对象，attr为需改变的属性，target为运动目标，speed为运动速度 */
function animate(dom,attr,target,speed){
    if (attr === 'opacity') {
        // 如果属性是透明度，乘以100，目的方便计算，兼容IE设置
        var current = parseInt( getComputedStyle(dom,null)[attr]*100 );
        target *= 100;
    } else {
        var current = parseInt( getComputedStyle(dom,null)[attr] );
    }
    clearInterval(dom.timer);
    dom.timer = setInterval(function (){
        // 获取速度的值
        speed = speed || 5;
        // 判断运动方向
        if (target > current){
            speed = Math.abs(speed);
        } else {
            speed = -Math.abs(speed);
        }
        // 判断到达目的地：剩余运动量 <= 每次的运动量
        if (Math.abs(target-current) <= Math.abs(speed)) {
            clearInterval(dom.timer);
            if (attr === 'opacity'){
                dom.style[attr] = target / 100;// 立即到达终点
            } else {
                dom.style[attr] = target + 'px';// 立即到达终点
            }
        } else {
            current += speed;
            if (attr === 'opacity') {
                dom.style[attr] = current / 100;
            } else {
                dom.style[attr] = current + 'px';
            }
        }
    },20);
}

/* 缓冲运动  dom为对象，attr为属性，target为目标 */
function animateCS(dom,attr,target){
    if (attr === 'opacity') {
        var current = parseInt( getComputedStyle(dom,null)[attr]*100 );
        target *= 100;
    } else {
        var current = parseInt( getComputedStyle(dom,null)[attr] );
    }
    clearInterval(dom.timer);
    dom.timer = setInterval(function (){
        // 不断变化的速度
        var speed = (target - current) / 10;
        // 小数计算有误差，容易造成数据丢失 => 取整
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        // 判断到达目的地：剩余运动量 <= 每次的运动量
        if (Math.abs(target - current) <= Math.abs(speed)) {
            clearInterval(dom.timer);
            if (attr === 'opacity') {
                dom.style[attr] = target / 100;
            } else {
                dom.style[attr] = target + 'px';
            }
        } else {
            current += speed;
            if (attr === 'opacity') {
                dom.style[attr] = current / 100;
            } else {
                dom.style[attr] = current + 'px';
            }
        }
    },20);
}

// 缓冲运动，支持多属性同时运动，dom为元素，attr_obj为运动属性与目标值组成的对象，callback为回调函数 可不传
function animateCSM(dom,attr_obj,callback){
    for (var attr in attr_obj){
        // 获取当前值和目标值
        if (attr === 'opacity') {
            var current = parseInt( getComputedStyle(dom,null)[attr]*100 );
            var target = attr_obj[attr]*100;
        } else if ( attr.indexOf('scroll') !== -1 ) {
            var current = dom[attr];
            var target = attr_obj[attr];
        } else {
            var current = parseInt( getComputedStyle(dom,null)[attr] );
            var target = attr_obj[attr];
        }
        attr_obj[attr] = {
            'current': current,
            'target': target
        }
    }
    clearInterval(dom.timer);
    dom.timer = setInterval(function (){
        for (var attr in attr_obj){
            var current = attr_obj[attr].current;
            var target = attr_obj[attr].target;
            var speed = (target - current) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (Math.abs(target - current) <= Math.abs(speed)) {
                if (attr === 'opacity') {
                    dom.style[attr] = target / 100;
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = target;
                } else {
                    dom.style[attr] = target + 'px';
                }
                // 从attr_obj对象中删除已完成运动的属性
                delete attr_obj[attr];
                // 如果对象中还有其他属性，此时不应该终止计时器
                for (var key in attr_obj){
                    // 有其他属性未完成动画
                    return;
                }
                clearInterval(dom.timer);
                typeof callback === 'function' ? callback() : '';
            } else {
                // 此时不能直接使用current，因为它是一个临时变量
                attr_obj[attr].current += speed;
                if (attr === 'opacity') {
                    dom.style[attr] = attr_obj[attr].current / 100;
                } else if (attr.indexOf('scroll') !== -1) {
                    dom[attr] = attr_obj[attr].current;
                } else {
                    dom.style[attr] = attr_obj[attr].current + 'px';
                }
            }
        }
    },20);
}

// 获取元素到body的距离，布尔值为true则返回不包括自身边框
function offset(dom,bool){
    var l = 0, t = 0;
    var bdleft = dom.clientLeft;
    var bdtop = dom.clientTop;
    while(dom){
        l = l + dom.offsetLeft + dom.clientLeft;
        t = t + dom.offsetTop + dom.clientTop;
        dom = dom.offsetParent;
    }
    if (bool) {
        return {left: l-bdleft, top: t-bdtop};
    } else {
        return {left: l, top: t};
    }
}

/* 随机生成[min,max]区间的整数 */
function randomInt(min,max){
    var ran = Math.round(Math.random() * (max - min)) + min;
    return ran;
}

/* 根据参数生成n位验证码(数字，英文大小写)  需配合随机生成整数使用 */
function randomCode(n){
    var str = '';
    for(var i = 0; i < n; i++){
        do{
            var x = randomInt(48,122);
        }while((x > 57 && x < 65)||(x > 90 && x< 97))
        var y = String.fromCharCode(x);
        str += y;
    }
    console.log(str);
}

/* 随机生成颜色  需配合随机生成整数使用 */
function randomColor(){
    var color = '#';
    for(i = 0; i < 6; i++){
        var x = randomInt(0,15);
        var y = x.toString(16);
        color += y;
    }
    return color;
} 

/* 选择排序-降序 */
function selectSort(arr){
    for(var i = 0, n = arr.length; i < n - 1; i++ ){
        for(var j = i + 1; j < n; j++){
            var s = 0;
            if(arr[i] < arr[j]){
                s = arr[i];
                arr[i] = arr[j];
                arr[j] = s;
            };
        };
    };
    return arr;
};

/* 冒泡排序-降序 */
function bubbleSort(arr){
    for(var i = 0, n = arr.length; i < n-1; i++){
        for(var j = 0; j < n-i-1; j++){
            if(arr[j] < arr[j + 1]){
                var s = 0;
                s = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = s;
            };
        };
    };
    return arr;
};

/* 桶排序升序 */
function bucketSort(arr){
    var bucket = [];
    for(i = 0; i < arr.length; i++){
        var s = arr[i];
        bucket[s] = s;
    }
    arr.length = 0;
    for(var n in bucket){
        arr.push(Number(n));
    };
    return arr;
}

/* 快速排序升序 */
function quickSort(arr){
    if(arr.length <= 1){
        return arr;
    }else{
        var n = parseInt(arr.length/2);
        var left = [];
        var right = [];
        for(var i = 0, len = arr.length; i < len; i++){
            if(i == n){
                continue;
            }else if(arr[i] < arr[n]){
                left.push(arr[i]);
            }else{
                right.push(arr[i]);
            };
        };
        return quickSort(left).concat([arr[n]],quickSort(right)) ;
    };
}; 


/* ajax封装
ajax({
    url: './data/user.php',         //连接地址
    type: 'post',                   //连接方式
    data: {                         //传入数据
        type: 'login',
        user: user.value,
        pass: pass.value
    },
    dataType: 'json',               //接受文档格式json/xml
    success: function (data){       //连接成功回调函数
        var json = JSON.parse(data);
        alert(json.msg);
    },
    error: function (status){       //连接失败回调函数
        alert('提交失败');
    }
}) */
function ajax(options){
    var xhr = new XMLHttpRequest();// 除了IE56其他都支持
    var data = '';
    if (typeof options.data === 'string') {
        data = options.data;
    }
    if ( isObject(options.data) ){
        for (var key in options.data){
            data += key+'='+options.data[key]+'&';
        }
        data = data.substring(0,data.length-1);
    }
    if (options.type.toLowerCase() === 'get') {
        xhr.open(options.type,options.url+'?'+data+'&_='+Date.now());
        xhr.send(null);
    }else if (options.type.toLowerCase() === 'post'){
        xhr.open(options.type,options.url);
        // POST请求需要在send之前设置请求头，模拟表单的post提交
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(data);//post请求要发送的数据放参数里面
    } else {
        alert('目前只支持get和post请求方式');
        return false;
    }
    xhr.onreadystatechange = function (){
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (options.dataType === 'xml') {
                    options.success(xhr.responseXML);
                } else {
                    options.success(xhr.responseText);
                }
            } else {
                options.error(xhr.status);
            }
        }
    }
}

// 基于promise封装ajax
function promiseAjax(options){
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest();
        var data = '';
        if (typeof options.data === 'string') {
            data = options.data;
        }
        if ( isObject(options.data) ){
            for (var key in options.data){
                data += key+'='+options.data[key]+'&';
            }
            data = data.substring(0,data.length-1);
        }

        if (options.type.toLowerCase() === 'get') {
            xhr.open(options.type,options.url+'?'+data+'&_='+Date.now());
            xhr.send(null);
        }else if (options.type.toLowerCase() === 'post'){
            xhr.open(options.type,options.url);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(data);
        } else {
            alert('目前只支持get和post请求方式');
            return false;
        }

        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (options.dataType === 'xml') {
                        resolve(xhr.responseXML);
                    } else {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(xhr.status);
                }
            }
        }
    })
}


/* jsonp封装
jsonp({
    url: 'http://suggestion.baidu.com/su',          //跨域地址
    data: 'wd='+search.value,                       //传输数据，因只能用get所以拼接字符串
    jsonp: 'cb',// 根据接口来输入
    jsonpCallback: 'mycb',// 可以自定义             //回调函数
    success: function (json){
        list.innerHTML = '';
        json.s.forEach(function (item){
            list.innerHTML += '<li>'+item+'</li>';
        });
    }
}) */
function jsonp(options){
    // 把options.success变成全局函数
    window[options.jsonpCallback] = options.success;

    var data = '';
    if (typeof options.data === 'string') {
        data = options.data;
    }
    if (isObject(options.data)) {
        for (var key in options.data){
            data += key+'='+options.data[key]+'&';
        }
        data = data.substring(0,data.length-1);
    }
    var oScript = document.createElement('script');
    // 把数据地址、参数、回调函数拼接赋值给src
    oScript.src = options.url+'?'+data+'&'+options.jsonp+'='+options.jsonpCallback;
    // 添加到body中
    document.body.appendChild(oScript);
    // 数据加载完成后删除script标签
    oScript.onload = function (){
        document.body.removeChild(oScript);
    }
}

// 判断是否为对象
function isObject(obj){
    if (Object.prototype.toString.call(obj) === '[object Object]'){
        return true;
    }
    return false;
}


// 倒计时函数，传结束时间,返回结束到现在的时分秒组成的对象
function lastTime(date){
    var date1 = new Date(date);
    var s = date1.getTime() - Date.now();
    var date2 = new Date(s);
    var day = parseInt(s / 86400000);
    var hou = date2.getUTCHours();
    var min = date2.getMinutes();
    var sec = date2.getSeconds();
    var mil = date2.getMilliseconds();
    if(hou<10){
        hou = '0' + hou;
    }
    if(min<10){
        min = '0' + min;
    }
    if(sec<10){
        sec = '0' + sec;
    }

    return {
        'day':day,
        'hou':hou,
        'min':min,
        'sec':sec,
        'mil':mil
    }
}

// 设置cookie
function setCookie(options){
    if (!options.key || !options.val) {
        throw new Error('设置失败，缺少必要参数！');
    }
    options.days = options.days || 0;
    options.domain = options.domain || '';
    options.path = options.path || '';
    if (options.days === 0) {
        document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path;
    } else {
        var d = new Date();
        d.setDate(d.getDate()+options.days);
        document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path + '; expires=' + d;
    }
}

// 获取cookie
function getCookie(key){
    var arr1 = document.cookie.split('; ');
    for (var i = 0, len = arr1.length; i < len; i++){
        var arr2 = arr1[i].split('=');
        if (arr2[0] === key) {
            return unescape(arr2[1]);
        }
    }
    return null;
}

// 删除cookie
function removeCookie(key){
    setCookie({
        key: key,
        val: '1234',
        days: -5
    });
}