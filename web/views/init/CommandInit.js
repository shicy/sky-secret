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
			.append($("span.high").text("请务必牢记你的口令"))
			.append($("span").text("，口令只会在您的浏览器中短暂地保留一段时间。" +
				"除此之外，我们不会在任何地方存储您的口令。一旦您忘记口令，将无法找回，" +
				"我们为此无能为力，我们也不为此承担任何责任。"));

		let form = $(".form").appendTo(target);
		new UIInput(this, {maxSize: 100, width: "100%"}).render(form);
		new UIButton(this, {name: "submit", label: "确定", type: "primary", width: 80}).render(form);
	}
});
