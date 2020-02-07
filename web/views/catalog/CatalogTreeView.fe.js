/**
 * 目录树型视图
 * Created by shicy 2019-11-12
 */

const view = $(".view-catalog-tree");

let catalogList = [];
let catalogTreeData = [];

/////////////////////////////////////////////////
// 点击新建按钮
view.on("tap", ".addview .addbtn", function (e) {
	showCatalogEditor({});
});

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
		if (!node.is(".active")) {
			view.find(".tree-node.active").removeClass("active");
			node.addClass("active");
		}
	}
	view.trigger("change", item.data("itemData"));
});

// 点击修改按钮
view.on("tap", ".tree-node .op.edt", function (e) {
	let item = Utils.parentUntil(e.currentTarget, ".tree-node").parent();
	showCatalogEditor(item.data("itemData"));
	return false;
});

// 点击删除按钮
view.on("tap", ".tree-node .op.del", function (e) {
	let item = Utils.parentUntil(e.currentTarget, ".tree-node").parent();
	let data = item.data("itemData");
	let api = "catalog.delete";
	let params = {id: data.id};
	frame.confirm("提示", `是否确认删除“${data.name}”？`, api, params, (err) => {
		if (!err) {
			if (data.parent) {
				Utils.removeBy(data.parent.children, "id", data.id);
				if (data.parent.children.length == 0)
					delete data.parent.children;
			}
			else {
				Utils.removeBy(catalogTreeData, "id", data.id);
			}

			var deleteLoop = (_data) => {
				Utils.removeBy(catalogList, "id", _data.id);
				Utils.each(_data.children, (temp) => {
					deleteLoop(temp);
				});
			};
			deleteLoop(data);

			if (item.children(".tree-node").is(".active"))
				view.find(".tree-node.root").tap();

			let itemParent = item.parent();
			item.remove();
			if (itemParent.children().length == 0)
				itemParent.remove();
		}
	});
	return false;
});

// ==============================================
const doInit = function () {
	let rootNode = view.find(".tree-node.root").addClass("active");

	let rootItem = rootNode.parent().addClass("open");
	let subItems = $("<ul></ul>").appendTo(rootItem);
	subItems.attr("level", "1");
	$("<li class='loading'></li>").appendTo(subItems).text("正在加载...");

	VR.fetch("catalog.find.all", (err, ret) => {
		// console.log("===>", err, ret);
		let datas = !err ? ret : null;
		catalogList = datas || [];
		Utils.each(catalogList, (data) => {
			if (!data.parentId) {
				catalogTreeData.push(data);
			}
			else {
				let parent = Utils.findBy(catalogList, "id", data.parentId);
				if (parent) {
					if (!parent.children)
						parent.children = [];
					parent.children.push(data);
					data.parent = parent;
				}
				else {
					catalogTreeData.push(data);
				}
			}
		});
		renderCatalogs(rootItem, catalogTreeData);
	});
};

const findNodeItem = function (data) {
	return view.find(".tree-node[data-id='" + data.id + "']").parent();
};

const renderCatalogs = function (nodeItem, datas) {
	nodeItem.children("ul").remove();
	if (datas && datas.length > 0) {
		Utils.each(datas, (data) => {
			let subItem = renderOneCatalog(nodeItem, data);
			if (data.children && data.children.length > 0) {
				renderCatalogs(subItem, data.children);
			}
		});
	}
};

const renderOneCatalog = function (nodeItem, data) {
	let subItems = nodeItem.children("ul");
	if (!(subItems && subItems.length > 0)) {
		subItems = $("<ul></ul>").appendTo(nodeItem);
		subItems.attr("level", parseInt(nodeItem.parent().attr("level")) + 1);
	}

	let item = $("<li></li>").appendTo(subItems);
	item.data("itemData", data);
	let node = $("<div class='tree-node'></div>").appendTo(item);
	node.attr("data-id", data.id);
	$("<div class='title'></div>").appendTo(node).text(data.name);

	let ops = $("<div class='ops'></div>").appendTo(node);
	ops.append("<span class='op edt' title='修改'></span>");
	ops.append("<span class='op del' title='删除'></span>");

	return item;
};

const rerenderOneCatalog = function (data) {
	let _data = Utils.findBy(catalogList, "id", data.id);
	if (!_data) { // 新增
		addCatalog(data);
	}
	else { // 修改
		updateCatalog(data);
	}
};

const addCatalog = function (data) {
	catalogList.push(data);
	let parentItem = null;
	let parent = Utils.findBy(catalogList, "id", data.parentId);
	if (parent) {
		if (!parent.children)
			parent.children = [];
		parent.children.push(data);
		data.parent = parent;
		parentItem = findNodeItem(parent);
	}
	else {
		catalogTreeData.push(data);
		parentItem = view.find(".tree-node.root").parent();
	}
	if (parentItem) {
		let nodeItem = renderOneCatalog(parentItem, data);
		nodeItem.parents("li").addClass("open");
		fixItemIndex(nodeItem);
	}
};

const updateCatalog = function (data) {
	let nodeItem = findNodeItem(data);
	nodeItem.children(".tree-node").find(".title").text(data.name);
	let oldParentId = parseInt(data.parent && data.parent.id) || 0;
	if (data.parentId != oldParentId) { // 父节点变更
		if (data.parent) {
			Utils.removeBy(data.parent.children, "id", data.id);
			data.parent = null;
		}
		let parentItem = null;
		if (data.parentId) {
			let parent = Utils.findBy(catalogList, "id", data.parentId);
			if (parent) {
				if (!parent.children)
					parent.children = [];
				parent.children.push(data);
				data.parent = parent;
				parentItem = findNodeItem(parent);
			}
			else {
				catalogTreeData.push(data);
				parentItem = view.find(".tree-node.root").parent();
			}
		}
		else {
			catalogTreeData.push(data);
			parentItem = view.find(".tree-node.root").parent();
		}
		if (parentItem) {
			let subItems = parentItem.children("ul");
			if (subItems.length == 0) {
				subItems = $("<ul></ul>").appendTo(parentItem);
				subItems.attr("level", parseInt(parentItem.parent().attr("level")) + 1);
			}
			let nodeParent = nodeItem.parent();
			nodeItem.appendTo(subItems);
			nodeItem.parents("li").addClass("open");
			if (nodeParent.children().length == 0)
				nodeParent.remove();
			fixItemLevel(nodeItem);
		}
	}
	fixItemIndex(nodeItem);
};

const fixItemIndex = function (nodeItem) {
	let title = nodeItem.children(".tree-node").find(".title").text();

	let parentItems = nodeItem.parent(); // ul
	let nodeItems = parentItems.children("li");

	for (let i = 0; i < nodeItems.length; i++) {
		let item = nodeItems.eq(i);
		let _title = item.children(".tree-node").find(".title").text();
		if (title < _title) {
			item.before(nodeItem);
			break;
		}
	}
};

const fixItemLevel = function (nodeItem) {
	let _inner = function (item, level) {
		let subItems = item.children("ul");
		subItems.attr("level", level);
		Utils.each(subItems.children("li"), (subItem) => {
			_inner(subItem, level + 1);
		});
	};
	_inner(nodeItem, parseInt(nodeItem.parent().attr("level")) + 1);
};

// ==============================================
const showCatalogEditor = function (data) {
	let form = $ref("catalogEditForm", view);

	let parentSel = form.getView("parentId");
	parentSel.setSelectedIndex(-1);
	form.getView("name").val(data.name || "");

	// 允许最多3层
	let level = data.id ? getDataLevels(data) : 0;
	parentSel.setData(getSelectTreeData(3 - level));

	if (data.parentId) {
		setTimeout(() => {
			parentSel.setSelectedKey(data.parentId);
		}, 100);
	}

	let dialog = $ref("catalogEditDialog", view);
	dialog.setTitle(data.id ? "修改目录" : "新建目录");
	dialog.open();

	dialog.off("btn_ok").on("btn_ok", function () {
		dialog.waiting();
		doSave(form, data, (err) => {
			dialog.waiting(false);
			if (!err) {
				dialog.close();
				rerenderOneCatalog(data);
			}
			else {
				frame.tooltip("error", err.msg || err);
			}
		});
	});
};

const doSave = function (form, data, callback) {
	let params = {};
	params.name = Utils.trimToEmpty(form.getView("name").val());
	if (!params.name)
		return callback("请输入目录名称");

	params.parentId = form.getView("parentId").getSelectedKey() || 0;
	params.id = data.id || undefined;
	if (params.id && params.id == params.parentId)
		return callback("所属目录不可以是当前目录");

	VR.fetch("catalog.save", params, (err, ret) => {
		if (!err) {
			data.id = data.id || ret.id;
			data.name = params.name;
			data.parentId = params.parentId;
		}
		callback(err);
		return false;
	});
};

const getDataLevels = function (data) {
	let _inner = function (_data, level) {
		let _level = level;
		Utils.each(_data.children, (temp) => {
			_level = Math.max(_level, _inner(temp, level + 1));
		});
		return _level;
	};
	return _inner(data, 1);
};

const getSelectTreeData = function (maxLevel) {
	let _inner = function (datas, level) {
		if (datas && datas.length > 0 && level < maxLevel) {
			let _datas = [];
			Utils.each(datas, (temp) => {
				let data = {};
				data.id = temp.id;
				data.name = temp.name;
				data.children = _inner(temp.children, level + 1);
				_datas.push(data);
			});
			return _datas;
		}
	};
	return _inner(catalogTreeData, 0);
};

/////////////////////////////////////////////////
(function () {
	doInit();
})();
