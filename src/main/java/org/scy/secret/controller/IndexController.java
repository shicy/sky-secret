package org.scy.secret.controller;

import org.scy.common.web.controller.BaseController;
import org.scy.common.web.controller.HttpResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@SuppressWarnings("unused")
public class IndexController extends BaseController {

    @RequestMapping(value = "/version", method = RequestMethod.GET)
    @ResponseBody
    public Object version() {
        return HttpResult.ok(getAppVersion());
    }

    @RequestMapping("/test/auth")
    @ResponseBody
    public Object authTest() {
        return HttpResult.ok("ok");
    }

}
