/**
 * PC端主页面容器
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);
const MainView = require("../main/MainView");
const CommandInit = require("../../../views/init/CommandInit");


const $ = VRender.$;

const PageContainer = VRender.UIView.extend(module, {
	className: "page-container",

	renderView: function () {
		PageContainer.super(this);

		let profile = this.options.profile || {};
		if (profile.command)
			new MainView(this).render(this.$el);
		else
			new CommandInit(this).render(this.$el);
	}
});
