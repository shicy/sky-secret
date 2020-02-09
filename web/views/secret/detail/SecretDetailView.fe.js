/**
 * 秘密详情
 * Created by shicy 2020-02-07
 */

const view = $(".view-secret-detail");

let currentData = null;

/////////////////////////////////////////////////
// 秘密变更
view.on("secret-changed", function (e, data) {
	if (data && data.id && data.id > 0) {
		if (!currentData || currentData.id != data.id)
			doInit(data.id);
	}
	else {
		initData(data);
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

	VR.onInputChange(titleInput, null);
	VR.onInputChange(contentInput, null);

	if (data) {
		view.removeClass("empty");
		titleInput.val(data.title || "");
		contentInput.val("");
		// contentInput.val(data.content || "");

		VR.onInputChange(titleInput, titleChangeHandler);
		VR.onInputChange(contentInput, contentChangeHandler);

		if (data.content) {
			frame.getCommand(false, (command) => {
				contentInput.val(frame.decrypt(command, data.content));
			});
		}
	}
	else {
		view.addClass("empty");
	}
};

// 保存
const doSave = function () {
	let params = {};
	params.id = Math.max(0, currentData.id) || undefined;
	params.title = view.find(".title input").val() || "";
	params.content = view.find(".content textarea").val() || "";
	params.catalogId = currentData.catalogId;
	frame.getCommand(true, (command) => {
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
	frame.confirm("提示", "是否确定删除？", () => {
		frame.getCommand(false, (command) => {
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
	});
};

// ==============================================
const titleChangeHandler = function (e, value) {
	currentData.title = Utils.trimToEmpty(value);
	view.trigger("data-changed", currentData);
};

const contentChangeHandler = function (e, value) {
	currentData.content = value;
	view.trigger("data-changed", currentData);
};
