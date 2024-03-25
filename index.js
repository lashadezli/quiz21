const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let posts = [
  {
    id: 1,
    title: 'First Post',
    content: 'This is the content of the first post.',
    author: 'John Doe',
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the content of the second post.',
    author: 'Jane Doe',
  },
];

// GET all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET a specific post by ID
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  if (!foundPost) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(foundPost);
});

// POST a new post
app.post('/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  posts.push(newPost);
  res.json(newPost);
});

// PUT  a post by ID
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPost = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  posts[index] = updatedPost;
  res.json(updatedPost);
});

// DELETE a post by ID
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  posts.splice(index, 1);
  res.sendStatus(200);
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
