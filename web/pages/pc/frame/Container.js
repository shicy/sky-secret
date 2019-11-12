/**
 * PC端主页面容器
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);
const CommandInit = require("../../../views/init/CommandInit");


const $ = VRender.$;

const PageContainer = VRender.UIView.extend(module, {
	className: "page-container",

	renderView: function () {
		PageContainer.super(this);
		this.renderCommandInitView(this.$el);
	},

	renderCommandInitView: function (target) {
		new CommandInit(this).render(target);
	}
});
