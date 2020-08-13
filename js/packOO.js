
(function (){
    function Tab(options){
        this.tits = document.querySelectorAll(options.tits);
        this.cons = document.querySelectorAll(options.cons);
        this.preIndex = options.showIndex;
        this.init();
    };
    Tab.prototype.init = function (){
        this.setClass(this.tits[this.preIndex],'color');
        this.setClass(this.cons[this.preIndex],'show');
        this.bindEvent();
    };
    Tab.prototype.setClass = function(dom,classN){
        dom.className = classN;
    };
    Tab.prototype.getIndex = function(){
        return this.preIndex;
    };
    Tab.prototype.bindEvent = function(){
        for(var i = 0; i < this.tits.length; i++){
            this.tits[i].index = i;
            var _this = this;
            this.tits[i].onclick = function(){
                _this.setClass(_this.tits[_this.preIndex],'');
                _this.setClass(_this.cons[_this.preIndex],'');
                _this.setClass(this,'color');
                _this.setClass(_this.cons[this.index],'show');
                _this.preIndex = this.index;
                console.log(_this.getIndex());
            };
        };
    };

    function factory(options){
        return new Tab(options);
    };
    window.tab = factory;
})();
(function(){
    function Bigger(options){
        this.box = this.getElement(options.box);
        this.mask = this.getElement(options.mask);
        this.dbox = this.getElement(options.dbox);
        this.img = this.getElement(options.img);
        this.bindEnter();
        this.bindMove();
        this.bindLeave();
    };
    Bigger.prototype.getElement = function(selector){
        return document.querySelector(selector);
    };
    Bigger.prototype.setType = function(dom,key,value){
        dom.style[key] = value;
    };
    Bigger.prototype.bindEnter = function(){
        var _this = this;
        this.box.onmouseenter = function(){
            _this.setType(_this.mask,'display','block');
            _this.setType(_this.dbox,'display','block');
        };
    };
    Bigger.prototype.bindLeave = function(){
        var _this = this;
        this.box.onmouseleave = function(){
            _this.setType(_this.mask,'display','none');
            _this.setType(_this.dbox,'display','none');
        };
    };
    Bigger.prototype.bindMove = function(){
        var _this = this;
        this.box.onmousemove = function(e){
            _this.l = e.pageX - offset(_this.box,1).left - _this.mask.offsetWidth/2;
            _this.t = e.pageY - offset(_this.box,1).top - _this.mask.offsetHeight/2;
            if(_this.l < 0){
                _this.l = 0;
            };
            if(_this.t < 0){
                _this.t = 0;
            };
            if(_this.l > _this.offsetMius(_this.box,_this.mask,'offsetWidth')){
                _this.l = _this.offsetMius(_this.box,_this.mask,'offsetWidth');
            };
            if(_this.t > _this.offsetMius(_this.box,_this.mask,'offsetHeight')){
                _this.t = _this.offsetMius(_this.box,_this.mask,'offsetHeight');
            };
            _this.setType(_this.mask,'top',_this.t + 'px');
            _this.setType(_this.mask,'left',_this.l + 'px');

            _this.maskX = _this.l/_this.offsetMius(_this.box,_this.mask,'offsetWidth');
            _this.maskY = _this.t/_this.offsetMius(_this.box,_this.mask,'offsetHeight');
            _this.imgX = _this.maskX*_this.offsetMius(_this.dbox,_this.img,'offsetWidth');
            _this.imgY = _this.maskY*_this.offsetMius(_this.dbox,_this.img,'offsetHeight');

            _this.setType(_this.img,'top',_this.imgY + 'px');
            _this.setType(_this.img,'left',_this.imgX + 'px');

        };
    };
    Bigger.prototype.offsetMius = function(dom1,dom2,key){
        return (dom1[key]) - (dom2[key]);
    };
    function factory(options){
        return new Bigger(options);
    };
    window.bigger = factory;
})();
(function(){
    function ScrollBanner(options){
        this.init(options);
    }
    ScrollBanner.prototype = {
        constructor:ScrollBanner,
        init:function(options){
            this.scroll = this.getNodes(options.scroll)[0];
            this.banner = this.getNodes(options.banner)[0];
            this.cloneImg();
            this.imgs = this.getNodes(options.imgs);
            this.left = this.getNodes(options.left)[0];
            this.right = this.getNodes(options.right)[0];
            this.lis = this.getNodes(options.lis);
            this.imgIndex = 0;
            this.liIndex = 0;
            this.timer = null;
            this.moveStart();
            this.bindEvent();
        },
        getNodes:function(selector){
            return document.querySelectorAll(selector);
        },
        cloneImg:function(){
            var newImg = document.createElement('img');
            newImg = this.banner.firstElementChild.cloneNode(true);
            this.banner.appendChild(newImg);
        },
        moveRight:function(){
            this.lis[this.liIndex].className = '';
            this.imgIndex++;
            this.liIndex++;
            if(this.imgIndex > this.imgs.length-1){
                this.imgIndex = 1;
                this.scroll.scrollLeft = 0;
            };
            if(this.liIndex > this.lis.length-1){
                this.liIndex = 0;
            };
            this.lis[this.liIndex].className = 'on';
            animateCSM(this.scroll,{
                'scrollLeft':this.imgIndex * this.scroll.offsetWidth
            });
        },
        moveLeft:function(){
            this.lis[this.liIndex].className = '';
            this.imgIndex--;
            this.liIndex--;
            if(this.imgIndex < 0){
                this.imgIndex = this.imgs.length-2;
                this.scroll.scrollLeft = (this.imgs.length-1)*this.scroll.offsetWidth;
            };
            if(this.liIndex < 0){
                this.liIndex = this.lis.length-1;
            };
            this.lis[this.liIndex].className = 'on';
            animateCSM(this.scroll,{
                'scrollLeft':this.imgIndex * this.scroll.offsetWidth
            });
        },
        moveStart:function(){
            var _this = this;
            this.timer = setInterval(function(){
                _this.moveRight();
            },3000);
        },
        bindEvent:function(){
            var _this = this;
            this.left.onclick = function(){
                _this.clearTimer();
                _this.moveLeft();
                _this.moveStart();
            };
            this.right.onclick = function(){
                _this.clearTimer();
                _this.moveRight();
                _this.moveStart();
            };
            for(var i = 0; i < this.lis.length; i++){
                this.lis[i].index = i;
                this.lis[i].onclick = function(){
                    _this.clearTimer();
                    _this.lis[_this.liIndex].className = '';
                    _this.imgIndex = this.index;
                    _this.liIndex = this.index;
                    this.className = 'on';
                    animateCSM(_this.scroll,{
                        'scrollLeft':_this.imgIndex * _this.scroll.offsetWidth
                    });
                    _this.moveStart();
                };
            };
        },
        clearTimer:function(){
            clearInterval(this.timer);
            clearInterval(this.scroll.timer);
        },
    }
    function factory(options){
        return new ScrollBanner(options);
    };
    window.scrollBanner = factory;
})();
(function(){
    function TmdBanner(options){
        this.init(options);
    };
    TmdBanner.prototype = {
        constructor:TmdBanner,
        init:function(options){
            this.imgs = this.getNodes(options.imgs);
            this.left = this.getNodes(options.left)[0];
            this.right = this.getNodes(options.right)[0];
            this.lis = this.getNodes(options.lis);
            this.preIndex = 0;
            this.m = 0;
            this.timer = null;
            this.time = options.time;
            this.setClassN(this.preIndex,1);
            this.moveRight();
            this.bindEvent();
        },
        getNodes:function(selector){
            return document.querySelectorAll(selector);
        },
        setClassN:function(x,y){
            if(y){
                this.imgs[x].classList.add('show');
                this.lis[x].classList.add('on');
                animateCS(this.imgs[x],'opacity',1);
            }else{
                this.imgs[x].classList.remove('show');
                this.lis[x].classList.remove('on');
                this.imgs[x].style.opacity = 0.1;
            } ;
        },
        move:function(x){
            this.setClassN(this.preIndex,0);
            this.preIndex = x;
            if(this.preIndex >= this.imgs.length){
                this.preIndex = 0;
                this.m = 0;
            };
            if(this.preIndex < 0){
                this.preIndex = this.imgs.length - 1;
                this.m =  this.imgs.length - 1;
            };
            this.setClassN(this.preIndex,1);
        },
        moveRight:function(){
            var _this = this;
            this.timer = setInterval(function(){
                _this.move(++_this.m);
            },this.time)
        },
        moveLeft:function(){
            this.move(--this.m);
        },
        bindEvent:function(){
            var _this = this;
            this.left.onclick = function(){
                clearInterval(_this.timer);
                clearInterval(_this.imgs[_this.preIndex].timer);
                _this.moveLeft();
                _this.moveRight();
            };
            this.right.onclick = function(){
                clearInterval(_this.timer);
                clearInterval(_this.imgs[_this.preIndex].timer);
                _this.move(++_this.m);
                _this.moveRight();
            };
            for(var i = 0; i < this.lis.length; i++){
                this.lis[i].index = i;
                this.lis[i].onmouseenter = function(){
                    clearInterval(_this.timer);
                    clearInterval(_this.imgs[_this.preIndex].timer);
                    _this.m = this.index;
                    _this.move(_this.m);
                    _this.moveRight();
                };
            };
        }
    };

    function factory(options){
        return new TmdBanner(options);
    }
        window.tmdBanner = factory;
    })();
   