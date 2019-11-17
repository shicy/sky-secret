/**
 * PC端顶栏
 * Created by shicy 2019-11-17
 */

const view = $(".page-header");

/////////////////////////////////////////////////
// 点击退出按钮
view.on("tap", ".exitbtn", function () {
	VR.fetch("logout", null, (err) => {
		location.href = "/";
	});
});
