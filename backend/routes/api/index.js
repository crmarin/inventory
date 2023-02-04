import express from 'express';

import auth from './auth.js';
import users from './users.js';
import company from './company.js';
import articles from './articles.js';

const app = express();

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/companies', company);
app.use('/api/articles', articles);

export default app;
