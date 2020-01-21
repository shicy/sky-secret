/**
 * 口令初始化页面
 * Created by shicy 2019-11-12
 */

const VRender = require(__vrender);


const $ = VRender.$;
const UIInput = VRender.UIInput;
const UIButton = VRender.UIButton;

const CommandInit = VRender.UIView.extend(module, {
	className: "view-command-init",

	renderView: function () {
		CommandInit.super(this);

		let target = $(".content").appendTo(this.$el);
		$(".title").appendTo(target).text("口令设置");

		$(".desc.c").appendTo(target)
			.append($("span").text("口令将用作内容的加解密，详细请查看"))
			.append($("a").text("AES加密算法").attr("target", "_blank")
				.attr("href", "https://baike.baidu.com/item/高级加密标准"));

		$(".desc").appendTo(target)
			.append($("span.high")
				.text("请务必牢记口令，忘记将无法找回！"))
			.append($("span").text("口令只会在系统中短暂地保留，" +
				"除此之外不会在任何地方存储。一旦忘记口令，我们也将为此无能为力。"));

		let form = $(".form").appendTo(target);
		new UIInput(this, {
			ref: "commandInput",
			maxSize: 100,
			width: "100%",
			height: 100,
			prompt: "请输入口令，100字以内的有效字符",
			multi: true
		}).render(form);

		let btns = $(".btns").appendTo(form);
		new UIButton(this, {
			name: "submit",
			label: "确定",
			type: "primary",
			width: 80
		}).render(btns);
	}
});
