const connection = require('./connection');

// ? = prepared statement

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return result;
};

const createProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product],
  );
  return insertId;
};

const updateProduct = async (name, productId) => connection.execute(
  'UPDATE products SET name = ? WHERE id = ?',
  [name, productId],
);

const deleteProduct = async (product) => connection.execute(
  'DELETE FROM products WHERE id = ?',
  [product],
);

const findByName = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [`${name}%`],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
  findByName,
};