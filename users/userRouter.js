const express = require('express');

const router = express.Router();

const db = require('./userDb')
const postdb = require("../posts/postDb")

router.post('/', (req, res) => {
       db.insert(req.body)
       .then(post => {
            res.status(201).json(post)
       })
       .catch(error => {
           res.status(500).json({ error: "There was an error while saving the post to the database"})
       })
  })
//checked
  router.post('/:id/posts', (req, res) => {
    // do your magic!
    const id = req.params.id
    let post = {
      user_id: id,
      text: req.body.text,
    }
    postdb.insert(post)
    .then(post => {
        res.status(201).json(post)
    }).catch(error=>{
        console.log(error)
        res.status(500).json({errormessage: 'error getting data'})
    })
  });
  
//checked
router.get('/', (req,res) => {
  db.get()
  .then(users =>{
      res.status(200).json({users: users})
  })
  .catch(error => {
      res.status(500).json({ error: "The users information could not be retrieved."  })
  });
})
//checked
router.get('/:id', (req, res) => {
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
//checked
router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.params.id)
        .then(posts =>{
           if(posts.length==0){
               res.status(404).json({message: "The posts with the specified ID does not exist." })
            }else{
                res.status(200).json(posts);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});
//cheked
router.delete('/:id', (req, res) => {
  // do your magic!
   //finds post
   db.getById(req.params.id)
   .then(post =>{
       //removes post
       db.remove(req.params.id)
       .then(removePost =>{
               //if the post was deleted 
               res.status(200).json(post);
       })
       .catch(error =>{
           res.status(500).json({ error: "The comments information could not be retrieved." })
       })
   })
   .catch(error => {
       res.status(404).json({message: "The post with the specified ID does not exist." })
   })
});
//not working in postman
router.put("/:id", (req, res) => {
    
  const id = req.params.id;
  if (!req.params.id) {
      res.status(404).json({message: "The post with the specificed ID does not exist."})
      if (req.body.title !== "" || req.body.contents !== "") {
          res.status(400).json({errorMessage: "Please provide title and contents for the post."})
      }
  }
  db.update(req.params.id, req.body)
  .then((id) => {
      db.findById(req.params.id)
      .then(post => {
          res.status(200).json(post)
      })
      .catch(error => {res.status(500).json({ error: "The post information could not be modified."});});
  })
  .catch(error => {res.status(500).json({ error: "The post information could not be modified."});});
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
