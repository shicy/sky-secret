// 2020-02-06

const view = $(".view-main");

const catalogView = $ref("catalogTreeView", view);
const listView = $ref("secretListView", view);
const detailView = $ref("secretDetailView", view);

/////////////////////////////////////////////////
// 切换目录
catalogView.on("change", function (e, data) {
	// 将事件传递到秘密列表组件
	listView.trigger("catalog-changed", data);
});

// 切换秘密
listView.on("change", function (e, data) {
	detailView.trigger("secret-changed", data);
});

// 内容变更
detailView.on("data-changed", function (e, data) {
	listView.trigger("data-changed", data);
});

// 保存
detailView.on("data-saved", function (e, data, id) {
	listView.trigger("data-saved", [data, id]);
});

// 删除
detailView.on("data-deleted", function (e, id) {
	listView.trigger("data-deleted", id);
});

/////////////////////////////////////////////////
(function () {
	frame.commandCipher = view.attr("command-cipher") || "";
	view.removeAttr("command-cipher");
})();