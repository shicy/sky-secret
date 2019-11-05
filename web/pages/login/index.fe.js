/**
 * 登录页面
 * Created by shicy 2019-10-28
 */

const view = $(".m-login");
const loginView = view.children(".container.login");
const registerView = view.children(".container.register");

///////////////////////////////////////////////////////////
// 点击 登录 按钮
loginView.on("tap", "[name=login]", function () {
	doLogin();
});

// 点击 前往注册 按钮
loginView.on("tap", "[name=toRegister]", function () {
	loginView.hide();
	registerView.show();
	if (!registerView.attr("validcode"))
		refreshValidCode(registerView);
});

// 点击 注册 按钮
registerView.on("tap", "[name=register]", function () {
	doRegister();
});

// 点击 登录 按钮
registerView.on("tap", "[name=toLogin]", function () {
	registerView.hide();
	loginView.show();
	if (!loginView.attr("validcode"))
		refreshValidCode(loginView);
});

// 点击 验证码 更新验证码
view.on("tap", ".valid-view img", function (e) {
	let target = Utils.parentUntil(e.target, ".container");
	refreshValidCode(target);
});

// ========================================================
// 登录
const doLogin = function () {
	let form = UIForm.find(loginView)[0];

	form.off("action_before").on("action_before", (e, params) => {
		Utils.trimObject(params);
		if (!params.username) {
			e.preventDefault();
			return frame.tooltip("error", "请输入手机号码、邮箱或用户名");
		}
		if (!params.password) {
			e.preventDefault();
			return frame.tooltip("error", "请输入登录密码");
		}
		let validCodeInput = UIInput.find(form.get("validate").container())[0];
		params.validCode = Utils.trimToEmpty(validCodeInput.val());
		params.validCodeId = loginView.attr("validcode");
		if (!params.validCode) {
			e.preventDefault();
			return frame.tooltip("error", "请输入验证码");
		}
	});

	form.submit((err, ret) => {
		console.log("=====", err, ret);
	});
};

// 注册
const doRegister = function () {
	let form = UIForm.find(registerView)[0];

	form.off("action_before").on("action_before", (e, params) => {
		let validCodeInput = UIInput.find(form.get("validate").container())[0];
		params.validCode = Utils.trimToEmpty(validCodeInput.val());
		params.validCodeId = registerView.attr("validcode");
		if (!params.validCode) {
			e.preventDefault();
		}
	});

	form.submit((err, ret) => {
		console.log("======>", err, ret);
		// if (err) {
		// 	let errmsg = Utils.isArray(err) ? err[0].message : err;
		// 	frame.tooltip("error", errmsg);
		// }
	});
};

// 更新验证码
const refreshValidCode = function (target) {
	VR.fetch("login.validcode", (err, ret) => {
		if (!err && ret) {
			target.attr("validcode", ret.codeId || "");
			target.find("img.code").attr("src", ret.imageUrl || "");
		}
	});
};

///////////////////////////////////////////////////////////
(function () {
	refreshValidCode(loginView);
})();
