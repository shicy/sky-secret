/**
 * PC端主页面
 * Created by shicy 2020-02-08
 */

const VRender = require(__vrender);


const $ = VRender.$;
const UIDialog = VRender.UIDialog;
const UIInput = VRender.UIInput;

const CommandInputDialog = VRender.UIView.extend(module, {
	ref: "commandInputDialog",
	className: "command-input-dialog",

	renderView: function () {
		CommandInputDialog.super(this);

		let inputView = $(".command-input-view");
		new UIInput(this, {
			width: "320",
			height: "100",
			prompt: "请输入口令",
			multi: true,
			displayAsPwd: true
		}).render(inputView);

		new UIDialog(this, {
			title: "口令",
			content: inputView,
			size: "auto",
			closable: false
		}).render(this.$el);
	},

	getFrontComponentName: function () {
		return "command.input.dialog";
	}
});
