/**
 * 秘密列表
 * Created by shicy 2019-11-16
 */

const view = $(".view-secret-list");
const listView = $ref("listView", view);

let currentCatalog = null;
let lastTime = 0;
let moreFlag = true;

/////////////////////////////////////////////////
// 列表加载之前
listView.on("load_before", function (e, api, params) {
	params.catalogId = getCurrentCatalogId();
	params.title = getSearchText();
	params.time = lastTime;
});

// 列表加载完成
listView.on("load_after", function (e, err, datas) {
	if (!err) {
		moreFlag = datas && datas.length > 0;
		if (moreFlag) {
			let _data = datas[datas.length - 1];
			lastTime = _data.updateTime;
		}
	}
});

// 属性列表
listView.on("reload_before", function (e, api, params) {
	params.time = lastTime = 0;
});

// 自定义more判断
listView.hasMore = function () {
	return moreFlag;
};

// ==============================================
// 目录变更
view.on("catalog-changed", function (e, data) {
	let catalogId = data && data.id || 0;
	if (catalogId != getCurrentCatalogId()) {
		currentCatalog = data;
		view.trigger("change", null);
		doRefresh();
	}
});

// 内容变更
view.on("data-changed", function (e, data) {
	let _data = listView.getDataByKey(data.id);
	if (_data) {
		_data.title = data.title;
		_data.updateTime = Date.now();
		_data.modified = true;
		let index = listView.updateItem(_data);
		if (index > 0) {
			listView.removeItemAt(index);
			listView.addItem(_data, 0);
		}
		listView.setSelectedIndex(0);
	}
});

// 保存
view.on("data-saved", function (e, data, id) {
	data.modified = false;
	if (data.id != id) {
		let index = listView.getIndexByKey(id);
		listView.removeItemAt(index);
		listView.addItem(data, 0);
	}
	else {
		listView.updateItem(data);
	}
});

// 删除
view.on("data-deleted", function (e, id) {
	listView.setSelectedIndex(-1);
	let index = listView.getIndexByKey(id);
	listView.removeItemAt(index);
});

// 点击搜索按钮
view.on("tap", ".searchview .searchbtn", function () {
	doRefresh();
});

// 查询输入回车按钮
view.on("keydown", ".searchview input", function (e) {
	if (e.which == 13)
		doRefresh();
});

// 点击添加按钮
view.on("tap", ".addbtn", function (e) {
	let data = {};
	data.id = 0 - Date.now();
	data.title = "";
	data.content = "";
	data.catalogId = getCurrentCatalogId();
	data.updateTime = Date.now();
	listView.addItem(data, 0);
	setTimeout(() => {
		// UIList组件会派发change事件
		listView.setSelectedIndex(0);
	}, 100);
});

// ==============================================
const doRefresh = function () {
	lastTime = 0;
	listView.load(null, {});
};

const getCurrentCatalogId = function () {
	return currentCatalog ? currentCatalog.id : 0;
};

const getSearchText = function () {
	let target = view.find(".searchview");
	let input = target.find("input");
	return Utils.trimToEmpty(input.val()) || undefined;
};

/////////////////////////////////////////////////
(function () {
	setTimeout(() => {
		doRefresh();
	});
})();