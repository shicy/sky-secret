package org.scy.secret.service.impl;

import org.apache.commons.lang3.StringUtils;
import org.scy.common.Const;
import org.scy.common.exception.ResultException;
import org.scy.common.web.session.SessionManager;
import org.scy.secret.form.CatalogForm;
import org.scy.secret.mapper.CatalogMapper;
import org.scy.secret.model.CatalogModel;
import org.scy.secret.model.SecretModel;
import org.scy.secret.service.CatalogService;
import org.scy.secret.service.SecretService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 目录服务
 * Created by shicy 2020/01/26
 */
@Service
@SuppressWarnings("unused")
public class CatalogServiceImpl implements CatalogService {

    @Autowired
    private CatalogMapper catalogMapper;

    @Autowired
    private SecretService secretService;

    @Override
    public List<CatalogModel> getAll() {
        return catalogMapper.findAll(SessionManager.getUserId());
    }

    @Override
    public CatalogModel save(CatalogForm catalogForm) {
        if (catalogForm == null)
            throw new ResultException(Const.MSG_CODE_PARAMMISSING, "没有目录信息");

        CatalogModel userModel;
        if (catalogForm.getId() > 0) {
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

        boolean parentChanged = userModel.getParentId() != catalogForm.getParentId();

        userModel.setName(StringUtils.trimToNull(catalogForm.getName()));
        if (userModel.getName() == null)
            throw new ResultException(Const.MSG_CODE_PARAMINVALID, "目录名称不能为空");
        userModel.setParentId(catalogForm.getParentId());
        userModel.setType(catalogForm.getType());

        if (userModel.getId() > 0) {
            if (userModel.getId() == userModel.getParentId())
                throw new ResultException(Const.MSG_CODE_PARAMINVALID, "所属目录不可以是当前目录");
            catalogMapper.update(userModel);
            if (parentChanged)
                updateCatalogParent(userModel);
        }
        else {
            catalogMapper.add(userModel);
            updateCatalogParent(userModel);
        }

        return userModel;
    }

    @Override
    public void deleteById(int catalogId) {
        CatalogModel model = catalogMapper.getById(catalogId);
        if (model != null) {
            if (model.getUserId() != SessionManager.getUserId())
                throw new ResultException(Const.MSG_CODE_NOTEXIST, "目录不存在");

            Map<String, Object> params = new HashMap<String, Object>();
            params.put("catalogId", model.getId());
            List<SecretModel> secretModels = secretService.find(params, 0, 1);
            if (secretModels != null && secretModels.size() > 0)
                throw new ResultException(Const.MSG_CODE_SERVERREFUSED, "该目录或子目录含有加密信息，禁止删除！");

            List<CatalogModel> subModels = catalogMapper.findChildrenAll(model.getId());
            if (subModels != null && subModels.size() > 0) {
                for (CatalogModel subModel: subModels) {
                    catalogMapper.delete(subModel);
                }
            }

            catalogMapper.delete(model);
        }
        else {
            throw new ResultException(Const.MSG_CODE_NOTEXIST, "目录不存在");
        }
    }

    /**
     * 更新当前目录及其子目录的parentIds信息
     */
    private void updateCatalogParent(CatalogModel model) {
        if (model.getParentId() > 0) {
            CatalogModel parentMode = catalogMapper.getById(model.getParentId());
            if (parentMode != null && parentMode.getUserId() == SessionManager.getUserId()) {
                String parentIds = parentMode.getParentIds();
                if (StringUtils.isBlank(parentIds))
                    parentIds = "|";
                model.setParentIds(parentIds + model.getParentId() + "|");
            }
            else {
                model.setParentIds("");
            }
        }
        else {
            model.setParentIds("");
        }
        catalogMapper.updateParentIds(model);

        List<CatalogModel> subModels = catalogMapper.findChildrenAll(model.getId());
        if (subModels != null && subModels.size() > 0) {
            List<CatalogModel> savedModes = new ArrayList<CatalogModel>();
            savedModes.add(model);

            int size = subModels.size();
            while (size > 0) {
                for (int i = subModels.size() - 1; i >= 0; i--) {
                    CatalogModel subModel = subModels.get(i);
                    for (CatalogModel temp: savedModes) {
                        if (subModel.getParentId() == temp.getId()) {
                            String parentIds = temp.getParentIds();
                            if (StringUtils.isBlank(parentIds))
                                parentIds = "|";
                            subModel.setParentIds(parentIds + temp.getId() + "|");
                            catalogMapper.updateParentIds(subModel);
                            savedModes.add(subModel);
                            subModels.remove(i);
                            break;
                        }
                    }
                }
                if (size == subModels.size())
                    break;
                size = subModels.size();
            }
        }
    }

}
