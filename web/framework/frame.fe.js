/**
 * 前端框架代码
 * Created by shicy 2019-10-25
 */

const frame = window.frame = function () {};


frame.commandCipher = null;

///////////////////////////////////////////////////////////
frame.getUser = function () {
	if (!frame.currentUser)
		frame.currentUser = VR.cache("g_userinfo");
	return frame.currentUser || {};
};
frame.setUser = function (user) {
	frame.currentUser = user || null;
	VR.cache("g_userinfo", frame.currentUser); // 为 null 时删除
};

///////////////////////////////////////////////////////////
frame.encrypt = function (command, value) {
	return CryptoJS.encrypt(command, value);
};

frame.decrypt = function (command, value) {
	return CryptoJS.decrypt(command, value);
};

///////////////////////////////////////////////////////////
frame.tooltip = function (type, message, callback) {
	if (type == "error")
		type = "danger";
	let _tooltip = new UIMessage({type: type, content: message});
	if (Utils.isFunction(callback))
		_tooltip.on("close", callback);
};

frame.confirm = function (title, content, api, params, callback) {
	if (Utils.isFunction(api)) {
		callback = api;
		api = params = null;
	}
	else if (Utils.isFunction(params)) {
		callback = params;
		params = null;
	}
	return new UIConfirm({title: title, focusHtmlContent: content}).onSubmit(function () {
		if (Utils.isBlank(api)) {
			if (Utils.isFunction(callback))
				callback();
		}
		else {
			let loading = frame.loading();
			VR.fetch(api, params, function (err, ret) {
				loading.remove();
				if (Utils.isFunction(callback))
					callback(err, ret);
			});
		}
	});
};

frame.loading = function (target) {
	target = target || $("body");

	let loading = $("<div class='frm-loading'></div>").appendTo(target);
	let content = $("<div class='box'></div>").appendTo(loading);
	content.append("<span class='i1'>l</span>");
	content.append("<span class='i2'>o</span>");
	content.append("<span class='i3'>a</span>");
	content.append("<span class='i4'>d</span>");
	content.append("<span class='i5'>i</span>");
	content.append("<span class='i6'>n</span>");
	content.append("<span class='i7'>g</span>");
	content.append("<span class='i8'>.</span>");
	content.append("<span class='i9'>.</span>");
	content.append("<span class='i10'>.</span>");

	if (target.is("body"))
		$("html").addClass("ui-scrollless");

	setTimeout(() => {
		loading.addClass("show");
	});

	return {
		remove: function () {
			if (target.is("body")) {
				$("html").removeClass("ui-scrollless");
				loading.removeClass("show");
				setTimeout(() => {
					loading.remove();
				}, 200);
			}
			else {
				loading.remove();
			}
		}
	};
};

frame.reload = function () {
	location.reload(true);
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
