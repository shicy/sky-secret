/**
 * 秘密详情
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);


const $ = VRender.$;
const UIInput = VRender.UIInput;
const UIButton = VRender.UIButton;

const SecretDetailView = VRender.UIView.extend(module, {
	className: "view-secret-detail",

	renderView: function () {
		SecretDetailView.super(this);
		this.$el.addClass("empty");

		let titleView = $(".title").appendTo(this.$el);
		// new UIInput(this, {prompt: "请输入标题..."}).render(titleView);
		$("input").appendTo(titleView).attr("placeholder", "请输入标题...");

		let contentView = $(".content").appendTo(this.$el);
		$("textarea").appendTo(contentView).attr("placeholder", "请输入...");

		new UIButton(this, {name: "savebtn", label: "保存", 
			type: "primary", icon: "/img/a/007b.png"}).render(this.$el);

		$(".empty").appendTo(this.$el);
	}
});
