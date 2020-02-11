/**
 * 秘密列表
 * Created by shicy 2019-11-16
 */

const view = $(".view-secret-list");
const scrollView = $ref("secretScroller", view);

let listView = view.find(".secret-list");

let currentCatalog = null;
let lastTime = 0;
let moreFlag = true;

/////////////////////////////////////////////////
scrollView.setRefreshFunction(function (callback) {
	lastTime = 0;
	listView.empty();
	loadMore(callback);
	view.trigger("change", null);
	return true;
});

scrollView.setMoreFunction(function (callback) {
	loadMore(callback);
	return true;
});

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
	let item = getItemById(data.id);
	if (item && item.length > 0) {
		let _data = item.data("itemData");
		_data.modified = true;
		updateItem(item, data);
		bringToFront(item);
	}
});

// 保存
view.on("data-saved", function (e, data, id) {
	let item = getItemById(id);
	if (item && item.length > 0) {
		let _data = item.data("itemData");
		_data.id = data.id;
		_data.title = data.title;
		_data.updateTime = data.updateTime;
		_data.modified = false;
		updateItem(item, _data);
	}
});

// 删除
view.on("data-deleted", function (e, id) {
	let item = getItemById(id);
	if (item && item.length > 0)
		item.remove();
	view.trigger("change", null);
	listView.trigger("itemchange");
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

	let item = addItem(data);
	bringToFront(item);
	item.trigger("tap");

	listView.trigger("itemchange");
});

// 点击项
view.on("tap", ".secret-item", function (e) {
	let item = $(e.currentTarget);

	let currentItem = listView.children(".selected");
	if (currentItem && currentItem.length > 0) {
		let data = currentItem.data("itemData");
		if (data.modified) {
			let message = "当前修改还未保存？" +
				"<div style='color:red'>点击“确认”按钮放弃保存</div>";
			frame.confirm("提示", message, () => {
				data.modified = false;
				updateItem(currentItem, data);
				item.tap();
			});
			return ;
		}
	}

	if (item.is(".selected")) {
		item.removeClass("selected");
		view.trigger("change", null);
	}
	else {
		listView.children(".selected").removeClass("selected");
		item.addClass("selected");

		let data = item.data("itemData");
		view.trigger("change", data);
	}
});

// ==============================================
const doRefresh = function (callback) {
	scrollView.reset();
};

const loadMore = function (callback) {
	let params = {};
	params.catalogId = getCurrentCatalogId();
	params.title = getSearchText();
	params.time = lastTime;
	VR.fetch("secret.find", params, (err, ret) => {
		// console.log("===>", err, ret);
		if (!err && ret) {
			Utils.each(ret, (data) => {
				if (!lastTime || lastTime > data.updateTime)
					lastTime = data.updateTime;
				addItem(data);
			});
		}

		callback && callback(err, ret);

		setTimeout(() => {
			if (!ret || ret.length < 10)
				listView.addClass("no-more");
			listView.trigger("loaded");
		}, 10);
	});
};

const addItem = function (data) {
	let item = $("<div class='secret-item'></div>").appendTo(listView);
	item.data("itemData", data);
	item.attr("data-id", data.id);

	$("<div class='title'></div>").appendTo(item)
		.text(data.title || "无标题");

	let updateTime = Utils.toDate(data.updateTime);
	$("<div class='time'></div>").appendTo(item)
		.text(Utils.toLocalDateString(updateTime));

	return item;
};

const updateItem = function (item, data) {
	item.attr("data-id", data.id);
	item.find(".title").text(data.title || "无标题");
	item.find(".time").text(Utils.toLocalDateString(Utils.toDate(data.updateTime)));
}

const bringToFront = function (item) {
	if (item.index() > 0) {
		listView.children().eq(0).before(item);
	}
};

const getItemById = function (id) {
	return Utils.find(listView.children(), (item) => {
		return item.attr("data-id") == id;
	});
};

// ==============================================
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