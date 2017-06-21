$(function() {
    var $page = $('#myCars_myCars'),
    	pageStr = 'myCars_myCars';

    $page.find('div.confirm').hide();

    // 加载车辆信息
	getMyCars();
    // 加载车辆信息
    function getMyCars() {
        if (!$$.isLogin(true)) {
            return false;
        }
        var carsBox = $page.find('>div.main >div.cars');
        $$.post(
        	'CSL/UserInfo/QueryCarList',
        	{},
        	function(res) {
        		if (res.Status != 0) {
	                return false;
	            }
	            if (res.Data && res.Data.Rows) {
	                carsBox.html(template(pageStr + '_list', {
                        list: res.Data.Rows,
                        serverAddr: $$.config.serverAddr,
                        defaultCar: $$.getUserInfo() ? $$.getUserInfo().UserCarID : ''
                    }));
	            }
        	}
        );
    }
    
});