/**
 * 秘密详情
 * Created by shicy 2020-02-07
 */

const view = $(".view-secret-detail");

let currentData = null;
let userCommand = null;
let lastCommandTime = 0;
let commandTimerId = 0;

/////////////////////////////////////////////////
// 秘密变更
view.on("secret-changed", function (e, data) {
	if (data && data.id && data.id > 0) {
		if (!currentData || currentData.id != data.id)
			doInit(data.id);
	}
	else if (data) {
		initData(Utils.extend({}, data));
	}
	else {
		initData(null);
	}
});

// 点击按钮
view.on("tap", ".btnbar .ui-btn", function (e) {
	let btnName = $(e.currentTarget).attr("name");
	if (btnName == "save")
		doSave();
	else if (btnName == "delete")
		doDelete();
});

// ==============================================
const doInit = function (id) {
	VR.fetch("secret.byid", {id: id}, (err, ret) => {
		if (!err && ret) {
			initData(ret);
		}
	});
};

const initData = function (data) {
	currentData = data;

	let titleInput = view.find(".title input");
	let contentInput = view.find(".content textarea");

	titleInput.val(data && data.title || "");
	contentInput.val("");

	VR.onInputChange(titleInput, null);
	VR.onInputChange(contentInput, null);

	if (data) {
		view.removeClass("empty");

		VR.onInputChange(titleInput, titleChangeHandler);
		VR.onInputChange(contentInput, contentChangeHandler);

		if (data.content) {
			getCommand(false, (command) => {
				contentInput.val(frame.decrypt(command, data.content));
			});
		}
	}
	else {
		view.addClass("empty").removeClass("show-command");
	}

	startCommandTimer();
};

const getCommand = function (force, callback) {
	if (userCommand && !force && (Date.now() - lastCommandTime) < 5 * 60 * 1000) {
		callback(userCommand);
	}
	else {
		let closeable = userCommand && force;
		showCommandInput(closeable, callback);
	}
};

const startCommandTimer = function () {
	if (commandTimerId) {
		clearTimeout(commandTimerId);
	}
	if (currentData) {
		commandTimerId = setTimeout(() => {
			commandTimerId = 0;
			showCommandInput(false, () => {});
		}, 30 * 1000);
	}
	else {
		lastCommandTime = 0;
	}
};

const showCommandInput = function (closeable, callback) {
	if (view.is(".show-command"))
		return ;
	view.addClass("show-command");

	if (commandTimerId) {
		clearTimeout(commandTimerId);
		commandTimerId = 0;
	}

	let commandView = view.find(".command-input").removeClass("closeable");
	if (!!closeable)
		commandView.addClass("closeable");

	let commandInput = $ref("commandInput", commandView);
	commandInput.val("");
	commandInput.focus();

	view.find(".btns .ui-btn").off("tap").on("tap", (e) => {
		if ($(e.currentTarget).attr("name") == "ok") {
			let command = commandInput.val();
			if (!command)
				return frame.tooltip("error", "请输入口令");

			let cipher = frame.encrypt(command, frame.getUser().code);
			if (cipher != frame.commandCipher)
				return frame.tooltip("error", "口令不正确");

			userCommand = command;
			lastCommandTime = Date.now();

			callback && callback(userCommand);
		}

		view.removeClass("show-command");
		startCommandTimer();
	});
};

// ==============================================
// 保存
const doSave = function () {
	let params = {};
	params.id = Math.max(0, currentData.id) || undefined;
	params.title = view.find(".title input").val() || "";
	params.content = view.find(".content textarea").val() || "";
	params.catalogId = currentData.catalogId;
	getCommand(true, (command) => {
		if (params.content)
			params.content = frame.encrypt(command, params.content);
		let loading = frame.loading();
		VR.fetch("secret.save", params, (err, ret) => {
			// console.log("===>", err, ret);
			loading.remove();
			if (!err) {
				frame.tooltip("success", "保存成功");
				let data = {};
				data.id = params.id || (ret && ret.id);
				data.title = params.title;
				data.updateTime = Date.now();
				view.trigger("data-saved", [data, currentData.id]);
				currentData.id = data.id;
			}
		});
	});
};

// 删除
const doDelete = function () {
	getCommand(true, (command) => {
		if (currentData.id > 0) {
			let loading = frame.loading();
			VR.fetch("secret.delete", {id: currentData.id}, (err) => {
				loading.remove();
				if (!err) {
					// frame.tooltip("success", "删除成功");
					view.trigger("data-deleted", currentData.id);
				}
			});
		}
		else {
			// frame.tooltip("success", "删除成功");
			view.trigger("data-deleted", currentData.id);
		}
	});
};

// ==============================================
const titleChangeHandler = function (e, value) {
	currentData.title = Utils.trimToEmpty(value);
	currentData.updateTime = Date.now();
	view.trigger("data-changed", currentData);
	startCommandTimer();
};

const contentChangeHandler = function (e, value) {
	currentData.content = value;
	currentData.updateTime = Date.now();
	view.trigger("data-changed", currentData);
	startCommandTimer();
};

/////////////////////////////////////////////////
(function () {
	// startCommandTimer();
})();