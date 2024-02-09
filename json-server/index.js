const fs = require('fs');
const jsonServer = require('json-server');
// const jwt = require('jsonwebtoken');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

// imitation backend
server.use(async (req, res, next) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });
  next();
});

// check auth
// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }
  next();
});

server.use(jsonServer.defaults());
server.use(router);

// login endpoint
server.post('login', (req, res) => {
  const { username, password } = req.body;
  const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
  const { users = [] } = db;

  const userFromBd = users.find((u) => u.username === username && u.password === password);

  if (userFromBd) {
    return res.jsonp(userFromBd);
  }

  return res.status(403).json({ message: 'AUTH ERROR' });
});

// server start
server.listen(8000, () => {
  console.log('JSON Server is running');
});
