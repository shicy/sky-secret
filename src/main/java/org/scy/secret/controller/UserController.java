package org.scy.secret.controller;

import org.scy.common.web.controller.BaseController;
import org.scy.common.web.controller.HttpResult;
import org.scy.common.web.model.ValidInfo;
import org.scy.common.web.session.SessionManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
    @RequestMapping(value = "/validcode", method = RequestMethod.GET)
    public Object getValidCode() {
        ValidInfo validInfo = SessionManager.getValidCode();
        if (validInfo != null)
            return HttpResult.ok(validInfo);
        return HttpResult.error(401, "获取验证码失败");
    }

}
