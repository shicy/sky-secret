package org.scy.secret.service;

/**
 * 口令服务
 * Created by shicy 2020/01/25
 */
public interface CommandService {

    /**
     * 获取用户口令密文
     */
    String getCipher();

    /**
     * 设置用户口令密文
     * @param command 新口令密文
     */
    void setCipher(String command);

}
