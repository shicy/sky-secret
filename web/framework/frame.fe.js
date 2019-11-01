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
