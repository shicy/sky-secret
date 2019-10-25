/**
 * PC端首页
 * Created by shicy 2019-10-25
 */

const VRender = require(__vrender);
const BasePage = require("../BasePage");


const PageView = BasePage.extend(module, {
	renderBody: function (body) {
		PageView.super(this, body);
		body.write("pc");
	}
});

PageView.use(require("v-render-plugin-spa"));
