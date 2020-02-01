package org.scy.secret.service.impl;

import org.scy.common.web.session.SessionManager;
import org.scy.priv.PrivilegeClientAdapter;
import org.scy.priv.model.UserProfile;
import org.scy.secret.service.CommandService;
import org.springframework.stereotype.Service;

/**
 * 口令服务
 * Created by shicy 2020/01/26
 */
@Service
@SuppressWarnings("unused")
public class CommandServiceImpl implements CommandService {

    @Override
    public String getCipher() {
        int userId = SessionManager.getUserId();
        UserProfile profile = PrivilegeClientAdapter.getUserProfile(userId, "command");
        return profile != null ? profile.getValue() : "";
    }

    @Override
    public void setCipher(String command) {
        int userId = SessionManager.getUserId();
        PrivilegeClientAdapter.setUserProfile(userId, "command", command);
    }

}
