package org.scy.secret.service.impl;

import org.apache.commons.lang3.StringUtils;
import org.scy.common.Const;
import org.scy.common.ds.PageInfo;
import org.scy.common.ds.query.Oper;
import org.scy.common.ds.query.Selector;
import org.scy.common.exception.ResultException;
import org.scy.common.web.session.SessionManager;
import org.scy.secret.form.SecretForm;
import org.scy.secret.mapper.SecretMapper;
import org.scy.secret.model.SecretModel;
import org.scy.secret.service.SecretService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 秘密服务
 * Created by shicy 2020/01/27
 */
@Service
@SuppressWarnings("unused")
public class SecretServiceImpl implements SecretService {

    @Autowired
    private SecretMapper secretMapper;

    @Override
    public SecretModel getById(int id) {
        SecretModel model = secretMapper.getById(id);
        if (model != null && model.getUserId() != SessionManager.getUserId())
            return null;
        return model;
    }

    @Override
    public List<SecretModel> find(Map<String, Object> params, long lastTime) {
        Selector selector = new Selector();
        selector.setPageInfo(new PageInfo(1, 10, 0));

        selector.addFilterNotBlank("title", params.get("title"));
        selector.addFilter("userId", SessionManager.getUser());
        selector.addFilter("updateTime", lastTime, Oper.LT);

        List<SecretModel> models = secretMapper.find(selector);
        for (SecretModel model: models) {
            model.setContent(null);
        }
        return models;
    }

    @Override
    public SecretModel save(SecretForm form) {
        if (form == null)
            throw new ResultException(Const.MSG_CODE_PARAMMISSING, "参数不能为空");

        SecretModel userMode;
        if (form.getId() >= 0) {
            userMode = secretMapper.getById(form.getId());
            if (userMode == null)
                throw new ResultException(Const.MSG_CODE_NOTEXIST, "秘密不存在");
            if (userMode.getUserId() != SessionManager.getUserId())
                throw new ResultException(Const.MSG_CODE_NOPERMISSION, "没有权限");
            userMode.setUpdatorId(SessionManager.getUserId());
            userMode.setUpdateDate(new Date());
        }
        else {
            userMode = new SecretModel();
            userMode.setUserId(SessionManager.getUserId());
            userMode.setCreatorId(SessionManager.getUserId());
            userMode.setCreateDate(new Date());
        }

        userMode.setTitle(StringUtils.trimToNull(form.getTitle()));
        if (userMode.getTitle() == null)
            throw new ResultException(Const.MSG_CODE_PARAMMISSING, "标题不能为空");
        userMode.setContent(form.getContent());
        userMode.setCatalogId(form.getCatalogId());

        if (userMode.getId() >= 0)
            secretMapper.update(userMode);
        else
            secretMapper.add(userMode);

        return userMode;
    }

    @Override
    public void deleteById(int id) {
        SecretModel model = getById(id);
        if (model != null)
            secretMapper.delete(model);
    }

}
