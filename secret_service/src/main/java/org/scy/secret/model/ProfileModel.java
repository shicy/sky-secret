package org.scy.secret.model;

import org.scy.common.web.model.BaseModel;
import org.scy.priv.model.UserProfile;

/**
 * 个人信息
 * Created by shicy 2019/11/17
 */
public class ProfileModel extends BaseModel {

    private static final long serialVersionUID = 1002019111721310001L;

    public static ProfileModel make(UserProfile[] profiles) {
        ProfileModel model = new ProfileModel();
        if (profiles != null) {
            for (UserProfile profile: profiles) {
                if ("command".equals(profile.getName()))
                    model.setCommand(profile.getValue());
            }
        }
        return model;
    }

    /**
     * 用户编号
     */
    private int userId;

    /**
     * 口令（加密后的值）
     */
    private String command;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command;
    }
}
