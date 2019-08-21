USE itemCollector;

INSERT INTO users (userName, userPassword)
VALUE
('Mitch', '1234'),
('Nathan', '6789'),
('Jalin', '1457'),
('Bob', '1359'),
('Jim', '9864');

USE itemCollector;
INSERT INTO categories (categoryName)
VALUE
('Baseball Cards'),
('Collectibles');

USE itemCollector;
INSERT INTO `itemCondition` (`itemCondition`)
VALUE
('Mint'),
('Near Mint'),
('Excellent'),
('Good'),
('Fair');

USE itemCollector;
INSERT INTO items (itemName, itemCategory)
VALUE
('Test', 1),
('Test3', 2),
('Test1', 2),
('Test2', 1);

USE itemCollector;
INSERT INTO userQuantity (userId, itemId, itemConditionId, quantity)
VALUE
(1, 1, 1, 3),
(1, 2, 3, 6),
(2, 3, 4, 3),
(4, 1, 2, 3),
(2, 2, 2, 5),
(1, 3, 4, 4),
(4, 1, 5, 3),
(5, 2, 3, 3),
(1, 4, 2, 5),
(2, 1, 3, 3),
(3, 1, 1, 3),
(2, 4, 3, 3),
(4, 2, 2, 3),
(4, 4, 4, 3),
(2, 3, 5, 3);



USE itemCollector;
-- DELETE FROM userQuantity WHERE itemId = 1 AND userId = 1
-- SELECT * FROM users;

SELECT itemName, categoryName, itemDescription, quantity
FROM userQuantity
JOIN items ON userQuantity.itemId = items.itemId
JOIN categories ON items.itemCategory = categories.categoryId
WHERE userId = 1;

-- USE itemCollector;
-- SELECT * FROM items INNER JOIN categories ON items.itemCategory = categories.categoryId
-- WHERE userName = 'Mitch' AND itemCondition = 'Perfect';

-- USE itemCollector;
-- UPDATE items SET itemCondition = 'Perfect' WHERE
-- itemCategory = 1;

-- USE itemCollector;
-- SELECT * FROM items

