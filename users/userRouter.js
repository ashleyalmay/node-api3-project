const express = require('express');
const router = express.Router();
const db = require('./userDb')
const postdb = require("../posts/postDb")

//checked and check 2
router.post('/',validateUser, (req, res) => {
       db.insert(req.body)
       .then(post => {
            res.status(201).json(post)
       })
       .catch(error => {
           res.status(500).json({ error: "There was an error while saving the post to the database"})
       })
  })

//checked
  router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
    postdb.insert ({user_id: req.params.id, text: req.body.text})
    .then(post => {
        res.status(201).json(post)
    }).catch(error=>{
        res.status(500).json({errormessage: 'error getting data'})
    })
  });
  
//checked and check 2
router.get('/',(req,res) => {
  db.get()
  .then(users =>{
      res.status(200).json({users: users})
  })
  .catch(error => {
      res.status(500).json({ error: "The users information could not be retrieved."  })
  });
})
//checked and check 2
router.get('/:id',validateUserId, (req, res) => {
  db.getById(req.params.id)
      .then(users =>{
        if(users.length==0){
            res.status(404).json({message: "The user with the specified ID does not exist." })
         }else{
             res.status(200).json(users);
         }
     })
     .catch(error => {
         res.status(500).json({ error: "The posts information could not be retrieved." })
     })
});
//checked 1 and check 2
router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
        .then(posts =>{
                res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});
//cheked 1 and check 2
router.delete('/:id', validateUserId, validateUser, (req, res) => {
  db.remove(req.params.id)
  .then(res.status(200).json({message: 'User was deleted!'}))
});

//check 1 and check 2 
router.put('/:id', validateUserId, validateUser, (req, res) => {

  db.update(req.params.id, {name: req.body.name},)
  .then(post => {
        res.status(200).json(post)
  }).catch(error => {
      res.status(500).json({ error: 'The post information could not be modified' })
  })
});

// custom middleware
function validateUserId(req, res, next) {
  id = req.params.id
  let emptyArray = []
  db.get()
  .then(response => {
    response.map(user => {
      emptyArray.push(Number(user.id))
    })
    
    if (!emptyArray.includes(Number(id))) {
      res.status(404).json({message: "user with this id does not exist"})
    } else {
      next()
    }
  })
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({message: 'missing post data'})
  } else if (!req.body.name) {
    res.status(400).json({message: 'missing required name field'}).end()
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body){
      res.status(400).json({errorMessage: "error getting body!."})
  } else if(!req.body.text){
      res.status(400).json({errorMessage: "Please provide text/name for the comment."})
  } else {
    next()
  }
}
module.exports = router;
