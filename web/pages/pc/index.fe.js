/**
 * PC端首页
 * Created by shicy 2019-11-06
 */

///////////////////////////////////////////////////////////
$(".ui-btn").on("tap", function (e) {
	VR.fetch("logout", (err, ret) => {
		console.log("=====", err, ret);
	});
});
