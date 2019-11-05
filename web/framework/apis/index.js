/**
 * 接口
 * Created by shicy 2019-10-25
 */

const VRender = require(__vrender);

const api = new VRender.api();

///////////////////////////////////////////////////////////
// 获取登录验证码
// 参数：无
// 返回 {code, imageUrl}
api("login.validcode", function (name, params, callback) {
	this.fetch("/validcode", null, (err, ret) => {
		callback(err, ret);
	});
});

// 用户登录
// 参数：username, password, validCode, validCodeId
// 返回：用户信息
api("login$", function (name, params, callback) {
	this.post("/user/login", params, (err, user) => {
		console.log("====", err, user);
		if (err) {
			callback(err);
		}
		else {
			this.session.setData("user", user || "");
			callback(false, user);
		}
	});
});

// 新用户注册（并登录）
// 参数：mobile[, email][, username], password, validCode, validCodeId
// 返回：用户信息
api("register", function (name, params, callback) {
	this.post("/user/register", params, (err, user) => {
		console.log("---", err, user);
		if (err) {
			callback(err);
		}
		else {
			this.session.setData("user", user || "");
			callback(false, user);
		}
	});
});
