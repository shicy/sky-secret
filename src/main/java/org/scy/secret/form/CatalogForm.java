package org.scy.secret.form;

/**
 * 目录信息表单数据
 * Created by shicy 2020/01/22
 */
@SuppressWarnings("unused")
public class CatalogForm {

    private int id;
    private String name;
    private int parentId;
    private short type;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public short getType() {
        return type;
    }

    public void setType(short type) {
        this.type = type;
    }
}
