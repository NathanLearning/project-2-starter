USE itemCollector;

INSERT INTO users (userName, userPassword)
VALUE
('Mitch', '1234'),
('Nathan', '6789'),
('Jalin', '1457'),
('Bob', '1359'),
('Jim', '9864');

INSERT INTO categories (categoryName)
VALUE
('Baseball Cards'),
('Collectibles');

INSERT INTO items (itemName, itemCondition, itemCategory)
VALUE
('Test', 'Perfect', 1),
('Test3', 'Fair', 2),
('Tes1', 'Poor', 2),
('Test2', 'Fair', 1);

INSERT INTO userQuantity (userId, itemId, quantity)
VALUE
(1, 1, 3),
(1, 2, 6),
(2, 3, 3),
(4, 1, 3),
(2, 2, 5),
(1, 3, 4),
(4, 1, 3),
(5, 2, 3),
(1, 4, 5),
(2, 1, 3),
(3, 1, 3),
(2, 4, 3),
(4, 2, 3),
(4, 4, 3),
(2, 3, 3);

USE itemCollector;
-- DELETE FROM userQuantity WHERE itemId = 1 AND userId = 1
-- SELECT * FROM users;

-- SELECT itemName, itemCondition, categoryName, itemDescription, quantity
-- FROM userQuantity
-- JOIN items ON userQuantity.itemId = items.itemId
-- JOIN categories ON items.itemCategory = categories.categoryId
-- WHERE userId = 1;

-- USE itemCollector;
-- SELECT * FROM items INNER JOIN categories ON items.itemCategory = categories.categoryId
-- WHERE userName = 'Mitch' AND itemCondition = 'Perfect';

-- USE itemCollector;
-- UPDATE items SET itemCondition = 'Perfect' WHERE
-- itemCategory = 1;

-- USE itemCollector;
-- SELECT * FROM items

