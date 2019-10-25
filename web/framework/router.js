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
	Utils.exec(this, [isUserLogin, tryLoadUser], {}, (err) => {
		if (err == "invalid") {
			callback(false, "./pages/login/index");
		}
		else {
			let ua = params.session.getUAState();
			if (us.isMobile)
				callback(false, "./pages/mobile/index");
			else
				callback(false, "./pages/login/index");
		}
	});
};

// ========================================================
const isUserLogin = function (params, callback) {
	callback("invalid", params);
};

const tryLoadUser = function (params, callback) {
	callback(false, params);
};
