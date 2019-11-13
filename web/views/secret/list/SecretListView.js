/**
 * 秘密列表
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);


const $ = VRender.$;
const UIInput = VRender.UIInput;

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
		// new UIInput(this, {prompt: "查询"}).render(target);
		$("input").appendTo(target).attr("placeholder", "查询");
		$(".searchbtn").appendTo(target);
	},

	renderAddView: function (target) {
		target = $(".addview").appendTo(target);
		$(".addbtn").appendTo(target);
	},

	renderListView: function (target) {
		target = $(".listview").appendTo(target);
	}
});
