const express = require('express');
const { productsRouter } = require('./routers');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(express.json());

app.use('/products', productsRouter);

app.get('/healthCheck', (req, res) => {
  res.status(200).json({ message: 'API no ar!!' });
});

module.exports = app;
