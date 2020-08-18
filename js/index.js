/* 加载公共部分 */
$('.header').load('./header.html');
$('.footer').load('./footer.html');

/* banner */
$('.banner-con-list .list').hover(
    function(){
        $(this).css('border-radius','10px 0 0 10px');
    },
    function(){
        $(this).css('border-radius','10px');
    }
);
/* 设置顶部banner图 */
var tmd1 = tmdBanner({
    imgs:'.banner-img li',
    left:'.banner-img-btnL',
    right:'.banner-img-btnR',
    lis:'.banner-img-page li',
    time:3000
});
var $recommendList = $('.recommend-list');
var $recommendListBtnL = $('.recommend-list-btnL');
var $recommendListBtnR = $('.recommend-list-btnR');
var recommendListIndex = 0;
var fixedLsit2Index = -1;
/* 推荐列表事件 */
var maxIndex = Math.ceil($recommendList.find('li').length/5)-1;
$recommendListBtnL.click(function(){
    if(recommendListIndex === maxIndex){
        $recommendListBtnR.css('display','block');
    };
    recommendListIndex --;
    $recommendList.animate({'scrollLeft':recommendListIndex*1200});
    if(recommendListIndex === 0){
        $recommendListBtnL.css('display','none');
    };
});
$recommendListBtnR.click(function(){
    if(recommendListIndex === 0){
        $recommendListBtnL.css('display','block');
    };
    recommendListIndex ++;
    $recommendList.animate({'scrollLeft':recommendListIndex*1200});
    if(recommendListIndex === maxIndex){
        $recommendListBtnR.css('display','none');
    };
});
/* 设置中部banner图 */
var tmd2 = tmdBanner({
    imgs:'.newsbanner a',
    left:'.newsbanner span',
    right:'.newsbanner span',
    lis:'.newsbanner li',
    time:3000
});

var $mobilephoneList = $('.mobilephone .goodsList-list');
var $laptopList = $('.laptop .goodsList-list');
var $hotCellList = $('.hotCell ul');
/* 请求手机的数据并显示 */
$.ajax({
    url:'../data/mobilephone.json',
    type:'get',
    dataType:'json',
    success:function (json){
        var arr = Object.values(json);
        for(let i = 0; i < 9; i++){
            var pstr = '';
            if(arr[i].promotion){
                if(arr[i].promotion.type === 0){
                    pstr = `<p><i class="redicon">${arr[i].promotion.msg}</i></p>`;
                }else{
                    pstr = `<p><i class="blueicon">${arr[i].promotion.msg}</i></p>`;
                }
            }
            var domStr = `
                <li><a href="./goodsDetail.html?type=mobilephone&code=${arr[i].code}" target='_blank'>
                    <img src="${arr[i].imgsrc}" alt="">
                    <h4>${arr[i].name}</h4>
                    <h5>${arr[i].intro}</h5>
                    <h6>￥ <span>${arr[i].price}</span></h6>
                    ${pstr}
                </a></li>`;
            $mobilephoneList.append(domStr);
            if(i < 4){
                $hotCellList.append(domStr);
            }
        }
    },
    error:function (){
        alert('请求失败');
    }
});
/* 请求笔记本电脑的数据并显示 */
$.ajax({
    url:'../data/laptop.json',
    type:'get',
    dataType:'json',
    success:function (json){
        var arr = Object.values(json);
        for(let i = 0; i < 9; i++){
            var pstr = '';
            if(arr[i].promotion){
                if(arr[i].promotion.type === 0){
                    pstr = `<p><i class="redicon">${arr[i].promotion.msg}</i></p>`;
                }else{
                    pstr = `<p><i class="blueicon">${arr[i].promotion.msg}</i></p>`;
                }
            }
            var domStr = `
                <li><a href="./goodsDetail.html?type=laptop&code=${arr[i].code}" target='_blank'>
                    <img src="${arr[i].imgsrc}" alt="">
                    <h4>${arr[i].name}</h4>
                    <h5>${arr[i].intro}</h5>
                    <h6>￥ <span>${arr[i].price}</span></h6>
                    ${pstr}
                </a></li>`;
            $laptopList.append(domStr);
            if(i < 4){
                $hotCellList.append(domStr);
            }
        }
        
    },
    error:function (){
        alert('请求失败');
    }
});
/* 右下固定定位列表 */
$('.fixedList i').hover(function(){
    $(this).siblings('p').css('display','block');
},function(){
    $(this).siblings('p').css('display','none');
});
$('.fixedList i').eq(3).click(function(){
    $('html').animate({
        'scrollTop':0
    })
});
var throttleChange= throttle(300,scrollChange);
window.onscroll = function(){
    throttleChange();
};
function scrollChange(){
    if(document.documentElement.scrollTop >= document.documentElement.clientHeight){
        $('.fixedList .last').css('display','block');
    }
    if(document.documentElement.scrollTop < document.documentElement.clientHeight){
        $('.fixedList .last').css('display','none');
    }
    if(document.documentElement.scrollTop >= $('.mobilephone').offset().top){
        $('.fixedLsit2').stop(true);
        $('.fixedLsit2').animate({'right':'5'});
    }
    if(document.documentElement.scrollTop < $('.mobilephone').offset().top){
        $('.fixedLsit2').stop(true);
        $('.fixedLsit2').animate({'right':'-100'});
        $('.fixedLsit2 li').find('p').removeClass('on');
        $('.fixedLsit2 li').find('span').slideUp();
        fixedLsit2Index = -1;
    }
    if(document.documentElement.scrollTop >= $('.mobilephone').offset().top && document.documentElement.scrollTop < ($('.mobilephone').offset().top + $('.mobilephone').height())){ 
        if(fixedLsit2Index !== 0){
            $('.fixedLsit2 li').eq(fixedLsit2Index).find('p').removeClass('on');
            $('.fixedLsit2 li').eq(fixedLsit2Index).find('p').css('color','#999');
            $('.fixedLsit2 li').eq(fixedLsit2Index).find('span').slideUp(function(){
                $('.fixedLsit2 .phone').eq(0).find('span').slideDown();
                fixedLsit2Index = 0;
            });
            $('.fixedLsit2 .phone').eq(0).find('p').addClass('on');
        }
    }
    if(document.documentElement.scrollTop >= $('.laptop').offset().top && document.documentElement.scrollTop < ($('.laptop').offset().top + $('.laptop').height())){
        if(fixedLsit2Index !== 1){
            $('.fixedLsit2 li').eq(fixedLsit2Index).find('p').removeClass('on');
            $('.fixedLsit2 li').eq(fixedLsit2Index).find('p').css('color','#999');
            $('.fixedLsit2 li').eq(fixedLsit2Index).find('span').slideUp(function(){
                $('.fixedLsit2 .laptop').eq(0).find('span').slideDown();
                fixedLsit2Index = 1;
            });
            $('.fixedLsit2 .laptop').eq(0).find('p').addClass('on');
        };
        
    };
};
/* 右侧中部固定列表 */
$('.fixedLsit2 li').hover(function(){
    $(this).find('p').css('color','#333');
},function(){
    if(!$(this).find('p').hasClass('on')){
        $(this).find('p').css('color','#999');
    } 
});
$('.fixedLsit2 li').click(function(){
    var $this = $(this);
    $('.fixedLsit2 li').eq(fixedLsit2Index).find('p').removeClass('on');
    $('.fixedLsit2 li').eq(fixedLsit2Index).find('p').css('color','#999');
    $('.fixedLsit2 li').eq(fixedLsit2Index).find('span').slideUp(function(){
        $this.find('span').slideDown();
        fixedLsit2Index = $this.index();
    });
    $(this).find('p').addClass('on');
});
$('.fixedLsit2 .phone').click(function(){
    $('html').animate({'scrollTop':$('.mobilephone').offset().top});
});
$('.fixedLsit2 .laptop').click(function(){
    $('html').animate({'scrollTop':$('.laptop').offset().top});
});

/* 同步用户数据 */
(function(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(getCookie('username')){
        var name = getCookie('username');
        $('.usermsg .usermsg-left-login').text('欢迎您'+ user[name].nickname);
    };
})();