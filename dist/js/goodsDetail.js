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
    var $lis = $('.content-main-left-magnifyingList li');
    var $btnL = $('.content-main-left-magnifyingList .btnL');
    var $btnR = $('.content-main-left-magnifyingList .btnR');
    var index = 0;
    $lis.mouseenter(function(){
        $lis.eq(index).removeClass('on');
        $(this).addClass('on');
        index = $(this).index();
        changeimg();
    });
    $btnL.click(function(){
        if(index === 0){
            return false;
        };
        $lis.eq(index).removeClass('on');
        index --;
        $lis.eq(index).addClass('on');
        changeimg();
    });
    $btnR.click(function(){
        if(index === ($lis.length-1)){
            return false;
        };
        $lis.eq(index).removeClass('on');
        index ++;
        $lis.eq(index).addClass('on');
        changeimg();
    });
    function changeimg(){
        $('.content-main-left-magnifying .xbox img').attr('src',$lis.eq(index).find('img').attr('sign'));
        $('.content-main-left-magnifying .dbox img').attr('src',$lis.eq(index).find('img').attr('sign'));
    }
})();

