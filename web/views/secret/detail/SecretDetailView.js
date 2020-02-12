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
		this.renderContentView(this.$el);
		this.renderEmptyView(this.$el);
		this.renderCommandInputView(this.$el);
	},

	renderContentView: function (target) {
		target = $(".container").appendTo(this.$el);
		let titleView = $(".title").appendTo(target);
		$("input").appendTo(titleView).attr("placeholder", "请输入标题...");

		let contentView = $(".content").appendTo(target);
		$("textarea").appendTo(contentView).attr("placeholder", "请输入...");

		let btnbar = $(".btnbar").appendTo(target);
		new UIButton(this, {name: "save", label: "保存", 
			type: "primary", icon: "/img/a/007b.png"}).render(btnbar);
		new UIButton(this, {name: "delete", label: "删除",
			type: "danger", icon: "/img/a/009b.png"}).render(btnbar);
	},

	renderEmptyView: function (target) {
		$(".empty").appendTo(target);
	},

	renderCommandInputView: function (target) {
		target = $(".command-input").appendTo(target);

		let box = $(".box").appendTo(target);
		// $(".title").appendTo(box).text("口令已过期，请重新输入：");
		new UIInput(this, {
			ref: "commandInput",
			prompt: "请输入口令",
			multi: true,
			width: "100%",
			height: 80,
			displayAsPwd: true
		}).render(box);

		let btns = $(".btns").appendTo(box);
		new UIButton(this, {
			name: "ok",
			label: "确定",
			type: "primary",
			width: 90
		}).render(btns);
		new UIButton(this, {
			name: "cancel",
			label: "取消",
			width: 90
		}).render(btns);
	}
});
