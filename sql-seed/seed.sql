DROP DATABASE IF EXISTS `itemCollector`;

CREATE DATABASE `itemCollector`;

USE `itemCollector`;

CREATE TABLE `users` (
  `userId` INT AUTO_INCREMENT NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `userPassword` VARCHAR(45) NOT NULL,
  `userCreation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `userLogin` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  KEY `Idx_001` (`userName`)
)ENGINE=InnoDB;

CREATE TABLE `categories` (
  `categoryId` INT AUTO_INCREMENT NOT NULL,
  `categoryName` VARCHAR(50) NOT NULL,
  `categoryCreation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categoryId`),
  KEY `Idx_002` (`categoryName`)
)ENGINE=InnoDB;

CREATE TABLE `items` (
  `itemId` INT AUTO_INCREMENT NOT NULL,
  `itemName` VARCHAR(45) NOT NULL,
  `itemCondition` VARCHAR(45) NOT NULL,
  `itemCategory` INT(10) NOT NULL,
  `itemDescription` TINYTEXT,
  `itemCreation` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (itemId),
  KEY `fkIdx_003` (`itemCategory`),
  CONSTRAINT `FK_003` FOREIGN KEY `fkIdx_003` (`itemCategory`) 
  REFERENCES `categories` (`categoryId`) ON UPDATE CASCADE,
  KEY `Idx_004` (`itemName`)
)ENGINE=InnoDB;

CREATE TABLE `userQuantity` (
  `quantityId` INT AUTO_INCREMENT NOT NULL,
  `userId` INT NOT NULL,
  `itemId` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`quantityId`),
  KEY `fkIdx_005` (`userId`),
  CONSTRAINT `FK_005` FOREIGN KEY `fkIdx_005` (`userId`) 
  REFERENCES `users` (`userId`) ON UPDATE CASCADE ON DELETE CASCADE,
  KEY `fkIdx_006` (`itemId`),
  CONSTRAINT `FK_006` FOREIGN KEY `fkIdx_006` (`itemId`) 
  REFERENCES `items` (`itemId`) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=InnoDB;
