!(function(){
	if ($$.isLogin()) {
		var token = $$.getToken();
		$('.user_name').html($$.getUserMobile());
		var $page = $('#icenter_pageHome'),
	        pageStr = 'icenter_pageHome';
		var resImg = $$.getUserInfo().Img;//获取头像
		$('#icenter_pageHome .img_icon').attr('src',
			(resImg ? ($$.config.serverAddr + 'Img/' + resImg) : './images/icon.png')
		);
		getICenterInfo();
		function getICenterInfo() {
			$$.post(
				'CSL/User/QueryICenterInfo',
				{},
				function(res) {
					if (res.Status == 0) {
						var d = res.Data;
						d.OrderStatus.forEach(function(item) {
							d['OrderStatus' + item.StatusID] = item.Count;
						});
						$("#icenter_pageHome").find('article').html(
							template('icenter_pageHome_infos', {
								d: res.Data
							})
						);
					}
					bindEvent();
				}
			);
		}
		function bindEvent() {
			//个人信息
		    $('.personal_info').off('click').on('click', function() {
		        $$.redirect('icenter/info.html');
		    });    
		    //邀请有礼
		    $('#head_active_1').off('click').on('click', function() {
		        $$.redirect('home/recommend.html');
		    });
		    //加油卡
		    $('#head_active_2').off('click').on('click', function() {
		        $$.redirect('icenter/gas.html');
		    });
		    //我的车辆
		    $('#head_active_3').off('click').on('click', function() {
		        $$.redirect('home/myCars.html');
		    });
		    //积分
		    $('#reward').off('click').on('click', function() {
		        layer.msg('即将开放，敬请期待~');
		        return false;
		        $$.redirect('icenter/reward.html');
		    });
		    //vip
		    $('.header_vip').off('click').on('click', function() {
		        $$.redirect('icenter/vip.html');
		    });
		    //我的收藏
		    $('#my_cover').off('click').on('click', function() {
		        $$.redirect("icenter/storefront.html?type=product");
		    });
		    $('#home_pageHome_store').off('click').on('click', function() {
		        $$.redirect("icenter/storefront.html?type=store");
		    });
		    //商品列表
		    $('#article_con_tent').off('click').on('click', function() {
		        $$.redirect('icenter/orderList.html?type=all');
		    });   
		    //设置
		    $('#login_set_out').off('click').on('click', function() {
		        $$.redirect('icenter/logout.html');
		    });
		    //优惠券
		    $('#content_account_wrap').off('click').on('click', function() {
		        $$.redirect('icenter/discount.html');
		    });
		    //我的钱包
		    $('#wallet').off('click').on('click', function() {
		        $$.redirect('icenter/myWallet.html');
		    });    
		    //我的足迹
		    $('#footprint').off('click').on('click', function() {
		        $$.redirect('icenter/footprint.html');
		    });     
		    //势力币
		    $('#bin').off('click').on('click', function() {
		    	layer.msg('即将开放，敬请期待~');
		        return false;
		        $$.redirect('icenter/bin.html');
		    });
		    //意见反馈
		    $('#advice').off('click').on('click', function() {
		        $$.redirect('icenter/advice.html');
		    });  
		    //退换/售后
		    $('#order_img_span_5').off('click').on('click', function() {
		        $$.redirect('icenter/commitList.html');
		    });     
		    //跳转订单
		    $('#order_img_span_1').off('click').on('click', function() {
		        $$.redirect('icenter/orderList.html?type=waitPay');
		    });
		    $('#order_img_span_2').off('click').on('click', function() {
		        $$.redirect('icenter/orderList.html?type=waitPost');
		    });
		    $('#order_img_span_3').off('click').on('click', function() {
		        $$.redirect('icenter/orderList.html?type=waitGet');
		    });
		    $('#order_img_span_4').off('click').on('click', function() {
		        $$.redirect('icenter/orderList.html?type=waitRevice');
		    });
		    $('#move_car_qrcode').off('click').on('click', function() {
    			layer.open({
		            type: 1,
		            title: false, //不显示标题栏
		            closeBtn: true,
		            area: ['280px', '400px'],
		            shade: 0.5,
		            moveType: 1, //拖拽模式，0或者1
		            content: '<div style="padding:5px;box-sizing:border-box;text-align:center"><img style="width:100%" src="' +
		            	$$.config.serverAddr +
		            	'CSL/P_Msg/GetMyPhoneQR?WToken=' + token +
		            	'"><p>将二维码打印出来放在车上<br>扫一扫，即可移车</p><img style="margin-top:15px;width:90px;height:40px" src="./images/center/car.png"></div>'
		        });
		    });
		    
		    $('#order_content_need_4').off('click').on('click', function() {
		        $page.find('div.confirm').show();
		    });
		    $page.off('click', 'div.confirm, div.confirm button.cancel')
		    	.on('click', 'div.confirm, div.confirm button.cancel', function() {
		        $page.find('div.confirm').hide();
		    });
		    $page.off('click', 'div.confirm >div').on('click', 'div.confirm >div', function(e) {
		        e.stopPropagation();
		    });

		    // 预约
		    $('#article_con_tent2').off('click').on('click', function() {
		        $$.redirect("icenter/appointmentList.html");
		    });
		    $('#order_img_span_6').off('click').on('click', function() {
		        layer.msg('预约-代付款');
		    });
		    $('#order_img_span_7').off('click').on('click', function() {
		        layer.msg('预约-已预约');
		    });
		    $('#order_img_span_8').off('click').on('click', function() {
		        layer.msg('预约-已验证');
		    });
		    $('#order_img_span_9').off('click').on('click', function() {
		        layer.msg('预约-已完成');
		    });
		}
	}
}());