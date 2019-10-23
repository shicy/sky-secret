package org.scy.secret.controller;

import org.scy.common.annotation.Auth;
import org.scy.common.web.controller.BaseController;
import org.scy.common.web.controller.HttpResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class IndexController extends BaseController {

    @Auth
    @RequestMapping("/test/auth")
    @ResponseBody
    public Object authTest() {
        return HttpResult.ok("ok");
    }

}
