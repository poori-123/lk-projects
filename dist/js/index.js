/* 加载公共部分 */
$('.header').load('./header.html');
$('.footer').load('./footer.html');
window.onload = function(){
    $('.searchWrap .all').css('display','none');
};
// (async function(){
//     await $('.header').load('./header.html');
//     console.log($('.searchWrap .all'));
//     $('.searchWrap .all').css('display','none');
// })();
/* banner */
$('.banner-con-list .list').hover(
    function(){
        $(this).css('border-radius','10px 0 0 10px');
    },
    function(){
        $(this).css('border-radius','10px');
    }
);
var tmd1 = tmdBanner({
    imgs:'.banner-img li',
    left:'.banner-img-btnL',
    right:'.banner-img-btnR',
    lis:'.banner-img-page li',
    time:3000
});
$recommendList = $('.recommend-list');
$recommendListBtnL = $('.recommend-list-btnL');
$recommendListBtnR = $('.recommend-list-btnR');
var recommendListIndex = 0;
$recommendListBtnL.click(function(){
    if(recommendListIndex === 2){
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
    if(recommendListIndex === 2){
        $recommendListBtnR.css('display','none');
    };
});
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
                <li><a href="./goodsList.html?type=mobilephone&code=${arr[i].code}">
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
                <li><a href="./goodsList.html?type=mobilephone&code=${arr[i].code}">
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
window.onscroll = function(){
    if(document.documentElement.scrollTop >= document.documentElement.clientHeight){
        $('.fixedList .last').css('display','block');
    }
    if(document.documentElement.scrollTop < document.documentElement.clientHeight){
        $('.fixedList .last').css('display','none');
    }
};
