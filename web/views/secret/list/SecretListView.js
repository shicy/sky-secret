/**
 * 秘密列表
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);


const $ = VRender.$;
const UIList = VRender.UIList;
const UIScroll = VRender.UIScroll;

const SecretListView = VRender.UIView.extend(module, {
	className: "view-secret-list",

	renderView: function () {
		SecretListView.super(this);
		this.renderSearchView(this.$el);
		this.renderAddView(this.$el);
		this.renderListView(this.$el);
	},

	renderSearchView: function (target) {
		target = $(".searchview").appendTo(target);
		target = $(".searchipt").appendTo(target);
		$("input").appendTo(target).attr("placeholder", "查询");
		$(".searchbtn").appendTo(target);
	},

	renderAddView: function (target) {
		target = $(".addview").appendTo(target);
		$(".addbtn").appendTo(target);
	},

	renderListView: function (target) {
		// let listView = new UIList(this, {
		// 	ref: "listView",
		// 	apiName: "secret.find",
		// 	autoLoad: false,
		// 	itemRenderer: this.getListItemRenderer()
		// });

		target = $(".listview").appendTo(target);
		new UIScroll(this, {
			ref: "secretScroller",
			content: $(".secret-list")
		}).render(target);
	},

	getListItemRenderer: function () {
		return function ($, item, data) {
			var item = $("<div class='secret-item'></div>");
			$("<div class='title'></div>").appendTo(item)
				.text(data.title || "无标题");
			var updateTime = Utils.toDate(data.updateTime);
			$("<div class='time'></div>").appendTo(item)
				.text(Utils.toLocalDateString(updateTime));
			return item;
		};
	}
});
