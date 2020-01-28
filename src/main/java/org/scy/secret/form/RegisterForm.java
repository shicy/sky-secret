package org.scy.secret.form;

/**
 * 注册表单
 * Created by shicy 2019/10/31
 */
@SuppressWarnings("unused")
public class RegisterForm {

    private String username;
    private String mobile;
    private String email;
    private String password;
    private String validCode;
    private String validCodeId;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getValidCode() {
        return validCode;
    }

    public void setValidCode(String validCode) {
        this.validCode = validCode;
    }

    public String getValidCodeId() {
        return validCodeId;
    }

    public void setValidCodeId(String validCodeId) {
        this.validCodeId = validCodeId;
    }
}
