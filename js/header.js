
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
    if(userGoods){
        $cart.find('i').text(Object.keys(userGoods).length);
        $cart.find('.empty').css('display','none');
    }
    
})();
    
