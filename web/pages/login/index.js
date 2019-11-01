/**
 * 登录页面
 * Created by shicy 2019-10-25
 */

const VRender = require(__vrender);
const BasePage = require("../BasePage");


const $ = VRender.$;
const Utils = VRender.Utils;
const UIButton = VRender.UIButton;
const UIForm = VRender.UIForm;
const UIInput = VRender.UIInput;

const PageView = BasePage.extend(module, {
	renderBody: function (body) {
		PageView.super(this, body);
		let target = $(".m-login").appendTo(body);
		this.renderLoginView(target);
		this.renderRegisterView(target);
	},

	renderLoginView: function (target) {
		let container = $(".container.login").appendTo(target);
		let box = $(".box").appendTo(container);

		$(".title").appendTo(box).text("登录");

		let form = new UIForm(this, {action: "login", orientation: UIForm.VERTICAL});
		// 
		let loginInput = new UIInput(this);
		form.add("loginName", "手机号码、邮箱或用户名").content(loginInput);
		// 
		let pwdInput = new UIInput(this, {type: "password"});
		form.add("password", "登录密码").content(pwdInput);
		// 
		form.add("validate", "验证码").content(this.getValidateView());
		form.render($(".form").appendTo(box));

		new UIButton(this, {name: "login", label: "登录", type: "primary"}).render(box);
		new UIButton(this, {name: "toRegister", label: "注册", type: "link"}).render(box);
	},

	renderRegisterView: function (target) {
		let container = $(".container.register").appendTo(target);
		let box = $(".box").appendTo(container);

		$(".title").appendTo(box).text("注册");

		let form = new UIForm(this, {action: "register", orientation: UIForm.VERTICAL});
		// 
		let mobileInput = new UIInput(this, {type: "mobile"});
		form.add("mobile", "手机号码").content(mobileInput).required().emptyMsg("手机号码不能为空");
		// 
		let emailInput = new UIInput(this, {type: "email"});
		form.add("email", "邮箱（可选）").content(emailInput);
		// 
		let nameInput = new UIInput(this, {});
		form.add("username", "用户名（可选）").content(nameInput);
		// 
		let pwdInput = new UIInput(this, {type: "password"});
		form.add("password", "登录密码（6位及以上的数字、字母或_）").content(pwdInput)
			.required().emptyMsg("登录密码不能为空").validator(this.getPasswordValidator());
		// 
		form.add("validate", "验证码").content(this.getValidateView()).validator(this.getCodeValidator());
		form.render($(".form").appendTo(box));

		new UIButton(this, {name: "register", label: "注册", type: "primary"}).render(box);
		new UIButton(this, {name: "toLogin", label: "登录", type: "link"}).render(box);
	},

	getValidateView: function () {
		let target = $(".valid-view");
		new UIInput(this).render(target);
		$("img.code").appendTo(target).attr("alt", "验证码").attr("title", "点击刷新验证码");
		return target;
	},

	getPasswordValidator: function () {
		return function (value, callback) {
			if (value.length < 6)
				callback("登录密码不能少于6位");
			else if (value.replace(/([0-9]|[a-zA-Z]|\_)/g, ""))
				callback("登录密码只能是数字、字母或下划线");
			else
				callback();
		};
	},

	getCodeValidator: function () {
		return function (value, callback) {
			let input = UIInput.find(this.get("validate").container())[0];
			let code = Utils.trimToEmpty(input.val());
			callback(!code ? "请输入验证码" : null);
		};
	}
});
