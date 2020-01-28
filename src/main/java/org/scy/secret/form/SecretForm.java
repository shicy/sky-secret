package org.scy.secret.form;

/**
 * 保密信息表单数据
 * Created by shicy 2020/01/22
 */
@SuppressWarnings("unused")
public class SecretForm {

    private int id;
    private String title;
    private String content;
    private int catalogId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

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

}
