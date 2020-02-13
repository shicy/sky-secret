package org.scy.secret.service;

import org.scy.secret.form.SecretForm;
import org.scy.secret.model.SecretModel;

import java.util.List;
import java.util.Map;

/**
 * 秘密服务
 * Created by shicy 2020/01/26
 */
public interface SecretService {

    /**
     * 根据编号获取详情
     * @param id 秘密编号
     */
    SecretModel getById(int id);

    /**
     * 获取秘密信息
     * @param params 参数
     *     -param title 标题模块匹配
     *     -param catalogId 所属目录编号
     * @param lastTime 分页信息，查询该时间之前的10条记录
     * @param size 分大小
     */
    List<SecretModel> find(Map<String, Object> params, long lastTime, int size);

    /**
     * 保存秘密信息
     * @param form 表单数据
     */
    SecretModel save(SecretForm form);

    /**
     * 删除秘密信息
     * @param id 秘密编号
     */
    void deleteById(int id);

}
