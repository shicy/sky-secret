/**
 * PC端首页
 * Created by shicy 2019-10-25
 */

const VRender = require(__vrender);
const BasePage = require("../BasePage");


const $ = VRender.$;
const Utils = VRender.Utils;
const UIButton = VRender.UIButton;

const PageView = BasePage.extend(module, {
	renderBody: function (body) {
		PageView.super(this, body);
		new UIButton(this, {name: "logout", label: "退出"}).render(body);
	}
});

PageView.use(require("v-render-plugin-spa"));
