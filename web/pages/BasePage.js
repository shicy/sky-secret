/**
 * 基础页面
 * Created by shicy 2015-10-25
 */

const VRender = require(__vrender);


const BasePage = VRender.PageView.extend(module, {
	getPageTitle: function () {
		return "加密宝！就不告诉你！";
	},

	getPageLogo: function () {
		return "/img/logo.png";
	},

	doFileImport: function () {
		BasePage.super(this);

		if (this._isRenderAsApp) {
			this.import("/css/base.m.css", {group: "frame", index: 1});
			this.import("/css/ui.m.css", {group: "frame", index: 1});
		}
		else {
			this.import("/css/base.css", {group: "frame", index: 1});
			this.import("/css/ui.css", {group: "frame", index: 1});
		}

		this.import(`file://${__basedir}/framework/frame.fe.js`, {group: "frame", index: 1});
	}
});
