package org.scy.secret.vo;

import org.scy.secret.model.CatalogModel;

/**
 * Created by shicy on 2017/5/11.
 */
public class CatalogVo extends CatalogModel {

    private static final long serialVersionUID = 1002019102215150003L;

    /**
     * 上级目录名称
     */
    private String parentName;

    /**
     * 用户名称
     */
    private String userName;

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
