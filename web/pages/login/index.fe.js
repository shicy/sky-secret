/**
 * 登录页面
 * Created by shicy 2019-10-28
 */

const loginView = $(".container.login");
const registerView = $(".container.register");

///////////////////////////////////////////////////////////
// 点击 前往注册 按钮
loginView.on("tap", "[name=toRegister]", function () {
	loginView.hide();
	registerView.show();
});

// 点击 登录 按钮
registerView.on("tap", "[name=toLogin]", function () {
	registerView.hide();
	loginView.show();
});

// ========================================================
// 更新验证码
const refreshValidCode = function (target) {
	VR.fetch("login.validcode", (err, ret) => {
		if (!err && ret) {
			target.find("img.code").attr("src", ret.imageUrl || "");
		}
	});
};

///////////////////////////////////////////////////////////
(function () {
	refreshValidCode($(".container.login"));
})();
