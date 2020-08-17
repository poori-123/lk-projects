/* 密码显示隐藏 */
$('.content-bot-right .psd i').click(function(){
    showH.call(this);
});

/* 加载默认用户数据 */
if(!localStorage.getItem('user')){
    var userObj = {
        "admin":{
            "psd":"123456",
            "nickname":"管理员",
            "phone":"17835699999"
        },
        "xiaoming":{
            "psd":"123456",
            "nickname":"小明",
            "phone":"17835698888"
        },
        "xiaohong":{
            "psd":"123456",
            "nickname":"小红",
            "phone":"17835697777"
        }
    };
    var userStr = JSON.stringify(userObj);
    localStorage.setItem('user', userStr);
};

/* 账号密码输入初步 */
var $username = $('.content-bot-right .username');
var $userpsd = $('.content-bot-right .userpsd');
var $notice = $('.content-bot-right .notice');
var $change = $('.content-bot-right .change span');
var $loginBtn = $('.content-bot-right .loginBtn');
var $loginMask = $('.content-bot-right .mask');
$username.focus(function(){
    if($(this).attr('state')){
        $(this).css('border-color','#007DFF');
    }
});
$username.blur(function(){
    if($username.val().length < 4 || $username.val().length > 80){
        $notice.text('华为账号限制在4~80个字符');
        $notice.css('display','block');
        $userpsd.css('border-color','#fff');
        $(this).css('border-color','#FA2A2D');
        $(this).attr('state','false');
    }else{
        $notice.css('display','none');
        $(this).css('border-color','#fff');
        $(this).attr('state','true');
    };
});
$userpsd.focus(function(){
    if($(this).attr('state')){
        $(this).css('border-color','#007DFF');
    }
});
$userpsd.blur(function(){
    if($username.attr('state') === 'true'){
        if($userpsd.val() == ''){
            $notice.text('请输入您的密码');
            $notice.css('display','block');
            $(this).css('border-color','#FA2A2D');
            $(this).attr('state','false');
        }else{
            $notice.css('display','none');
            $(this).css('border-color','#fff');
            $(this).attr('state','true');
        };
    }else{
        $(this).css('border-color','#fff'); 
    };
});
$username[0].oninput = function(){
    if($username.val() != '' && $userpsd.val() != ''){
        $loginMask.css('display','none');
    };
};
$userpsd[0].oninput = function(){
    if($username.val() != '' && $userpsd.val() != ''){
        $loginMask.css('display','none');
    };
};
$change.click(function(){
    if($(this).attr('code') == 0){
        $(this).text('切换本地登录');
        $(this).attr('code',1);
        $loginBtn.attr('code',1);
    }else{
        $(this).text('切换在线登录');
        $(this).attr('code',0);
        $loginBtn.attr('code',0);
    }
});

/* 本地登录验证 */
var userTable = JSON.parse(localStorage.getItem('user'));
$loginBtn.click(function(){
    if($(this).attr('code') === '0'){
        var username = $username.val();
        var userpsd = $userpsd.val();
        if(userTable[username]){
            var psd =  userTable[username].psd;
            if(userpsd == psd){
                setCookie({
                    key:'username',
                    val:username,
                    days:7
                });
                setCookie({
                    key:'userpsd',
                    val:userpsd,
                    days:7
                });
                $('.loginTrue').css('display','block');
                $('.loginTrue').find('h3').text('登录成功');
                $('.loginTrue').find('h4').html('<span>5</span>秒后自动跳转至主页!');
                $('.loginTrue').find('a').attr('href','./index.html');
                var timer = setInterval(() => {
                    var num = $('.loginTrue').find('span').text();
                    num--;
                    $('.loginTrue').find('span').text(num);
                    if(num == 0){
                        clearInterval(timer);
                        window.open('./index.html','_self');
                    }  
                }, 1000);
            }else{
                $notice.text('密码输入错误');
                $notice.css('display','block');
                $userpsd.attr('state','false');
                $userpsd.focus();
                $userpsd.css('border-color','#FA2A2D');
            }
        }else{
            $notice.text('账号不存在');
            $notice.css('display','block');
            $username.attr('state','false');
            $username.focus();
            $username.css('border-color','#FA2A2D');
        };
    };
});

window.onload = function(){
    if(getCookie('username')){
        $username.val(getCookie('username'));
        $userpsd.val(getCookie('userpsd'));
        $loginMask.css('display','none');
    };
};

$('.content-bot-right .add').click(function(){
    $('title').text('华为账号-注册');
    $('.login').css('display','none');
    $('.registerWrap').css('display','block');
});

/* 注册判断 */
var key = getQueryString('register');
if(key == 'register'){
    $('title').text('华为账号-注册');
    $('.login').css('display','none');
    $('.registerWrap').css('display','block');
}else{
    $('title').text('华为账号-登录');
}
$('.content-bot-right .add').click(function(){
    $('.login').css('display','none');
    $('.registerWrap').css('display','block');
});

var $regNickname = $('.register .regNickname');
var $regUsername = $('.register .regUsername');
var $regUserpsd1 = $('.register .regUserpsd1');
var $regUserpsd2 = $('.register .regUserpsd2');
var $regPhone = $('.register .regPhone');
var $regBtn = $('.register .regBtn');
var $regInput = $('.register input');

$regUserpsd1.siblings('b').click(function(){
    showH.call(this);
});
$regUserpsd2.siblings('b').click(function(){
    showH.call(this);
});
$regNickname.focus(function(){
    if($(this).attr('state') == 'true'){
        $(this).css('border-color','#007DFF');
    }
});
$regNickname.blur(function(){
    if($(this).val() == ''){
        $(this).siblings('i').css('display','block');
        $(this).css('border-color','#FA2A2D');
        $(this).attr('state','false');
    }else{
        $(this).siblings('i').css('display','none');
        $(this).css('border-color','#007DFF');
        $(this).attr('state','true');
    }
});

$regUsername.focus(function(){
    if($(this).attr('state') == 'true'){
        $(this).css('border-color','#007DFF');
    }
});
$regUsername.blur(function(){
    if($(this).val().length < 4 || $(this).val().length > 80){
        $(this).siblings('i').css('display','block');
        $(this).css('border-color','#FA2A2D');
        $(this).attr('state','false');
    }else{
        $(this).siblings('i').css('display','none');
        $(this).css('border-color','#007DFF');
        $(this).attr('state','true');
    }
});

$regUserpsd1.focus(function(){
    if($(this).attr('state') == 'true'){
        $(this).css('border-color','#007DFF');
    }
});
$regUserpsd1.blur(function(){
    if($(this).val() == ''){
        $(this).siblings('i').css('display','block');
        $(this).css('border-color','#FA2A2D');
        $(this).attr('state','false');
    }else{
        $(this).siblings('i').css('display','none');
        $(this).css('border-color','#007DFF');
        $(this).attr('state','true');
    }
});

$regUserpsd2.focus(function(){
    if($(this).attr('state') == 'true'){
        $(this).css('border-color','#007DFF');
    }
});
$regUserpsd2.blur(function(){
    if($(this).val() != $regUserpsd1.val() || $(this).val() == ''){
        $(this).siblings('i').css('display','block');
        $(this).css('border-color','#FA2A2D');
        $(this).attr('state','false');
    }else{
        $(this).siblings('i').css('display','none');
        $(this).css('border-color','#007DFF');
        $(this).attr('state','true');
    }
});

$regPhone.focus(function(){
    if($(this).attr('state') == 'true'){
        $(this).css('border-color','#007DFF');
    }
});
$regPhone.blur(function(){
    $this = $(this);
    var reg = /^(1|\+861)[3-8]{1}\d{9}$/;
    if(!reg.test($this.val())){
        $(this).siblings('i').css('display','block');
        $(this).css('border-color','#FA2A2D');
        $(this).attr('state','false');
    }else{
        $(this).siblings('i').css('display','none');
        $(this).css('border-color','#007DFF');
        $(this).attr('state','true');
    }
});

$regInput.keyup(function(){
    if($regNickname.val() != '' && $regUsername.val() != '' && $regUserpsd1.val() != '' && $regUserpsd2.val() != '' && $regPhone.val() != ''){
        $regBtn.siblings('span').css('display','none');
    };
});

$regBtn.click(function(){
    if(userTable[$regUsername.val()]){
        $regUsername.siblings('i').text('用户名已被占用');
        $regUsername.siblings('i').css('display','block');
        $regUsername.css('border-color','#FA2A2D');
        $regUsername.attr('state','false');
        return;
    } ;
    var regnum = 0;
    $regInput.each(function(index,item){
        if($(item).attr('state') == 'true'){
            regnum ++;
        }
    });
    if(regnum == 5){
        userTable[$regUsername.val()] = {
            "psd": $regUserpsd1.val(),
            "nickname":$regNickname.val(),
            "phone":$regPhone.val()
        };
        var newStr = JSON.stringify(userTable);
        localStorage.setItem('user' , newStr);

        $('.loginTrue').css('display','block');
        $('.loginTrue').find('h3').text('注册成功');
        $('.loginTrue').find('h4').html('<span>5</span>秒后自动跳转至登录页!');
        $('.loginTrue').find('a').attr('href','./login.html');
        var timer = setInterval(() => {
            var num = $('.loginTrue').find('span').text();
            num--;
            $('.loginTrue').find('span').text(num);
            if(num == 0){
                clearInterval(timer);
                window.open('./login.html','_self');
            }  
        }, 1000);
    }
});
/* 密码显示隐藏 */
function showH(){
    if($(this).attr('state') == 0){
        $(this).css('background','url(../img/loginpsd2.png) no-repeat center');
        $(this).siblings('input').attr('type','text');
        $(this).attr('state',1);
    }else{
        $(this).css('background','url(../img/loginpsd1.png) no-repeat center');
        $(this).siblings('input').attr('type','password');
        $(this).attr('state',0);
    };
}