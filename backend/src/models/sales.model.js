const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      sp.sale_id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales_products AS sp
    INNER JOIN products AS p
    ON sp.product_id = p.id
    INNER JOIN sales AS s
    ON sp.sale_id = s.id
    ORDER BY sale_id, product_id`,
  );
  return result;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ?
    ORDER BY sale_id, product_id`,
    [saleId],
  );
  return result;
};

const createSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (DATE(NOW()))',
  );
  return insertId;
};

const createSale = async (insertId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?)',
    [insertId, productId, quantity],
  );
  return {
    productId, 
    quantity,
  };
};

const deleteSale = async (sale) => connection.execute(
  'DELETE FROM sales WHERE id = ?',
  [sale],
);

const findProductInSale = async (saleId, productId) => {
  const [result] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity,
      sp.sale_id AS saleId
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id
    WHERE sp.sale_id = ? AND product_id = ?`,
    [saleId, productId],
  );
  return result;
};

const updateSale = async (saleId, productId, quantity) => connection.execute(
  'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
  [quantity, saleId, productId],
);

module.exports = {
  findAll,
  findById,
  createSaleId,
  createSale,
  deleteSale,
  findProductInSale,
  updateSale,
};