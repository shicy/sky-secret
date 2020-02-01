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
	this.fetch("/user/validcode", null, (err, ret) => {
		callback(err, ret);
	});
});

// 用户登录
// 参数：username, password, validCode, validCodeId
// 返回：用户信息
api("login$", function (name, params, callback) {
	this.headers.contentType = "json";
	this.post("/user/login", params, (err, user) => {
		if (err) {
			callback(err);
		}
		else {
			this.session.setData("user", user || "");
			this.session.setData("lastUserValidate", Date.now());
			callback(false, user);
		}
	});
});

// 用户退出登录
// 参数：无
api("logout", function (name, params, callback) {
	this.get("/user/logout", null, (err, ret) => {
		if (!err) {
			this.session.setData("user", "");
			this.session.setData("lastUserValidate", 0);
		}
		callback(err, ret);
	});
});

// 新用户注册（并登录）
// 参数：mobile[, email][, username], password, validCode, validCodeId
// 返回：用户信息
api("register", function (name, params, callback) {
	this.headers.contentType = "json";
	this.post("/user/register", params, (err, user) => {
		if (err) {
			callback(err);
		}
		else {
			this.session.setData("user", user || "");
			this.session.setData("lastUserValidate", Date.now());
			callback(false, user);
		}
	});
});

// 验证当前用户是否登录
// 参数：无
api("user.validate", function (name, params, callback) {
	this.get("/user/validate", null, (err, ret) => {
		let isValid = !err && ret && ret == 1;
		this.session.setData("lastUserValidate", (isValid ? Date.now() : 0));
		callback(err, {isValid: isValid});
	});
});

// 获取当前用户信息
// 参数：无
api("user.reload", function (name, params, callback) {
	this.get("/user/info", null, (err, ret) => {
		let user = !err ? ret : null;
		this.session.setData("user", user || "");
		this.session.setData("lastUserValidate", (user ? Date.now() : 0));
		callback(err, user);
	});
});

// 获取当前用户资料
// 参数：无
api("user.profile", function (name, params, callback) {
	this.get("/user/profile", null, (err, ret) => {
		callback(err, ret);
	});

});

// 设置或修改用户口令
// 参数：command
api("user.command.set", function (name, params, callback) {
	this.post("/secret/set_command_cipher", params, (err, ret) => {
		console.log("44444444444", err, ret);
		callback(err, ret);
	})
});

///////////////////////////////////////////////////////////
// 查询我的秘密
// 参数：catalogId, title
api("secret.find", function (name, params, callback) {
	callback();
	// setTimeout(() => {
	// 	let id = Date.now();
	// 	let time = Date.now();
	// 	let datas = [];
	// 	datas.push({id: id++, title: "积分莴苣哦", updateTime: time});
	// 	datas.push({id: id++, title: "哦我凤减肥哦", updateTime: time});
	// 	datas.push({id: id++, title: "分完了妇委会金覅讹我房间诶我费劲儿哦", updateTime: time});
	// 	datas.push({id: id++, title: "回复", updateTime: time});
	// 	datas.push({id: id++, title: "房间诶我费劲儿哦", updateTime: time});
	// 	callback(false, {total: 83, data: datas});
	// }, 1000);
});
