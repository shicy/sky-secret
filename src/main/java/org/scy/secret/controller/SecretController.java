package org.scy.secret.controller;

import org.scy.common.web.controller.BaseController;
import org.scy.common.web.controller.HttpResult;
import org.scy.secret.form.CatalogForm;
import org.scy.secret.form.SecretForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by shicy 2020/01/22
 */
@Controller
@ResponseBody
@RequestMapping("/secret")
@SuppressWarnings("unused")
public class SecretController extends BaseController {

    /**
     * 获取口令
     */
    @RequestMapping(value = "/get_command", method = RequestMethod.GET)
    public Object getSecretCommand() {
        return  HttpResult.ok();
    }

    /**
     * 设置（或修改）口令
     */
    @RequestMapping(value = "/set_command", method = RequestMethod.POST)
    public Object setSecretCommand(@RequestParam("command") String command) {
        System.out.println("command: " + command);
        return HttpResult.ok();
    }

    /**
     * 获取所有目录信息
     * @return 返回目录信息列表
     */
    @RequestMapping(value = "/catalogs_list", method = RequestMethod.GET)
    public Object getCatalogsAll() {
        return HttpResult.ok();
    }

    /**
     * 添加目录
     * @return 返回目录编号
     */
    @RequestMapping(value = "/add_catalog", method = RequestMethod.POST)
    public Object addCatalog(CatalogForm form) {
        return HttpResult.ok();
    }

    /**
     * 修改目录
     */
    @RequestMapping(value = "/update_catalog", method = RequestMethod.POST)
    public Object updateCatalog(CatalogForm form) {
        return HttpResult.ok();
    }

    /**
     * 根据编号删除目录
     * 如果目录及子目录下存在保密信息，则禁止删除
     */
    @RequestMapping(value = "/delete_catalog", method = RequestMethod.POST)
    public Object deleteCatalog(@RequestParam("id") int id) {
        return HttpResult.ok();
    }

    /**
     * 查找保密信息
     * @param title 按标题模糊查询
     * @return 返回保密信息列表
     */
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    public Object findSecrets(@RequestParam("title") String title) {
        return HttpResult.ok();
    }

    /**
     * 添加保密信息
     * @return 返回编号
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Object addSecret(SecretForm form) {
        return HttpResult.ok();
    }

    /**
     * 修改保密信息
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public Object updateSecret(SecretForm form) {
        return HttpResult.ok();
    }

    /**
     * 根据编号删除保密信息
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public Object deleteSecret(@RequestParam("id") int id) {
        return HttpResult.ok();
    }

}
