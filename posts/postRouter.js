const express = require('express');
const router = express.Router();
const db = require('./postDb')

//checked and check 2
router.get('/', (req, res) => {
  db.get()
  .then(posts =>{
      res.status(200).json({posts: posts})
  })
  .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved."  })
  });
});
//checked
router.get('/:id',postId, (req, res) => {
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
router.delete('/:id', postId, (req, res) => {
  db.remove(req.params.id)
  .then(post => {
      if (post) {
          res.status(200).json(`succesfully deleted post ${req.params.id}`);
      } else {
          res.status(404).json({error: "The post with the specified ID does not exist."})
      }
  })
});

//check
router.put('/:id', postId, (req, res) => {
    db.update(req.params.id, {text: req.body.text},)
    .then(post => {
          res.status(200).json(post)
    }).catch(error => {
      console.log(error)
        res.status(500).json({ error: 'The post information could not be modified' })
    })
  });

// custom middle
function postId(req, res, next){
  let emptyArray = []
  let id = req.params.id
  db.get()
  .then(posts => {
    posts.forEach(post => {
      emptyArray.push(post.id)
    })
    function validatePostId(id, emptyArray){
      const found = (emptyArray.find(postid=> postid == id
        ))
      if (found){
        console.log(`MATCHES!: ${id}`)
      } else {
        console.log(`DOES NOT MATCH!: ${id}` )
      }
    }
    validatePostId(id, emptyArray)
    next()
  })
  .catch(error => {
   console.log(error);
  })
}
module.exports = router;
