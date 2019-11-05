/**
 * 前端框架代码
 * Created by shicy 2019-10-25
 */

const frame = window.frame = function () {};

///////////////////////////////////////////////////////////
frame.tooltip = function (type, message, callback) {
	if (type == "error")
		type = "danger";
	let _tooltip = new UIMessage({type: type, content: message});
	if (Utils.isFunction(callback))
		_tooltip.on("close", callback);
};

///////////////////////////////////////////////////////////
VR.onAjaxError = function (errmsg, error) {
	if (errmsg == "html load error")
		return ;
	try {
		errmsg = JSON.parse(errmsg) || errmsg;
		if (errmsg.hasOwnProperty("msg"))
			errmsg = errmsg.msg;
	}
	catch (e) {}
	frame.tooltip("error", errmsg);
};

///////////////////////////////////////////////////////////
Utils.trimObject = function (obj) {
	if (obj) {
		for (let n in obj) {
			let value = obj[n];
			if (value && (typeof value == "string")) {
				obj[n] = Utils.trimToEmpty(value);
			}
		}
	}
};
