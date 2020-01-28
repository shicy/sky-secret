package org.scy.secret.controller;

import org.scy.common.Const;
import org.scy.common.annotation.Auth;
import org.scy.common.utils.HttpUtilsEx;
import org.scy.common.web.controller.BaseController;
import org.scy.common.web.controller.HttpResult;
import org.scy.secret.form.CatalogForm;
import org.scy.secret.form.SecretForm;
import org.scy.secret.model.CatalogModel;
import org.scy.secret.model.SecretModel;
import org.scy.secret.service.CatalogService;
import org.scy.secret.service.CommandService;
import org.scy.secret.service.SecretService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by shicy 2020/01/22
 */
@Controller
@Auth
@ResponseBody
@RequestMapping("/secret")
@SuppressWarnings("unused")
public class SecretController extends BaseController {

    @Autowired
    private CommandService commandService;

    @Autowired
    private CatalogService catalogService;

    @Autowired
    private SecretService secretService;

    /**
     * 获取口令密文
     */
    @RequestMapping(value = "/get_command_cipher", method = RequestMethod.GET)
    public Object getSecretCommand() {
        String command = commandService.getCipher();
        return  HttpResult.ok(command);
    }

    /**
     * 设置（或修改）口令密文
     */
    @RequestMapping(value = "/set_command_cipher", method = RequestMethod.POST)
    public Object setSecretCommand(@RequestParam("command") String command) {
        commandService.setCipher(command);
        return HttpResult.ok();
    }

    /**
     * 获取所有目录信息
     * @return 返回目录信息列表
     */
    @RequestMapping(value = "/catalogs_list", method = RequestMethod.GET)
    public Object getCatalogsAll() {
        List<CatalogModel> catalogVos = catalogService.getAll();
        return HttpResult.ok(catalogVos);
    }

    /**
     * 添加目录
     * @return 返回目录编号
     */
    @RequestMapping(value = "/add_catalog", method = RequestMethod.POST)
    public Object addCatalog(CatalogForm catalogForm) {
        if (catalogForm == null)
            return HttpResult.error(Const.MSG_CODE_PARAMMISSING, "缺少参数");
        catalogForm.setId(0);
        CatalogModel model = catalogService.save(catalogForm);
        return HttpResult.ok(model.getId());
    }

    /**
     * 修改目录
     */
    @RequestMapping(value = "/update_catalog", method = RequestMethod.POST)
    public Object updateCatalog(CatalogForm catalogForm) {
        if (catalogForm == null)
            return HttpResult.error(Const.MSG_CODE_PARAMMISSING, "缺少参数");
        CatalogModel model = catalogService.save(catalogForm);
        return HttpResult.ok(model.getId());
    }

    /**
     * 根据编号删除目录
     * 如果目录及子目录下存在保密信息，则禁止删除
     */
    @RequestMapping(value = "/delete_catalog", method = RequestMethod.POST)
    public Object deleteCatalog(@RequestParam("id") int id) {
        catalogService.deleteById(id);
        return HttpResult.ok();
    }

    /**
     * 获取秘密详情
     * @param id 秘密编号
     */
    @RequestMapping(value = "/detail/{id}", method = RequestMethod.GET)
    public Object getSecret(@PathVariable("id") int id) {
        SecretModel model = secretService.getById(id);
        return HttpResult.ok(model);
    }

    /**
     * 查找保密信息
     * 参数：
     * -param title 标题模糊匹配
     * -param time 查询该时间之前的10条记录
     * @return 返回保密信息列表
     */
    @RequestMapping(value = "/find", method = RequestMethod.GET)
    public Object findSecrets(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("title", HttpUtilsEx.getStringValue(request, "title"));

        long time = HttpUtilsEx.getLongValue(request, "time", 0L);

        List<SecretModel> secretModels = secretService.find(params, time);
        return HttpResult.ok(secretModels);
    }

    /**
     * 添加保密信息
     * @return 返回编号
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Object addSecret(SecretForm secretForm) {
        if (secretForm == null)
            return HttpResult.error(Const.MSG_CODE_PARAMMISSING, "缺少参数");
        secretForm.setId(0);
        SecretModel model = secretService.save(secretForm);
        return HttpResult.ok(model.getId());
    }

    /**
     * 修改保密信息
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public Object updateSecret(SecretForm secretForm) {
        if (secretForm == null)
            return HttpResult.error(Const.MSG_CODE_PARAMMISSING, "缺少参数");
        SecretModel model = secretService.save(secretForm);
        return HttpResult.ok(model.getId());
    }

    /**
     * 根据编号删除保密信息
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public Object deleteSecret(@RequestParam("id") int id) {
        secretService.deleteById(id);
        return HttpResult.ok();
    }

}
