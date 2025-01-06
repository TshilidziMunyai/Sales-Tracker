DELIMITER $$

CREATE PROCEDURE GetTotalSalesByProduct(IN p_ProductID INT)
BEGIN
    SELECT 
        p.ProductName,
        SUM(s.Quantity) AS TotalQuantitySold,
        SUM(s.Quantity * p.Price) AS TotalRevenue
    FROM 
        Sales s
    JOIN 
        Products p ON s.ProductID = p.ProductID
    WHERE 
        s.ProductID = p_ProductID
    GROUP BY 
        p.ProductID;
END $$

DELIMITER ;
