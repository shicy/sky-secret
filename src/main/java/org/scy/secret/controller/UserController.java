package org.scy.secret.controller;

import org.apache.commons.lang3.StringUtils;
import org.scy.common.Const;
import org.scy.common.utils.CommonUtilsEx;
import org.scy.common.web.controller.BaseController;
import org.scy.common.web.controller.HttpResult;
import org.scy.common.web.model.ValidInfo;
import org.scy.common.web.session.LoginForm;
import org.scy.common.web.session.SessionManager;
import org.scy.priv.PrivilegeClientAdapter;
import org.scy.priv.model.User;
import org.scy.secret.form.RegisterForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 用户相关
 * Created by shicy 2019/10/28
 */
@Controller
@ResponseBody
public class UserController extends BaseController {

    /**
     * 获取验证码
     */
    @RequestMapping(value = "/user/validcode", method = RequestMethod.GET)
    public Object getValidCode() {
        ValidInfo validInfo = SessionManager.getValidateInfo();
        if (validInfo != null)
            return HttpResult.ok(validInfo);
        return HttpResult.error(1001, "获取验证码失败");
    }

    /**
     * 用户登录
     */
    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public Object login(HttpServletRequest request, HttpServletResponse response, LoginForm loginForm) {
        if (loginForm == null)
            return HttpResult.error(1002, "没有用户信息");
        loginForm.setExpires(24 * 60 * 60); // 1天

        String token = SessionManager.doLogin(loginForm);
        if (token != null) {
            User user = PrivilegeClientAdapter.getUser(SessionManager.getUserId());
            if (user != null) {
                SessionManager.setUser(token, user.toPlatUser(), response);
                return HttpResult.ok(user);
            }
        }
        return HttpResult.ok();
    }

    /**
     * 退出登录
     */
    @RequestMapping(value = "/user/logout", method = RequestMethod.GET)
    public Object logout(HttpServletResponse response) {
        SessionManager.doLogout();
        SessionManager.setUser(null, null, response, -1);
        return HttpResult.ok("ok");
    }

    /**
     * 新用户注册
     * @param registerForm 注册信息
     * @return 返回用户信息
     */
    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
    public Object register(HttpServletRequest request, HttpServletResponse response, RegisterForm registerForm) {
        if (registerForm == null)
            return HttpResult.error(1002, "没有用户信息");

        String validCodeId = registerForm.getValidCodeId();
        String validCode = registerForm.getValidCode();
        if (StringUtils.isBlank(validCodeId) || StringUtils.isBlank(validCode))
            return HttpResult.error(1003, "验证码无效");
        boolean isUserValid = SessionManager.checkValidateCode(validCodeId, validCode);
        if (!isUserValid)
            return HttpResult.error(1003, "验证码无效");

        if (StringUtils.isBlank(registerForm.getMobile()))
            return HttpResult.error(1004, "手机号码不能为空");
        if (!CommonUtilsEx.checkMobile(registerForm.getMobile()))
            return HttpResult.error(1004, "请输入正确的手机号码");

        User user = new User();
        user.setName(registerForm.getUsername());
        user.setMobile(registerForm.getMobile());
        user.setEmail(registerForm.getEmail());
        user.setPassword(registerForm.getPassword());
        user.setAccept((short)(Const.LOGIN_TYPE_NAME | Const.LOGIN_TYPE_MOBILE | Const.LOGIN_TYPE_EMAIL));

        user = PrivilegeClientAdapter.addUser(user, 0, 0);
        if (user != null) {
            String token = SessionManager.doLoginWithoutPassword(registerForm.getMobile(), 24 * 60 * 60);
            SessionManager.setUser(token, user.toPlatUser(), response);
        }

        return HttpResult.ok(user);
    }

    /**
     * 验证当前用户是否登录
     */
    @RequestMapping(value = "/user/validate", method = RequestMethod.GET)
    public Object checkUserLogin() {
        boolean isLogin = SessionManager.isSessionValidate();
        return HttpResult.ok(isLogin ? "1" : "0");
    }

    /**
     * 获取当前用户的用户信息
     */
    @RequestMapping(value = "/user/info", method = RequestMethod.GET)
    public Object getUserInfo() {
        User user = PrivilegeClientAdapter.getUser(SessionManager.getUserId());
        return HttpResult.ok(user);
    }

}
