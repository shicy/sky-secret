-- ========================================================
-- 加密管理系统
-- Author shicy
-- Created on <2019-10-22>
-- ========================================================

-- USE `db_secret`;

-- --------------------------------------------------------
-- Table `secret`.`catalog`
-- 目录表
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT '目录名称',
  `type` TINYINT NOT NULL DEFAULT 0,
  `parentId` INT NOT NULL DEFAULT 0,
  `userId` INT NOT NULL COMMENT '所属用户编号',
  `parentIds` VARCHAR(400) NULL COMMENT '所有上级目录编号，逗号分隔',
  `creatorId` INT NULL,
  `createTime` BIGINT NULL,
  `updatorId` INT NULL,
  `updateTime` BIGINT NULL,
  PRIMARY KEY (`id`))
COMMENT = '目录表';

-- --------------------------------------------------------
-- Table `secret`.`secrets`
-- 加密内容表
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `secrets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `content` TEXT NULL,
  `userId` INT NOT NULL COMMENT '所属用户编号',
  `catalogId` INT NOT NULL,
  `creatorId` INT NULL,
  `createTime` BIGINT NULL,
  `updatorId` INT NULL,
  `updateTime` BIGINT NULL,
  PRIMARY KEY (`id`))
COMMENT = '加密内容';

-- ========================================================
-- catalog 表添加 parentIds 列 <2020-02-05 21:00:00>
ALTER TABLE `catalog` ADD COLUMN `parentIds` VARCHAR(400) NULL COMMENT '所有上级目录编号，逗号分隔' AFTER `parentId`;
