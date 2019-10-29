/**
 * 登录页面
 * Created by shicy 2019-10-28
 */

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
