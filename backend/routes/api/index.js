import express from 'express';

import users from './users.js';
import auth from './auth.js';
import order from './order.js';
import products from './products.js';

const app = express();

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/order', order);
app.use('/api/products', products);

export default app;
