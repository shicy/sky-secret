package org.scy.secret.service.impl;

import org.apache.commons.lang3.StringUtils;
import org.scy.common.Const;
import org.scy.common.exception.ResultException;
import org.scy.common.web.session.SessionManager;
import org.scy.secret.form.CatalogForm;
import org.scy.secret.mapper.CatalogMapper;
import org.scy.secret.model.CatalogModel;
import org.scy.secret.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * 目录服务
 * Created by shicy 2020/01/26
 */
@Service
@SuppressWarnings("unused")
public class CatalogServiceImpl implements CatalogService {

    @Autowired
    private CatalogMapper catalogMapper;

    @Override
    public List<CatalogModel> getAll() {
        return catalogMapper.findAll(SessionManager.getUserId());
    }

    @Override
    public CatalogModel save(CatalogForm catalogForm) {
        if (catalogForm == null)
            throw new ResultException(Const.MSG_CODE_PARAMMISSING, "没有目录信息");

        CatalogModel userModel;
        if (catalogForm.getId() >= 0) {
            userModel = catalogMapper.getById(catalogForm.getId());
            if (userModel == null)
                throw new ResultException(Const.MSG_CODE_NOTEXIST, "没有目录信息");
            if (userModel.getUserId() != SessionManager.getUserId())
                throw new ResultException(Const.MSG_CODE_NOPERMISSION, "没有权限");
            userModel.setUpdatorId(SessionManager.getUserId());
            userModel.setUpdateDate(new Date());
        }
        else {
            userModel = new CatalogModel();
            userModel.setUserId(SessionManager.getUserId());
            userModel.setCreatorId(SessionManager.getUserId());
            userModel.setCreateDate(new Date());
        }

        userModel.setName(StringUtils.trimToNull(catalogForm.getName()));
        if (userModel.getName() == null)
            throw new ResultException(Const.MSG_CODE_PARAMINVALID, "目录名称不能为空");
        userModel.setParentId(catalogForm.getParentId());
        userModel.setType(catalogForm.getType());

        if (userModel.getId() >= 0) {
            catalogMapper.update(userModel);
        }
        else {
            catalogMapper.add(userModel);
        }

        return userModel;
    }

    @Override
    public void deleteById(int catalogId) {
        CatalogModel model = catalogMapper.getById(catalogId);
        if (model != null) {
            if (model.getUserId() == SessionManager.getUserId())
                catalogMapper.delete(model);
        }
    }

}
