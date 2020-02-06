package org.scy.secret.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.scy.secret.model.CatalogModel;

import java.util.List;

/**
 * 目录
 * Created by shicy 2020/02/26
 */
@Mapper
public interface CatalogMapper {

    CatalogModel getById(@Param("id") int id);
    List<CatalogModel> findAll(@Param("userId") int userId);
    List<CatalogModel> findChildrenAll(@Param("id") int id);

    void add(CatalogModel model);
    void update(CatalogModel model);
    void delete(CatalogModel model);

    void updateParentIds(CatalogModel model);

}
