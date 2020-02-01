/**
 * PC端顶栏
 * Created by shicy 2019-11-11
 */

const VRender = require(__vrender);
const Application = require(__basedir + "/framework/Application");


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
		$(".name").appendTo(user).text(this.getUserName());

		$(".exitbtn").appendTo(target).text("退出");
	},

	getUserName: function () {
		let userInfo = Application.getUser(this.getSession());
		if (userInfo.name)
			return userInfo.name;
		return userInfo.mobile;
	}
});
