const express = require('express');

const server = express();

server.use(express.json());


const userRouter = require('./users/userRouter.js')

const postRouter = require('./posts/postRouter.js')

server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)


const port = 8000

server.listen(port, () => console.log(`\n == Server listening on port ${port} == \n`))