!(function(win, $, undefined) {
    // jquery.jsonp 2.4.0 (c)2012 Julian Aubourg | MIT License
// https://github.com/jaubourg/jquery-jsonp
(function(e){function t(){}function n(e){C=[e]}function r(e,t,n){return e&&e.apply&&e.apply(t.context||t,n)}function i(e){return/\?/.test(e)?"&":"?"}function O(c){function Y(e){z++||(W(),j&&(T[I]={s:[e]}),D&&(e=D.apply(c,[e])),r(O,c,[e,b,c]),r(_,c,[c,b]))}function Z(e){z++||(W(),j&&e!=w&&(T[I]=e),r(M,c,[c,e]),r(_,c,[c,e]))}c=e.extend({},k,c);var O=c.success,M=c.error,_=c.complete,D=c.dataFilter,P=c.callbackParameter,H=c.callback,B=c.cache,j=c.pageCache,F=c.charset,I=c.url,q=c.data,R=c.timeout,U,z=0,W=t,X,V,J,K,Q,G;return S&&S(function(e){e.done(O).fail(M),O=e.resolve,M=e.reject}).promise(c),c.abort=function(){!(z++)&&W()},r(c.beforeSend,c,[c])===!1||z?c:(I=I||u,q=q?typeof q=="string"?q:e.param(q,c.traditional):u,I+=q?i(I)+q:u,P&&(I+=i(I)+encodeURIComponent(P)+"=?"),!B&&!j&&(I+=i(I)+"_"+(new Date).getTime()+"="),I=I.replace(/=\?(&|$)/,"="+H+"$1"),j&&(U=T[I])?U.s?Y(U.s[0]):Z(U):(E[H]=n,K=e(y)[0],K.id=l+N++,F&&(K[o]=F),L&&L.version()<11.6?(Q=e(y)[0]).text="document.getElementById('"+K.id+"')."+p+"()":K[s]=s,A&&(K.htmlFor=K.id,K.event=h),K[d]=K[p]=K[v]=function(e){if(!K[m]||!/i/.test(K[m])){try{K[h]&&K[h]()}catch(t){}e=C,C=0,e?Y(e[0]):Z(a)}},K.src=I,W=function(e){G&&clearTimeout(G),K[v]=K[d]=K[p]=null,x[g](K),Q&&x[g](Q)},x[f](K,J=x.firstChild),Q&&x[f](Q,J),G=R>0&&setTimeout(function(){Z(w)},R)),c)}var s="async",o="charset",u="",a="error",f="insertBefore",l="_jqjsp",c="on",h=c+"click",p=c+a,d=c+"load",v=c+"readystatechange",m="readyState",g="removeChild",y="<script>",b="success",w="timeout",E=window,S=e.Deferred,x=e("head")[0]||document.documentElement,T={},N=0,C,k={callback:l,url:location.href},L=E.opera,A=!!e("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;O.setup=function(t){e.extend(k,t)},e.jsonp=O})(jQuery)
    var carInfo = $.extend(win.App.carInfo || {}, {
        init: function(param) {
            var $carDetail = $('#carInfo >div.carDetail'),
                modal = $('#selectModal');
            // 选择车辆品牌点击事件
            $carDetail.find("input[name=carBrand]").click(function() {
                // 弹出车辆品牌
                showSelectModal(modal, true);
            });
            // 选择车型点击事件
            $carDetail.find("input[name=carType]").click(function() {
                // 弹出车型
                showSelectModal(modal, false);
            });
            // 设置默认点击事件
            $carDetail.find('div.setDefault').click(function() {
                var $this = $(this);
                if ($this.find('i').is(':hidden')) {
                    $this.find('i').show();
                    $this.attr('data-type', 'default');
                } else {
                    $this.find('i').hide();
                    $this.attr('data-type', '');
                }
            });
            // 车牌号，发动机号，车架号失去焦点自动将内容转大写
            $carDetail.find('input[name$=Number]').blur(function() {
                var $this = $(this);
                $this.val($.trim($this.val()).toUpperCase());
            }).focus(function() {
                var scrollTop = $(this).parent().parent().offset().top;
                $('#main').scrollTop(scrollTop);
            });
            // 行驶里程去掉前面的0
            $carDetail.find('input[name="dirveRange"]').focus(function() {
                var scrollTop = $(this).parent().parent().offset().top;
                $('#main').scrollTop(scrollTop);
            });
            // 点击保存事件
            $carDetail.find('>button').click(function() {
                if (!validation()) {
                    return false;
                }
                location.hash = '#headerModify/#maintain/1/0/';
            });
            // 选择日期
            (new datePicker()).init({
                /* 按钮选择器，用于触发弹出插件 */
                'trigger': '#carInfo >div.carDetail input[name=timeBuy]',
                /* 模式：date日期；datetime日期时间；time时间；ym年月；*/
                'type': 'date'
            });
            // 初始化选择弹框
            initSelectModal($carDetail, modal);
        }
    });
    // 获取车辆信息对象
    function getCarInfo() {
        var $carDetail = $('#carInfo >div.carDetail'),
            car = {};
        car.CarID = $carDetail.find('input[name="carBrand"]').attr('carid');
        
    }
    // 验证
    function validation() {
        var $carDetail = $('#carInfo >div.carDetail');
        if (!$carDetail.find('input[name="carBrand"]').val()) {
            App.common.tip("品牌车系不能为空！");
            return false;
        }
        if (!$carDetail.find('input[name="carType"]').val()) {
            App.common.tip("车型不能为空！");
            return false;
        }
        if (!$carDetail.find('input[name="timeBuy"]').val()) {
            App.common.tip("购买时间不能为空！");
            return false;
        }
        if (!$carDetail.find('input[name="dirveRange"]').val()) {
            App.common.tip("行驶里程不能为空！");
            return false;
        } else if (!/^[0-9]+.?[0-9]*$/.test($carDetail.find('input[name="dirveRange"]').val())) {
            App.common.tip("请输入有效的行驶里程！");
            $carDetail.find('input[name="dirveRange"]').focus();
            return false;
        }
        if ($carDetail.find('input[name="plateNumber"]').val() && 
            !/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test($carDetail.find('input[name="plateNumber"]').val())) {
            App.common.tip("车牌号格式错误！");
            $carDetail.find('input[name="plateNumber"]').focus();
            return false;
        }
        if ($carDetail.find('input[name="frameNumber"]').val() && 
            !/[a-zA-Z0-9]{17}/.test($carDetail.find('input[name="frameNumber"]').val())) {
            App.common.tip("车架号格式错误！");
            $carDetail.find('input[name="frameNumber"]').focus();
            return false;
        }
        if ($carDetail.find('input[name="engineNumber"]').val() && 
            !/[a-zA-Z0-9]+/.test($carDetail.find('input[name="engineNumber"]').val())) {
            App.common.tip("发动机号格式错误！");
            $carDetail.find('input[name="engineNumber"]').focus();
            return false;
        }
        return true;
    }
    // 显示并设置选择弹框标题
    function showSelectModal(modal, isBrand) {
        if (isBrand) {
            modal.find('h5 >span').text('品牌车系');
            modal.find('div.brand').show().siblings('div.type').hide();
        } else {
            modal.find('h5 >span').text('车型');
            modal.find('div.type').show().siblings('div.brand').hide();
        }
        modal.show().animate({
            'top': 0
        }, 300);
    }
    // 初始化选择弹框
    function initSelectModal($carDetail, modal) {
        var bodyHeight = $('body').height(),
            bodyWidth = $('body').width(),
            titleHeight = 39;
        modal.height(bodyHeight);
        modal.find('>div.brand, >div.type').css('max-height', bodyHeight - titleHeight);
        modal.css('top', bodyHeight + 10);
        modal.find('>h5 >button').click(function() {
            hideSelectModal(modal, bodyHeight);
        });

        // 点击锚点滚动
        modal.find('>div.brand').off('click', 'div.jump-tag li.jump-li').on('click', 'div.jump-tag li.jump-li', function() {
            var dataView = $(this).attr('data-view'),
                scrollTop = $('#' + dataView)[0].offsetTop;
            modal.find('>div.brand').animate({
                'scrollTop': scrollTop - titleHeight
            }, 200);
        });

        // 点击选择车型
        modal.find('>div.type').off('click', 'div.item').on('click', 'div.item', function() {
            var typeId = $(this).attr('data-type');
            $carDetail.find('input[name=carType]')
                .val($(this).text())
                .attr("typeid", typeId);
            hideSelectModal(modal, bodyHeight);
        });

        var $carModels = $('#carModels').css('right', -bodyWidth-10),
            $carModelMask = $('#carModelMask');
        // 选择汽车品牌
        $('#div_ListBrand').on('click', 'li', function() {
            /*
            // 弹出车系子类，再选择子类（暂未实现）
            */
            var typeId = $(this).attr('data_type');
            // 选中汽车品牌
            /*$carDetail.find('input[name=carBrand]')
                .val($(this).find('strong').text())
                .attr("carid", typeId);
            hideSelectModal(modal, bodyHeight);*/

            $.jsonp({
                url: 'http://car.m.autohome.com.cn/ashx/GetSeriesByBrandId.ashx?b=' + typeId,
                callbackParameter: "callback",
                success: function(res) {
                    //console.log(res);
                }
            });
        });
        // 车系子类蒙板点击隐藏车系子类
        $carModelMask.click(function(e) {
            $(this).fadeOut(200);
            $carModels.animate({
                'right': -bodyWidth-10
            }, 200).hide(200);
        });
    }
    // 隐藏弹出框
    function hideSelectModal(modal, bodyHeight) {
        modal.animate({
            'top': bodyHeight + 10
        }, 300).hide(300);
    }
    win.App.carInfo = carInfo;
}(window, jQuery));
