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
    comments: [
      { id: 1, text: 'Great post!' },
    ]
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the content of the second post.',
    author: 'Jane Doe',
    comments: [
      { id: 1, text: 'Interesting topic!' },
    ]
  },
];




// GET all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});




// GET post by id
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
    comments: req.body.comments || []
  };
  posts.push(newPost);
  res.json(newPost);
});




// PUT  a post by id
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPost = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    comments: []
  };
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  posts[index] = updatedPost;
  res.json(updatedPost);
});




// DELETE a post by id
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  posts.splice(index, 1);
  res.sendStatus(200);
});







//Comment section =>


// GET  comments for  post
app.get('/posts/:id/comments', (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  if (!foundPost) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(foundPost.comments);
});





// POST a new comment to  post
app.post('/posts/:id/comments', (req, res) => {
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id);
  if (!foundPost) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const newComment = {
    id: foundPost.comments.length + 1,
    text: req.body.text,
  };
  foundPost.comments.push(newComment);
  res.json(newComment);
});






// PUT  a comment on  post
app.put('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);
  const foundPost = posts.find((post) => post.id === postId);
  if (!foundPost) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const foundComment = foundPost.comments.find((comment) => comment.id === commentId);
  if (!foundComment) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  foundComment.text = req.body.text;
  res.json(foundComment);
});








// DELETE a comment from  post
app.delete('/posts/:postId/comments/:commentId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);
  const foundPost = posts.find((post) => post.id === postId);
  if (!foundPost) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const index = foundPost.comments.findIndex((comment) => comment.id === commentId);
  if (index === -1) {
    return res.status(404).json({ error: 'Comment not found' });
  }
  foundPost.comments.splice(index, 1);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
