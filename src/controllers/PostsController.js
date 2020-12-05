const PostsController = {};

// Models
const Post = require('../models/Post');

PostsController.renderPostForm = (req, res) => {
    res.render('posts/new-post');
};

PostsController.createNewPost = async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Please write a title' });
    }
    if (!description) {
        errors.push({ text: 'Please write a description' });
    }
    if (errors.length > 0) {
        // Si hay algun error se pasa las variables para que no repita los datos de nuevo
        res.render('posts/new-post', {
            errors,
            title,
            description
        });
    } else {
        const newPost = new Post({ title, description });
        // Enlaza el id del user con el post y lo guarda en el objeto newPost como propiedad user
        newPost.user = req.user.id;
        await newPost.save();
        req.flash('success_msg', 'Post added successfully');
        res.redirect('/posts');
    }
};

PostsController.renderAllPosts = async (req, res) => {
    // Cuando busque las nota solo traera al que pertenece al user.id de la session autenticado
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: 'desc' });
    res.render('posts/all-posts', { posts });
};

PostsController.renderEditPost = async (req, res) => {
    // Obtiene el id de la nota que se va a editar
    const post = await Post.findById(req.params.id);
    if (post.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/posts");
      }
    res.render('posts/edit-post', { post });
};

PostsController.updatePost = async (req, res) => {
    const { title, description } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Post updated successfully');
    res.redirect('/posts');
};

PostsController.deletePost = async (req, res) => {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    req.flash('success_msg', 'Post deleted successfully');
    res.redirect('/posts');
};

module.exports = PostsController;