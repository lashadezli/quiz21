// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());


// let posts = [

//     {
//         "id": 1,
//         "title": "New Post Title",
//         "content": "This is the content of the new post."
//     },
//     {
//         "id": 2,
//         "title": "New Post Title2",
//         "content": "This is the content of the new post.2"
//     }
// ]
// let postIdcounter = 1

// //Get ALL
//    app.get('/posts', (req, res) => {
//     res.json(posts);
//    })

// //get by id

// app.get('/posts/:id', (req, res) => {
//    const postId = parseInt(req.params.id)
//    const post = posts.find(post => post.id === postId);
//    res.json(post)
// })

// //post
// app.post('/posts' , (req, res) => {
//   const { title, content } = req.body
//   const newPost = {id: postIdcounter++, title, content};
//   posts.push(newPost);
//   res.status(201).json(newPost);
// })



// //put

// app.put('/posts/id' , (req, res) => {

//     const postId = parseInt(req.params.id);
//     const { title, content} = req.body;
//     const postIndex = posts.findIndex(post => post.id === postId);

//      if(postIndex === -1) {
//        res.status(404).send('Post Not FOund');
//      } else {
//         posts[postIndex] = {id: postId, title , content};
//         res.json(posts[postIndex]);
//      }
//   });


// //delete by id

// app.delete('/posts/id' , (req, res) => {
//     const postId = parseInt(req.params.id);
//     const postIndex = posts.findIndex(post => post.id === postId);

//     if(postIndex === -1) {
//         res.status(404).send('Post Not FOund');
//       } else {
//          posts.splice(postIndex, 1)
//          res.sendStatus(20)
//       }

//   });
  


// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






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
