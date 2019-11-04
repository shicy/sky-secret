package org.scy.secret;

import com.alibaba.fastjson.JSON;
import org.scy.common.web.model.ValidInfo;

public class MainTest {

    public static void main(String[] args) {
        String pattern = "/token/.+/.+";
        System.out.println("/token/8810879977476056/T2lvaKS2IKOVE4gDd".matches(pattern));
    }

}
