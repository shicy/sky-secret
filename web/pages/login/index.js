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
		this.renderLoginView(body);
		this.renderRegisterView(body);
	},

	renderLoginView: function (target) {
		let container = $(".container.login").appendTo(target);
		let box = $(".box").appendTo(container);

		$(".title").appendTo(box).text("登录");

		let form = new UIForm(this, {orientation: UIForm.VERTICAL});
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

		let form = new UIForm(this, {orientation: UIForm.VERTICAL});
		// 
		let mobileInput = new UIInput(this, {type: "mobile"});
		form.add("mobile", "手机号码").content(mobileInput);
		// 
		let emailInput = new UIInput(this, {type: "email"});
		form.add("email", "邮箱").content(emailInput);
		// 
		let nameInput = new UIInput(this, {});
		form.add("name", "用户名").content(nameInput);
		// 
		let pwdInput = new UIInput(this, {type: "password"});
		form.add("password", "登录密码").content(pwdInput);
		// 
		form.add("validate", "验证码").content(this.getValidateView());
		form.render($(".form").appendTo(box));

		new UIButton(this, {name: "register", label: "注册", type: "primary"}).render(box);
		new UIButton(this, {name: "toLogin", label: "登录", type: "link"}).render(box);
	},

	getValidateView: function () {
		let target = $(".valid-view");
		new UIInput(this).render(target);
		$("img.code").appendTo(target).attr("alt", "验证码").attr("title", "点击刷新验证码");
		return target;
	}
});
