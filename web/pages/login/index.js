/**
 * 登录页面
 * Created by shicy 2019-10-25
 */

const VRender = require(__vrender);
const BasePage = require("../BasePage");


const $ = VRender.$;
const Utils = VRender.Utils;


const PageView = BasePage.extend(module, {
	renderBody: function (body) {
		PageView.super(this, body);
	}
});
