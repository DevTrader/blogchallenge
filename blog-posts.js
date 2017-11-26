const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const uuid = require('uuid');

const {BlogPosts} = require('./models');

//Created Blog Posts:
BlogPosts.create('Hello World!', 'This is my first blog post, welcome to my blog!', 'Nicolas Kao', '11/26/2017');


//send back JSON representation of all posts

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {

  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);
});

// Delete Blog Posts (by id)!
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted Blog Post \`${req.params.ID}\``);
  res.status(204).end();
});


router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id ${req.params.id} and request body id `
      `${req.body.id} must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
	  id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate || Date.now()
  });
  res.status(204).end();
})

module.exports = router;