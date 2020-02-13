package org.scy.secret;

import org.scy.common.BaseApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

/**
 * 小秘密，个人信息加密系统
 * Created by shicy 2019-09-06
 */
@SpringBootApplication(scanBasePackages = {"org.scy"})
@EnableFeignClients(basePackages = {"org.scy"})
public class App extends BaseApplication {

    /**
     * 主函数，入口
     */
    public static void main(String[] args) throws Exception {
        BaseApplication.startup(App.class, args);
    }

    @Override
    protected String getDbScriptResource() {
        return "org/scy/secret/scripts";
    }
}
