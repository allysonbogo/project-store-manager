const express = require('express');
const { productsRouter, salesRouter } = require('./routers');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(express.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.get('/healthCheck', (req, res) => {
  res.status(200).json({ message: 'API no ar!!' });
});

module.exports = app;