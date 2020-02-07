// 2020-02-06

const view = $(".view-main");

/////////////////////////////////////////////////
// 切换目录
view.on("change", ".view-catalog-tree", function (e, data) {
	// 将事件传递到秘密列表组件
	view.find(".view-secret-list").trigger("catalog-changed", data);
});
