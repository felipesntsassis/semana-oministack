const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        posts = await Post.find().sort('-createdAt');
        return res.json(posts);
    },

    async store(req, res) {
        const post = await Post.findById(req.params.id);
        
        post.likes += 1;

        await post.save();

        req.io.emit('like', post);
        
        return res.json(post);
    }
};