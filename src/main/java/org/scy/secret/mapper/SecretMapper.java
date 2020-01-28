package org.scy.secret.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.scy.common.ds.query.Selector;
import org.scy.secret.model.SecretModel;

import java.util.List;

/**
 * 秘密
 * Created by shicy 2020/01/27
 */
@Mapper
public interface SecretMapper {

    SecretModel getById(@Param("id") int id);

    List<SecretModel> find(Selector selector);

    void add(SecretModel model);
    void update(SecretModel model);
    void delete(SecretModel model);

}
