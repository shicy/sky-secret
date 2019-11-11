/**
 * PC端顶栏
 * Created by shicy 2019-11-11
 */

const VRender = require(__vrender);


const $ = VRender.$;

const PageHeader = VRender.UIView.extend(module, {
	className: "page-header",

	renderView: function () {
		PageHeader.super(this);

		$(".logo").appendTo(this.$el);
		$(".space").appendTo(this.$el);

		let user = $(".user").appendTo(this.$el);
		this.renderUserInfo(user);
	},

	renderUserInfo: function (target) {
		let user = $(".userinfo").appendTo(target);
		$(".name").appendTo(user).text("18268881203");

		$(".exitbtn").appendTo(target).text("退出");
	}
});
