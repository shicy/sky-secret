/**
 * 主应用程序
 * Created by shicy 2019-10-23
 */

const VRender = require(__vrender);
const AppConfig = require("./config/app-config");

VRender.use(require(__vrender_ui));

///////////////////////////////////////////////////////////
const Application = exports;
const Utils = VRender.Utils;

Application.startup = function (config) {
	new VRender(Utils.extend(true, {}, AppConfig, config));
};

Application.getUser = function (session) {
	return session.getData("user");
};
