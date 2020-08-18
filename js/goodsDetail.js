/* 加载公共部分 */
$('.header').load('./header.html');
$('.footer').load('./footer.html');

/* 放大镜 */
(function(){
    var bigger1 = bigger({
        box:'.content-main-left-magnifying .xbox', 
        mask:'.content-main-left-magnifying .mask', 
        dbox:'.content-main-left-magnifying .dbox',  
        img:'.content-main-left-magnifying .dbox img' 
    })
    var $scroll = $('.content-main-left-magnifyingList .scroll');
    var $ul =$('.content-main-left-magnifyingList ul');
    var $btnL = $('.content-main-left-magnifyingList .btnL');
    var $btnR = $('.content-main-left-magnifyingList .btnR');
    var index = 0;
    $ul.on('mouseover','li',function(){
        $ul.find('li').eq(index).removeClass('on');
        $(this).addClass('on');
        index = $(this).index();
        changeimg();
    });
    $btnL.click(function(){
        if(index === 0){
            return false;
        };
        $ul.find('li').eq(index).removeClass('on');
        index --;
        $ul.find('li').eq(index).addClass('on');
        changeimg();
        $lion = $ul.find('.on');
        var width = $lion[0].offsetWidth + parseInt($lion.css('margin-right'));
        if($lion[0].offsetLeft < $scroll.scrollLeft()){
            var n = $lion[0].offsetLeft / width;
            $scroll.animate({'scrollLeft':width*n});
        };
    });
    $btnR.click(function(){
        if(index === ($ul.find('li').length-1)){
            return false;
        };
        $ul.find('li').eq(index).removeClass('on');
        index ++;
        $ul.find('li').eq(index).addClass('on');
        changeimg();
        $lion = $ul.find('.on');
        var width = $lion[0].offsetWidth + parseInt($lion.css('margin-right'));
        if($lion[0].offsetLeft >= $scroll[0].offsetWidth){
            var n = Math.ceil(($lion[0].offsetLeft - $scroll[0].offsetWidth) / width);
            $scroll.animate({'scrollLeft':width*n});
        };
    });
    function changeimg(){
        $('.content-main-left-magnifying .xbox img').attr('src',$ul.find('li').eq(index).find('img').attr('sign'));
        $('.content-main-left-magnifying .dbox img').attr('src',$ul.find('li').eq(index).find('img').attr('sign'));
    }
})();

/* 获取数据并渲染页面 */
(function(){
    var type = getQueryString('type');
    var code = getQueryString('code');
    var data = null;
    if(type == 'mobilephone'){
        $('.content-nav .type').find('a').attr('href','./goodsList.html?type=mobilephone').text('手机');
        $('.content-nav .series').find('a').text('华为手机系列');
    }else{
        $('.content-nav .type').find('a').attr('href','./goodsList.html?type=laptop').text('电脑');
        $('.content-nav .series').find('a').text('华为笔记本系列');
    };
    /* 请求数据并渲染 */
    $.ajax({
        url:'../data/'+ type +'.json',
        type:'get',
        dataType:'json',
        success : function(json){
            data = json[code];
            $('title').text(data.name);
            $('.content-nav .name').find('p').text(data.name);
            $('.content-main-left .xbox').find('img').attr('src',Object.values(data.detailimg)[0]);
            $('.content-main-left .dbox').find('img').attr('src',Object.values(data.detailimg)[0]);
            var $ul =$('.content-main-left-magnifyingList ul');
            var $lis = '';
            for(var key in data.detailimg){
                $lis += `<li><img src="${key}" sign="${data.detailimg[key]}" alt=""></li>`;
            } ;
            $ul.append($lis);
            $ul.find('li').eq(0).addClass('on');

            $('.content-main-right h2').attr('gName',data.name);
            $('.content-main-right .price').find('span').text(data.price);
            var bs = '';
            data.discounts.forEach(function(item){
                bs += `<b>${item}</b>`;
            });
            $('.content-main-right .promotion>div').append('<div>'+ bs +'</div>');
            $('.content-main-right .code strong').text(data.code);
            var colors ='';
            data.color.forEach(function(item){
                colors += `<i><img src="${data.imgsrc}" alt="">${item}</i>`;
            });
            $('.content-main-right .choose .color').append(colors);
            $('.content-main-right .choose .color').find('i').eq(0).addClass('on');
            var visions ='';
            data.vision.forEach(function(item){
                visions += `<i>${item}</i>`;
            });
            $('.content-main-right .choose .vision').append(visions);
            $('.content-main-right .choose .vision').find('i').eq(0).addClass('on');
            var combos ='';
            data.combo.forEach(function(item){
                combos += `<i>${item}</i>`;
            });
            $('.content-main-right .choose .combo').append(combos);
            $('.content-main-right .choose .combo').find('i').eq(0).addClass('on');
            if(data.stock == 0){
                $('.content-main-right .num .addcart').css('display','none');
                $('.content-main-right .num .buynow').css('display','none');
                $('.content-main-right .num .nomore').css('display','block');
                $('.content-main-right .num .add').css({'color':'#d6d6d6','cursor':'not-allowed'});
            };
            choosedDate();
            choosedName();
        }
    });
    /* 设置 + - 点击事件 */
    var num = parseInt($('.content-main-right .num .count').text());
    $('.content-main-right .num .add').click(function(){
        if($(this).css('cursor') === 'not-allowed'){
            return false;
        };
        if(num == 1){
            $(this).siblings('.mius').css({
                'color':'#333',
                'cursor':'pointer'
            });
        };
        $(this).siblings('.count').text(++num);
    });
    $('.content-main-right .num .mius').click(function(){
        if(num == 1){
            return false;
        };
        $(this).siblings('.count').text(--num);
        if(num == 1){
            $(this).css({
                'color':'#d6d6d6',
                'cursor':'not-allowed'
            });
        };
    });
    /* 设置选择点击事件 */
    $('.content-main-right .choose').on('click','i',function(){
        if($(this).hasClass('on')){
            return false;
        };
        if($(this).parent().hasClass('vision') || $(this).parent().hasClass('combo')){
            var price = parseInt($('.content-main-right .price span').text());
            var x = $(this).index() - $(this).siblings('.on').index();
            price += 1000*x;
            $('.content-main-right .price span').text(price);
        };
        $(this).siblings().removeClass('on');
        $(this).addClass('on');
        choosedDate();
        choosedName();
    });
    function choosedDate(){
        $ons = $('.content-main-right .choose .on');
        var emStr = '';
        $ons.each(function(index,item){
            emStr += `<em>${$(item).text()}</em>/ `;
        });
        emStr = emStr.slice(0,emStr.length-2);
        $('.content-main-right .choosed div').html(emStr);
    };
    function  choosedName(){
        var choosedName = $('.content-main-right h2').attr('gName') + ' ' + $('.content-main-right .choose .vision .on').text() + ' (' + $('.content-main-right .choose .color .on').text() + ') (' + $('.content-main-right .choose .combo .on').text() + ')';
        $('.content-main-right h2').text(choosedName);
    }
})();

/* 加入购物车 */
(function(){
    var user = JSON.parse(localStorage.getItem('user'));
    var $mask = $('.cartMask');
    $('.content-main .addcart').click(function(){
        if(!getCookie('username')){
            $mask.css('display','block');
            $mask.find('p').text('请登录后重试！');
            return false;
        };
        var username = getCookie('username');
        var code = $('.content-main-right .code strong').text();
        var num = $('.content-main .num .count').text();
        var color = $('.content-main .choose .color .on').index();
        var vision = $('.content-main .choose .vision .on').index();
        var combo = $('.content-main .choose .combo .on').index();
        codeNow = code + color + vision + combo;
        var price = $('.content-main .price span').text();
        var goodsname =  $('.content-main-right h2').text();
        var goodssrc = $('.content-main .choose .color .on img').attr('src');
        var userGoods = JSON.parse(localStorage.getItem(username + 'goods')) || {};
        if(userGoods[codeNow]){
            userGoods[codeNow].num = parseInt(userGoods[codeNow].num) + parseInt(num);
        }else{
            userGoods[codeNow] = {
                "goodsname" : goodsname,
                "price" : price,
                "goodssrc" : goodssrc,
                "num":num
            };
        };
        var userGoodsStr = JSON.stringify(userGoods);
        localStorage.setItem(username + 'goods' , userGoodsStr);
        $mask.css('display','block');
        $mask.find('p').text(goodsname +'  成功加入购物车！');
        $mask.css('height',document.documentElement.offsetHeight);
    });
    $mask.find('i').click(function(){
        $mask.css('display','none');
    });
    $mask.find('span').click(function(){
        $mask.css('display','none');
    });
})();
