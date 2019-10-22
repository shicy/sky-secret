package org.scy.secret.vo;

import org.scy.secret.model.SecretModel;

/**
 * Created by shicy on 2017/5/11.
 */
public class SecretVo extends SecretModel {

    private static final long serialVersionUID = 1002019102215150004L;

    /**
     * 所属目录名称
     */
    private String catalogName;

    public String getCatalogName() {
        return catalogName;
    }

    public void setCatalogName(String catalogName) {
        this.catalogName = catalogName;
    }
}
