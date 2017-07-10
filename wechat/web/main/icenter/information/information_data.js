var url = $$.config.serverAddr;
var imgUrl = 'http://api.cheshili.com.cn/Img/';
$page=$("#icenter_information");
var resImg = $$.getUserInfo();
$('#icenter_information .img_icon').attr('src', imgUrl + resImg.Img);
//微信配置
var WXsign = $$.getWeChatSign();
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx2c53034422e377cc', // 必填，公众号的唯一标识
    timestamp: WXsign.timestamp, // 必填，生成签名的时间戳
    nonceStr: WXsign.noncestr, // 必填，生成签名的随机串
    signature: WXsign.sign, // 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
//通过ready接口处理成功验证
wx.ready(function() {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    console.log("接口处理成功");
});

wx.error(function(res) {
    alert("接口处理失败");
    console.log(res);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});

//删除照片
/*    $page.on("click",".close img",function(){
    $page.find(".clear").remove($(this).parent().parent());
    //在imglist数组中删除照片
    $page.imgList.splice($(this).attr("data-index"),$(this).attr("data-index"));
});*/
//拍照调取本地相机和相册  
$('.photo_take').click(function() {
	var token = $$.getToken();
    alert(1);
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
            //  res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片;
            alert(2);
            //预览
            $('.img_icon').on('click', function() {
                wx.previewImage({
                    current: res.localIds, // 当前显示图片的http链接
                    urls: res.localIds // 需要预览的图片http链接列表
                });
            });
            wx.uploadImage({
                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; //返回图片的服务器端ID
                    console.log(serverId);
                    $$.post(url+'/CSL/User/UpdateImg', {WToken: token,Img: serverId,From: 1}, function(data) {
                        $$.setUserInfo('Img', data.Data);
                        $('#icenter_information .img_icon').attr('src', imgUrl + data.Data);
                    });
                }
            });
        }
    });
});
//调取微信头像
$('.photo_photogragh').click(function(){
    $$.post(url + '/Product/WeChat/GetWUserInfo',{Url: 'information/information.html',Status: 0},function(res){

       /* var chars = ['0','1','2','3','4','5','6','7','8','9',

        for (var i = 3; i > 0; i--) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        };*/
        window.open(res.Data);
    });
});