const { Router } = require('express');
const router = Router();

const PostsController = require('../controllers/PostsController');
// Para proteger las rutas de la web
const { isAuthenticated } = require('../helpers/auth');

// New Post
router.get('/posts/add', isAuthenticated, PostsController.renderPostForm);
router.post('/posts/new-post', isAuthenticated, PostsController.createNewPost);
// Get All Post
router.get('/posts', isAuthenticated, PostsController.renderAllPosts);
// Edit Post
router.get('/posts/edit/:id', isAuthenticated, PostsController.renderEditPost);
router.put('/posts/edit-post/:id', isAuthenticated, PostsController.updatePost);
// Delete Post
router.delete('/posts/delete/:id', isAuthenticated, PostsController.deletePost);


module.exports = router;