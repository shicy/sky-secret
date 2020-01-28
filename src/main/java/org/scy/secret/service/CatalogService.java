package org.scy.secret.service;

import org.scy.secret.form.CatalogForm;
import org.scy.secret.model.CatalogModel;

import java.util.List;

/**
 * 目录服务
 * Created by shicy 2020/01/26
 */
public interface CatalogService {

    /**
     * 获取所有目录信息
     */
    List<CatalogModel> getAll();

    /**
     * 保存目录信息
     * @param catalogForm 目录信息
     */
    CatalogModel save(CatalogForm catalogForm);

    /**
     * 删除目录
     * @param catalogId 想要删除的目录编号
     */
    void deleteById(int catalogId);

}
