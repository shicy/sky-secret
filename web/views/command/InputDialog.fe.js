/**
 * PC端主页面
 * Created by shicy 2020-02-08
 */

define("command.input.dialog", function ($, VR, Utils) {

	const CommandInputDialog = function (target, options) {
		this.options = options || {};
		this.$el = $(target);

		this.dialog = UIDialog.find(this.$el)[0];
		this.input = UIInput.find(this.$el)[0];

		this.dialog.on("btn_ok", onDialogSubmitHandler.bind(this));
	};
	const _CommandInputDialog = CommandInputDialog.prototype = new VR.EventEmitter();

	_CommandInputDialog.open = function (submitHandler) {
		this.submitHandler = submitHandler;
		this.dialog.open();
		this.input.val("");
	};

	// ====================================================
	const onDialogSubmitHandler = function (e) {
		let command = this.input.val();
		if (!command)
			return frame.tooltip("error", "请输入口令");

		let cipher = frame.encrypt(command, frame.getUser().code);
		if (cipher != frame.commandCipher)
			return frame.tooltip("error", "口令不正确");

		if (Utils.isFunction(this.submitHandler))
			this.submitHandler(command);
		this.dialog.close();
	};

	///////////////////////////////////////////////////////
	return VR.frontComponent(".command-input-dialog", CommandInputDialog);

});
