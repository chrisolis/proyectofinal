
const express = require('express');
const router = express.Router();
//const Task = require('../model/task');
const Post = require('../model/post');

router.get('/', async function(req,res){
  let postes = await Post.find()
  console.log(postes)
  res.render('index', {postes})
});

router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async (req,res) =>{
  let post = new Post(req.body)
  console.log(post)
  await post.save()
  res.redirect('/')
});


//edit
router.get('/edit/:id',   async(req,res) =>{
  let id = req.params.id
  let post = await Post.findById(id)
  res.render('edit', {post})
})

router.post('/edit/:id',   async(req,res) =>{
  await Post.updateOne({_id:req.params.id},req.body)
  res.redirect('/')
})


//delete
router.get('/delete/:id',   async(req,res) =>{
  let id = req.params.id
  let post = await Post.findById(id)
  res.render('delete', {post})
})

router.post('/delete/:id',   async(req,res) =>{
  let id = req.params.id
  await Post.remove({_id:id})
  res.redirect('/')
})


module.exports = router;