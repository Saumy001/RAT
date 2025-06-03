const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');

const server = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const SECRET_KEY = 'your_mock_secret';

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Add mock login route
server.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'admin123') {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { email, role: 'ROLE_ADMIN' } });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// Add get user route
server.get('/api/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ email: decoded.email, role: 'ROLE_ADMIN' });
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
});

// Mount JSON Server
server.use('/api', router);

server.listen(5000, () => {
  console.log('Mock API Server running at http://localhost:5000');
});
