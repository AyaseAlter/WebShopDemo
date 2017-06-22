$(function(){
    var bodyHeight = window.innerHeight || document.body.clientHeight,
        $page = $('#index_index').height(bodyHeight),
        pageStr = 'index_index',
        headerHeight = $page.find('>div.header').height(),
        footerHeight = $page.find('>div.footer').height();

    // 设置主窗口高度和位置
    resetWindowSize();
    // 窗口尺寸变化重新计算窗口高度和位置
    window.onresize = function() {
        bodyHeight = window.innerHeight || document.body.clientHeight;
        headerHeight = $page.find('>div.header').height();
        footerHeight = $page.find('>div.footer').height();
        resetWindowSize();
    };
    // 主页模块快捷入口按钮点击事件（洗车、做保养、邀请有礼）
    $page.on('click', 'div.entrance >div', function() {
        var type = $(this).attr('data-type');
        switch(type) {
            case 'carWash': {
                // 一元洗车
                $$.redirect('cleaningCar/cleaningCar.html');
            } break;
            case 'maintain': {
                // 车辆信息
                $$.redirect('myCars/myCars.html');
            } break;
            case 'friendAdd': {
                // 邀请有礼
                $$.redirect('invite/invite.html');
            } break;
        }
    });
    // 活动点击事件
    $page.on('click', 'div.activity', function() {
        $$.redirect('activity/activity.html', 0);
    });
    // 点击商品查看详情
    $page.on('click', 'div.products img', function() {
        var pid = $(this).parent().attr('data-id');
        $$.redirect('product/product.html?pid=' + pid);
    });
    // footer 事件
    $page.on('click', 'div.footer li', function() {
        var type = $(this).attr('data-tab');
        switch(type) {
            case 'index': {
                // 首页
                //$$.redirect('index/index.html');
            } break;
            case 'carCrv': {
                // 服务网点
                
            } break;
            case 'activity': {
                // 活动
                $$.redirect('luckyDraw/luckyDraw.html');
            } break;
            case 'center': {
                // 个人中心
                $$.redirect('pageHome/pageHome.html');
            } break;
        }
    });

    // 重设窗口高度
    function resetWindowSize() {
        $page.find('>div.main').css({
            'height': bodyHeight - headerHeight - footerHeight - 1
        });
    }
});