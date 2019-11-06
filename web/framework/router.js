/**
 * 路由配置
 * Created by shicy 2015-10-25
 */

const VRender = require(__vrender);

require("./apis/index");
require("./routers/index");


const Utils = VRender.Utils;

///////////////////////////////////////////////////////////
const Router = module.exports = function (context) {
	this.context = context;
};
const _Router = Router.prototype;

_Router.view = function (pathname, params, callback) {
	// console.log("============>", pathname);
	Utils.exec(this, [isUserLogin, tryLoadUser], params, (err) => {
		if (err == "invalid") {
			callback(false, "./pages/login/index");
		}
		else {
			let ua = params.session.getUAState();
			if (ua.isMobile)
				callback(false, "./pages/mobile/index");
			else
				callback(false, "./pages/pc/index");
		}
	});
};

// ========================================================
const isUserLogin = function (params, callback) {
	let time = parseInt(params.session.getData("lastUserValidate")) || 0;
	if (Date.now() - time < 5000) { // 防止屏蔽调用接口
		callback(false, params);
	}
	else {
		this.context.doApi(params.session, "user.validate", null, (err, ret) => {
			let isValid = !err && ret && ret.isValid;
			callback((isValid ? false : "invalid"), params);
		});
	}
};

const tryLoadUser = function (params, callback) {
	let user = params.session.getData("user");
	if (user) {
		callback(false, params);
	}
	else {
		this.context.doApi(params.session, "user.reload", null, (err, ret) => {
			callback(err, params);
		});
	}
};
