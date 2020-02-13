package org.scy.secret.model;

import org.scy.common.web.model.BaseModel;

/**
 * 目录
 * Created by shicy on 2017/5/11.
 */
public class CatalogModel extends BaseModel {

    private static final long serialVersionUID = 1002019102215150001L;

    /**
     * 目录名称
     */
    private String name;

    /**
     * 目录类型
     */
    private short type;

    /**
     * 上一级类目编号
     */
    private int parentId;

    /**
     * 所有上级编号，逗号分隔
     */
    private String parentIds;

    /**
     * 用户编号
     */
    private int userId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public short getType() {
        return type;
    }

    public void setType(short type) {
        this.type = type;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public String getParentIds() {
        return parentIds;
    }

    public void setParentIds(String parentIds) {
        this.parentIds = parentIds;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
