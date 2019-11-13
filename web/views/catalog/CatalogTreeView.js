/**
 * 目录树型视图
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);


const $ = VRender.$;
const UIButton = VRender.UIButton;

const CatalogTreeView = VRender.UIView.extend(module, {
	className: "view-catalog-tree",

	renderView: function () {
		CatalogTreeView.super(this);

		let addView = $(".addview").appendTo(this.$el);
		$(".addbtn").appendTo(addView).text("新建目录");

		let treeView = $(".treeview").appendTo(this.$el);
		let rootItems = $("ul").appendTo(treeView).attr("level", "0");
		let rootItem = $("li").appendTo(rootItems);
		let rootNode = $(".tree-node.root").appendTo(rootItem);

		rootNode.append($(".title").text("全部")).attr("data-id", "0");
	}
});
