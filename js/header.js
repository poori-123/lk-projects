
(function(){
    let $disLists = $('.dis-list>li>a');
    let $disConts = $('.dis-cont');
    let $txtinp = $('.txtinp');
    for(let i = 0; i < $disLists.length; i++){
        $disLists.eq(i).mouseenter(function(){
            $disLists.each(function(index,item){
                $(item).removeClass('active');
                $disConts.eq(index).removeClass('show');
            });
            $(this).addClass('active');
            $disConts.eq(i).addClass('show');
        });
    };
    $txtinp.focus(function(){
        $(this).siblings('a').css('display','none');
    });
    $txtinp.blur(function(){
        $(this).siblings('a').css('display','block');
    });
    if($('.header').attr('page') == 'index'){
        $('.searchWrap .all').css('display','none');
    };
})();

/* 同步用户数据 */
(function(){
    var user = JSON.parse(localStorage.getItem('user'));
    if(getCookie('username')){
        var name = getCookie('username');
        $('.nav-right .nickname a').text('欢迎您'+ user[name].nickname);
        $('.nav-right .nickname').css('display','block');
        $('.nav-right .logout').css('display','block');
        $('.nav-right .register').parent().css('display','none');
        $('.nav-right .login').parent().css('display','none');
    };
    $('.nav-right .logout a').click(function(){
        $('.nav-right .nickname').css('display','none');
        $('.nav-right .logout').css('display','none');
        $('.nav-right .register').parent().css('display','block');
        $('.nav-right .login').parent().css('display','block');
        removeCookie('username');
        removeCookie('userpsd');
        location.reload();
    });

    /* 加载购物车 */
    var username = getCookie('username');
    var $cart =  $('.nav-right .cart');
    var userGoods = JSON.parse(localStorage.getItem(username + 'goods'));
    if(userGoods && Object.keys(userGoods).length != 0 ){
        $cart.find('.num').text(Object.keys(userGoods).length);
        $cart.find('.empty').css('display','none');
        $cart.find('.goodmsg').css('display','block');
        var $lis = '';
        for(var index in userGoods){
            var code = index.slice(0,index.length-3);
            var type = code.slice(0,code.length-2);
            if(type == 'phone'){
                type = 'mobilephone';
            };
            $lis += `<li code="${index}">
                        <div>   
                            <h5><i class="on"></i></h5>
                            <img src="${userGoods[index].goodssrc}" alt="">
                            <a href="./goodsDetail.html?type=${type}&code=${code}" target="_blank" title="${userGoods[index].goodsname}">${userGoods[index].goodsname}</a>
                            <h6>￥<span>${userGoods[index].price}</span> x <b>${userGoods[index].num}</b></h6>
                        </div>
                        <h5><em>配</em>华为AM115半入耳式耳机（白色）x1</h5>
                        <strong>X</strong>
                    </li>`;
        };
        $cart.find('.goodmsg ul').html($lis);
        priceAll();
    }else{
        $cart.find('.empty').css('display','block');
        $cart.find('.goodmsg').css('display','none');
    };
    $cart.on('click','.goodmsg ul h5 i',function(){
        $(this).toggleClass('on');
        priceAll();
    });
    $cart.on('click','.goodmsg ul strong',function(){
        var code = $(this).parent().attr('code');
        delete userGoods[code];
        $cart.find('.num').text(Object.keys(userGoods).length);
        var goodString = JSON.stringify(userGoods);
        localStorage.setItem(username + 'goods' , goodString);
        $(this).parent().remove();
        if(Object.keys(userGoods).length == 0){
            $cart.find('.empty').css('display','block');
            $cart.find('.goodmsg').css('display','none');
        }
        priceAll();
    });
    function priceAll(){
        var price = 0;
        $('.nav-right .cart .goodmsg ul i').each(function(index,item){
            if($(item).hasClass('on')){
                price += Number($(item).parent().siblings('h6').find('span').text()) * Number($(item).parent().siblings('h6').find('b').text());
            };
        });
        $cart.find('.cart-bot span').text(price);
    };
    
})();
    
