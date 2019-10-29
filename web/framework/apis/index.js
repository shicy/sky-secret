/**
 * 接口
 * Created by shicy 2019-10-25
 */

const VRender = require(__vrender);

const api = new VRender.api();

///////////////////////////////////////////////////////////
// 获取登录验证码
// @return {code, imageUrl}
api("login.validcode", function (name, params, callback) {
	this.fetch("/validcode", null, (err, ret) => {
		callback(err, ret);
	});
});
