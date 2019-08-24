DROP DATABASE IF EXISTS `itemCollector`;

CREATE DATABASE `itemCollector`;

USE `itemCollector`;

CREATE TABLE `users` (
  `userId` INT AUTO_INCREMENT NOT NULL,
  `userName` VARCHAR(45) NOT NULL UNIQUE,
  `userPassword` VARCHAR(150) NOT NULL,
  `userCreation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `userLogin` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  KEY `Idx_001` (`userName`)
);

CREATE TABLE `categories` (
  `categoryId` INT AUTO_INCREMENT NOT NULL,
  `categoryName` VARCHAR(45) NOT NULL,
  `categoryCreation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryId`),
  KEY `Idx_002` (`categoryName`)
);

CREATE TABLE `itemCondition` (
  `itemConditionId` INT AUTO_INCREMENT NOT NULL,
  `itemCondition` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`itemConditionId`),
  KEY `Idx_007` (`itemCondition`)
);

CREATE TABLE `items` (
  `itemId` INT AUTO_INCREMENT NOT NULL,
  `itemName` VARCHAR(45) NOT NULL,
  `itemCategory` INT NOT NULL,
  `itemDescription` TINYTEXT,
  `itemCreation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (itemId),
  KEY `fkIdx_003` (`itemCategory`),
  CONSTRAINT `FK_003` FOREIGN KEY `fkIdx_003` (`itemCategory`) 
  REFERENCES `categories` (`categoryId`),
  KEY `Idx_004` (`itemName`)
);

CREATE TABLE `userQuantity` (
  `quantityId` INT AUTO_INCREMENT NOT NULL,
  `userId` INT NOT NULL,
  `itemId` INT NOT NULL,
  `itemConditionId` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`quantityId`),
  KEY `fkIdx_005` (`userId`),
  CONSTRAINT `FK_005` FOREIGN KEY `fkIdx_005` (`userId`) 
  REFERENCES `users` (`userId`),
  KEY `fkIdx_006` (`itemId`),
  CONSTRAINT `FK_006` FOREIGN KEY `fkIdx_006` (`itemId`) 
  REFERENCES `items` (`itemId`),
  KEY `fkIdx_008` (`itemConditionId`),
  CONSTRAINT `FK_008` FOREIGN KEY `fkIdx_008` (`itemConditionId`)
  REFERENCES `itemCondition` (`itemConditionId`)
);

CREATE TABLE `userNotifications` (
  `notificationId` INT AUTO_INCREMENT NOT NULL,
  `quantityId` INT NOT NULL,
  `notification` TINYTEXT,
  PRIMARY KEY (`notificationId`)
);
