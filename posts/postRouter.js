const express = require('express');

const router = express.Router();

const db = require('./postDb')
//checked
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
  // do your magic!
  db.getById(req.params.id)
      .then(post =>{
        if(post.length==0){
            res.status(404).json({message: "The post with the specified ID does not exist." })
         }else{
             res.status(200).json(post);
         }
     })
     .catch(error => {
         res.status(500).json({ error: "The posts information could not be retrieved." })
     })
});
//checked
router.delete('/:id',postId, (req, res) => {
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
           res.status(500).json({ error: "The post information could not be retrieved." })
       })
   })
   .catch(error => {
       res.status(404).json({message: "The post with the specified ID does not exist." })
   })
});
//not working in postman
router.put('/:id',postId, (req, res) => {
  const id = req.params.id;
  if (!req.params.id) {
      res.status(404).json({message: "The post with the specificed ID does not exist."})
      if (req.body.title !== "" || req.body.contents !== "") {
          res.status(400).json({errorMessage: "Please provide title and contents for the post."})
      }
  }
  db.update(req.params.id, req.body)
  .then((id) => {
      db.getbyId(req.params.id)
      .then(post => {
          res.status(200).json(post)
      })
      .catch(error => {res.status(500).json({ error: "The post information could not be modified."});});
  })
  .catch(error => {res.status(500).json({ error: "The post information could not be modified."});});
});

// custom middleware
function postId(req, res, next){
  let emptyArray = []
  let id = req.params.id
  db.get()
  .then(posts => {
    posts.map(post => {
      emptyArray.push(post.id)
    })
    function validatePostId(id, emptyArray){
      if (emptyArray.find(id)){
        console.log(`MATCHES!: ${id}`)
      } else {
        console.log(`DOES NOT MATCH!: ${id}` )
      }
    }
    validatePostId(id, emptyArray)
    next()
  })
}
module.exports = router;
