$('.header').load('./header.html');
$('.footer').load('./footer.html');
window.onload = function(){
    $('.searchWrap .all').css('display','none');
};
$('.banner-con-list .list').hover(
    function(){
        $(this).css('border-radius','10px 0 0 10px');
    },
    function(){
        $(this).css('border-radius','10px');
    }
);
tmdBanner({
    imgs:'.banner-img li',
    left:'.banner-img-btnL',
    right:'.banner-img-btnR',
    lis:'.banner-img-page li',
    time:3000
})