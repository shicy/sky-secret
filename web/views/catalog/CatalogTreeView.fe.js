/**
 * 目录树型视图
 * Created by shicy 2019-11-12
 */

const view = $(".view-catalog-tree");

/////////////////////////////////////////////////
// 点击目录
view.on("tap", ".tree-node", function (e) {
	let node = $(e.currentTarget);
	let item = node.parent();
	if (item.is(".open")) {
		if (node.is(".active"))
			item.removeClass("open");
		else {
			view.find(".tree-node.active").removeClass("active");
			node.addClass("active");
		}
	}
	else {
		item.addClass("open");
		loadSubCatalogs(item);
		if (!node.is(".active")) {
			view.find(".tree-node.active").removeClass("active");
			node.addClass("active");
		}
	}
});

// ==============================================
const loadSubCatalogs = function (nodeItem) {
	if (nodeItem.is(".loaded"))
		return ;
	if (nodeItem.is(".is-loading"))
		return ;

	if (parseInt(nodeItem.parent().attr("level")) >= 5)
		return ;

	nodeItem.addClass("is-loading");
	let subItems = $("<ul></ul>").appendTo(nodeItem);
	subItems.attr("level", parseInt(nodeItem.parent().attr("level")) + 1);
	$("<li class='loading'></li>").appendTo(subItems).text("正在加载...");

	setTimeout(() => {
		nodeItem.addClass("loaded").removeClass("is-loading");
		renderCatalogs(nodeItem, [{}, {}, {}, {}]);
	}, 1000);
};

const renderCatalogs = function (nodeItem, datas) {
	let subItems = nodeItem.children("ul").empty();
	if (datas && datas.length > 0) {
		Utils.each(datas, (data) => {
			let item = $("<li></li>").appendTo(subItems);
			let node = $("<div class='tree-node'></div>").appendTo(item);
			$("<div class='title'></div>").appendTo(node).text("房间诶我费劲儿哦");
		});
	}
	else {
		subItems.remove();
	}
};

/////////////////////////////////////////////////
(function () {
	view.find(".tree-node.root").tap();
})();
