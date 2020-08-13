
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
})()
    
