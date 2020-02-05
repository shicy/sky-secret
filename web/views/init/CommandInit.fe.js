/**
 * 口令初始化页面
 * Created by shicy 2019-11-12
 */

const view = $(".view-command-init");

///////////////////////////////////////////////////////////
// 点击 确定 按钮
view.on("tap", ".ui-btn[name=submit]", function (e) {
	let command = $ref("commandInput", view).val();
	if (Utils.isBlank(command))
		return frame.tooltip("error", "请输入口令");

	let user = frame.getUser();

	let api = "user.command.set";
	// 将用户唯一编码进行加密，系统保存其密文信息
	let params = {command: frame.encrypt(command, user.code)};

	let message = "是否确认口令？<div style='color:red'>请务必牢记口令！</div>";
	frame.confirm("提示", message, api, params, (err) => {
		if (!err) {
			frame.reload();
		}
	});
});
