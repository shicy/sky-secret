/**
 * 口令初始化页面
 * Created by shicy 2019-11-12
 */

const view = $(".view-command-init");

///////////////////////////////////////////////////////////
view.on("tap", ".ui-btn[name=submit]", function (e) {
	let params = {};
	params.command = $ref("commandInput", view).val();
	if (!params.command)
		return frame.tooltip("error", "请输入口令");

	let loading = frame.loading();
	VR.fetch("user.command.set", params, (err, ret) => {
		console.log("===>", err, ret);
		loading.remove();
	});
});
