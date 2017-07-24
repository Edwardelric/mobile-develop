bind(document, 'touchmove', function(ev){
    ev.preventDefault();
})
function fnTab() {
    var oTab = id('tabPic');
    var oList = id('picList');
    var iNow = 0;
    var iX = 0;
    var iW = view().w;
    var oTimer = 0;
    var iStartTouchX = 0;
    var iStartX = 0;
    var len = oList.getElementsByTagName('li').length;
    auto();
    function auto() {
       oTimer = setInterval(function(){
            iNow++;
            iNow = iNow%len; // 当前index索引值
            tab();
        },2000);
    }
    function tab() {
        iX = - iNow * iW;
        oList.style.transition="0.5s";
        oList.style.WebkitTransform = oList.style.transform="translateX("+iX+"px)";
    }
    bind(oTab, 'touchstart', fnStart);
    bind(oTab, 'touchmove', fnMove);
    bind(oTab, 'touchend', fnEnd);
    function fnStart(ev) {
        oList.style.transition="none";
        ev = ev.changedTouches[0];
        iStartTouchX = ev.pageX;    // touch的位置
        iStartX = iX;               // 已经移动的距离
        clearInterval(oTimer);
    }
    function fnMove(ev) {
        ev = ev.changedTouches[0];
        var iDis = ev.pageX - iStartTouchX;     // 移动的距离
        iX = iStartX + iDis;                // 拖拽移动的距离
        oList.style.WebkitTransform = oList.style.transform="translateX("+iX+"px)";
    }
    function fnEnd(ev) {
        iNow =iX/iW;                       // 当前移动到第几张
        console.log(iNow);
        iNow = -Math.round(iNow);
        if(iNow<0){
            iNow = 0;
        }
        if (iNow> len-1) {
            iNow = len-1;
        }
        tab();
        auto();
    }
}
fnTab();