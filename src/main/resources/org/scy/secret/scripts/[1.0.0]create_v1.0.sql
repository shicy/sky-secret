-- ========================================================
-- 加密管理系统
-- Author shicy
-- Created on <2019-10-22>
-- ========================================================

-- USE `db_secret`;

-- -----------------------------------------------------
-- Table `secret`.`catalog`
-- 目录表
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog` (
  `id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL COMMENT '目录名称',
  `type` TINYINT NOT NULL DEFAULT 0,
  `parentId` INT NOT NULL DEFAULT 0,
  `state` TINYINT NOT NULL DEFAULT 1,
  `userId` INT NOT NULL COMMENT '所属用户编号',
  `creatorId` INT NULL,
  `createTime` BIGINT NULL,
  `updatorId` INT NULL,
  `updateTime` BIGINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '目录表'

-- -----------------------------------------------------
-- Table `secret`.`secrets`
-- 加密内容表
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `secrets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `content` TEXT NULL,
  `catalogId` INT NOT NULL,
  `creatorId` INT NULL,
  `createTime` BIGINT NULL,
  `updatorId` INT NULL,
  `updateTime` BIGINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '加密内容'

-- -----------------------------------------------------
-- Table `secret`.`user`
-- 用户表 <2019-11-17 21:00:00>
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL COMMENT '平台用户编号',
  `command` VARCHAR(32) NULL COMMENT '口令（加密结果）',
  `createTime` BIGINT NULL,
  `updateTime` BIGINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_profile_user_idx` (`userId` ASC))
ENGINE = InnoDB
COMMENT = '用户表'
