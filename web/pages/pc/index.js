/**
 * PC端首页
 * Created by shicy 2019-10-25
 */

const VRender = require(__vrender);
const BasePage = require("../BasePage");
const PageHeader = require("./frame/Header");
const PageContainer = require("./frame/Container");


const $ = VRender.$;
const Utils = VRender.Utils;
const UIButton = VRender.UIButton;

const PageView = BasePage.extend(module, {
	doInit: function (done) {
		PageView.super(this, () => {
			let callbacks = [this.loadUserProfile];
			Utils.exec(this, callbacks, {}, (err, params) => {
				this.pageHeader = new PageHeader(this, params);
				this.pageContainer = new PageContainer(this, params);
				VRender.View.allReady([this.pageHeader, this.pageContainer], () => {
					done();
				});
			});
		});
	},

	loadUserProfile: function (params, callback) {
		this.doApi("user.profile", null, (err, ret) => {
			this.userProfile = params.profile = !err ? ret : null;
			callback(false, params);
		});
	},

	renderBody: function (body) {
		PageView.super(this, body);

		let mainBody = $("#main-body").appendTo(body);

		let header = $("#main-head").appendTo(mainBody);
		this.pageHeader.render(header);

		let container = $("#main-container").appendTo(mainBody);
		this.pageContainer.render(container);
	}
});

// PageView.use(require("v-render-plugin-spa"));
