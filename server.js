const express = require('express');

const morgan = require('morgan');

// const userRouter = require('./users/userRouter.js')

// const postRouter = require('./posts/postRouter.js')

//3rd party middleware
const server = express();

const helmet = require('helmet');

//built in middleware
server.use(express.json());

//3rd party middleware
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);
// server.use('/api/posts', postRouter)
// server.use('/api/users', userRouter)

// server.get('/', (req, res) => {
//   res.send(<h2>Let's write some middleware!</h2>);
// });
server.get("/", function (req, res) {
  res.status(200).json({ environment: process.env.NODE_ENV, port: process.env.PORT });
});

//custom middleware



function logger(req, res, next) {
  console.log(req.method)
  console.log(req.url)
  console.log(Date.now())
}

module.exports = server;