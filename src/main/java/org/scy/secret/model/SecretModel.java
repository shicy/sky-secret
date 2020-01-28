package org.scy.secret.model;

import org.scy.common.web.model.BaseModel;

/**
 * 加密项
 * Created by shicy on 2017/5/11.
 */
@SuppressWarnings("unused")
public class SecretModel extends BaseModel {

    private static final long serialVersionUID = 1002019102215150002L;

    /**
     * 标题
     */
    private String title;

    /**
     * 加密内容
     */
    private String content;

    /**
     * 所属目录编号
     */
    private int catalogId;

    private int userId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getCatalogId() {
        return catalogId;
    }

    public void setCatalogId(int catalogId) {
        this.catalogId = catalogId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

}
