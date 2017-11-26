const express = require('express');
const morgan = require('morgan');

const app = express();

const uuid = require('uuid');

const blogPosts = require('./blog-posts');

// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//Route requests to /blog-posts to blogPosts
app.use('/blog-posts', blogPosts);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 3000}`);
});
