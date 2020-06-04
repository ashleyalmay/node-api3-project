const express = require('express');
const server = express();
server.use(express.json());
require("dotenv").config();

const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')
const baserouter = require('./server.js')
server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)
server.use('/', baserouter)
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});