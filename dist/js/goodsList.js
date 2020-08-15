/* 加载公共部分 */
$('.header').load('./header.html');
$('.footer').load('./footer.html');

var key = getQueryString('type');
var $contentGoodsList = $('.content-goodsList ul');
var $filterPrice = $('.content-nav-list .price p');
var $sort = $('.content-nav-list .rank p');
var $sortPrice = $('.content-nav-list .sortPrice');
var dataArr = null;
if(key === 'mobilephone'){
    $('.content-nav-tit i').text('手机');
    $('.content-nav-list ul').find('.classify').text('手机');
    $('title').text('华为手机大全_华为智能手机');
};
if(key === 'laptop'){
    $('.content-nav-tit i').text('笔记本');
    $('.content-nav-list ul').find('.classify').text('笔记本');
    $('.content-nav-list .screenSize').remove();
    $('.content-nav-list .more').remove();
    $('title').text('笔记本_华为商城');
};
/* 数据渲染 */
$.ajax({
    url:'../data/' + key + '.json',
    type:'get',
    gataType:'json',
    success:function(data){
        dataArr = Object.values(data);
        appendData();
    }
});
/* 按价格筛选 */
$filterPrice.click(function(){
    var $lis = $contentGoodsList.find('li');
    if($(this).hasClass('on')){
        $(this).removeClass('on');
        $lis.css('display','block');
    }else{
        var min = parseInt($(this).find('.min').text());
        var max = parseInt($(this).find('.max').text()) ;
        $filterPrice.removeClass('on');
        $(this).addClass('on');
        for(let i = 0; i < $lis.length; i++){
            var price = parseInt($lis.eq(i).find('h4').find('span').text()) ;
            if(price < min || price > max){
                $lis.eq(i).css('display','none');
            }else{
                $lis.eq(i).css('display','block');
            }
        } 
    }
});
/* 按价格排序 state为0为升序 */
$sortPrice.click(function(){
    if($(this).hasClass('on')){
        if($(this).attr('state') == 0){
            $(this).css('background','url(../img/sortPicon2.png) no-repeat right 0 center');
            $(this).attr('state',1);
        }else{
            $(this).css('background','url(../img/sortPicon3.png) no-repeat right 0 center');
            $(this).attr('state',0);
        }
    }else{
        $sort.removeClass('on');
        $(this).addClass('on');
        $(this).css('background','url(../img/sortPicon2.png) no-repeat right 0 center');
        $(this).attr('state',1);
    };
    var arrList = Array.from($contentGoodsList.children())
    dataSort(arrList,$(this).attr('state'));
    $contentGoodsList.html('');
    $(arrList).each(function(index,item){
        $contentGoodsList.append(item);
    })
});
$sort.click(function(){
    if(!$(this).hasClass('sortPrice')){
        if($sortPrice.hasClass('on')){
            $sortPrice.css('background','url(../img/sortPicon1.png) no-repeat right 0 center');
            $sortPrice.attr('state',0);
            appendData();
        }
        $sort.removeClass('on');
        $(this).addClass('on');
    }
})

function dataSort(arr,val){
    for(var i = 0, n = arr.length; i < n-1; i++){
        for(var j = 0; j < n-i-1; j++){
            if(parseInt($(arr[j]).find('h4').find('span').text()) < parseInt($(arr[j+1]).find('h4').find('span').text())){
                var s = 0;
                s = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = s;
            };
        };
    };
    if(val == 1){
        return arr;
    }else{
        return arr.reverse();
    }
};

function appendData(){
    $contentGoodsList.html('');
    for(let n = 0; n < 20; n++){
        var i = n%dataArr.length;
        var domB = '';
        var domP = '';
        var domLi = '';
        dataArr[i].discounts.forEach(function(item){
            domB += `<b>${item}</b>`;
        });
        if(dataArr[i].promotion){
            if(dataArr[i].promotion.type === 0){
                domP = `<p><span class="redicon">${dataArr[i].promotion.msg}</span></p>`;
            }else{
                domP = `<p><span class="blueicon">${dataArr[i].promotion.msg}</span></p>`;
            };
        };
        domLi = `<li><a href="./goodsDetail.html?type=mobilephone&code=${dataArr[i].code}">
            <img src="${dataArr[i].imgsrc}" alt="">
            <h3>${dataArr[i].name}</h3>
            <h4>￥<span>${dataArr[i].price}</span>起<i>多款可选</i></h4>
            <h5>${domB}</h5>
            <h6><span>${dataArr[i].evaluate}</span>人评价 <i>${dataArr[i].goodReputation}</i>好评</h6>
            ${domP}
        </a></li>`;
        $contentGoodsList.append(domLi);
    };
};
