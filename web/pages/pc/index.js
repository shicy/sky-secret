/**
 * PC端首页
 * Created by shicy 2019-10-25
 */

const VRender = require(__vrender);
const BasePage = require("../BasePage");
const PageHeader = require("./frame/Header");


const $ = VRender.$;
const Utils = VRender.Utils;
const UIButton = VRender.UIButton;

const PageView = BasePage.extend(module, {
	renderBody: function (body) {
		PageView.super(this, body);

		let mainBody = $(".main-body").appendTo(body);

		let header = $(".main-head").appendTo(mainBody);
		new PageHeader(this).render(header);

		let mainContainer = $(".main-container").appendTo(body);
	}
});

// PageView.use(require("v-render-plugin-spa"));
