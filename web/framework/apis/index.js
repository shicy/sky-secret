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
// 返回：{ userId, command }
api("user.profile", function (name, params, callback) {
	this.get("/user/profile", null, (err, ret) => {
		if (!err && ret) {
			ret = { userId: ret.userId, command: ret.command };
		}
		callback(err, ret);
	});
});

// 设置或修改用户口令
// 参数：command
api("user.command.set", function (name, params, callback) {
	this.post("/secret/set_command_cipher", params, callback);
});

///////////////////////////////////////////////////////////
// 获取详情
// 参数：id
// 返回：{ id, title, content, catalogId, userId, createTime, updateTime }
api("secret.byid", function (name, params, callback) {
	let api = "/secret/detail/" + (parseInt(params.id) || 0);
	this.get(api, null, (err, ret) => {
		callback(err, ret);
	});
});

// 查询我的秘密
// 参数：catalogId, title, time
// 返回：[{ id, title, content, catalogId, userId, createTime, updateTime }]
api("secret.find", function (name, params, callback) {
	this.get("/secret/find", params, (err, ret) => {
		callback(err, ret);
	});
});

// 保存秘密
// 参数：{ id, title, content, catalogId }
// 返回：{ id }
api("secret.save", function (name, params, callback) {
	this.headers.contentType = "json";
	let api = !params.id ? "/secret/add" : "/secret/update";
	this.post(api, params, (err, ret) => {
		if (!err && ret) {
			ret = {id: parseInt(ret)};
		}
		callback(err, ret);
	});
});

// 删除秘密
// 参数：{ id }
api("secret.delete", function (name, params, callback) {
	let _params = {};
	_params.id = parseInt(params.id) || 0;
	this.post("/secret/delete", _params, callback);
});

///////////////////////////////////////////////////////////
// 获取全部目录信息
// 参数：无
// 返回：[{ id, name, parentId, parentIds }]
api("catalog.find.all", function (name, params, callback) {
	this.get("/secret/catalogs_list", null, (err, ret) => {
		callback(err, ret);
	});
});

// 保存目录信息
// 参数：{ id, name, parentId }
// 返回：{ id }
api("catalog.save", function (name, params, callback) {
	this.headers.contentType = "json";
	let api = !params.id ? "/secret/add_catalog" : "/secret/update_catalog";
	this.post(api, params, (err, ret) => {
		if (!err && ret) {
			ret = {id: parseInt(ret)};
		}
		callback(err, ret);
	});
});

// 删除目录信息
// 参数：id
api("catalog.delete", function (name, params, callback) {
	let _params = {};
	_params.id = parseInt(params.id) || 0;
	this.post("/secret/delete_catalog", _params, callback);
});
