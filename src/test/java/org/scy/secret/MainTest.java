package org.scy.secret;

import com.alibaba.fastjson.JSON;
import org.scy.common.web.model.ValidInfo;

public class MainTest {

    public static void main(String[] args) {
        ValidInfo validInfo = new ValidInfo();
        validInfo.setCodeId("jfej23Ff");
        validInfo.setImageUrl("交话费文化减肥u我就佛i额外");

        String json = JSON.toJSONString(validInfo);
        System.out.println(json);
    }

}
