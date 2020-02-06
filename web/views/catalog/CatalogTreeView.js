/**
 * 目录树型视图
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);


const $ = VRender.$;
const UIButton = VRender.UIButton;
const UIDialog = VRender.UIDialog;
const UIForm = VRender.UIForm;
const UIInput = VRender.UIInput;
const UITreeSelect = VRender.UITreeSelect;

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

		this.renderEditDialog(this.$el);
	},

	renderEditDialog: function (target) {
		let form = new UIForm(this, {ref: "catalogEditForm"});
		// 所属目录
		form.add("parentId", "所属目录").content(new UITreeSelect(this, {
			prompt: "选择所属目录", clearable: true
		}));
		// 名称
		form.add("name", "目录名称").content(new UIInput(this, {
			prompt: "请输入目录名称"
		}));

		new UIDialog(this, {
			ref: "catalogEditDialog",
			title: "目录",
			content: form,
			size: "small"
		}).render(target);
	}
});
