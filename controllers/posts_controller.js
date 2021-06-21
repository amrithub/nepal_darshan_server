const {
    getAllPosts,
    getPostById,
    addPost,
    deletePost,
    updatePost
} = require('../utils/posts_utils');

const getPosts = function (req, res) {
    // execute the query from getAllPosts
    getAllPosts(req).
    sort({
        modified_date: -1
    }).
    exec((err, posts) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.send(posts);
    });
};

const getPost = function (req, res) {
    // execute the query from getPostById
    getPostById(req).exec((err, post) => {
        if (err) {
            res.status(400);
            return res.send("Post not found");
        }
        res.send(post);
    });
};

const makePost = function (req, res) {
    //console.log('superb')
    // add the username from req.user
    if(req.user.role === 'admin'){
    //req.body.username = req.user.username;
    // save the Post instance from addPost
    
   
    addPost(req).save((err, post) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message
            });
        }
        res.status(201);
        res.send(post);
    });}
    
        
    

};

const removePost = function (req, res) {
    if(req.user.role === 'admin'){
    // Check for error from middleware
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.message);
    } else {
        // execute the query from deletePost
        deletePost(req.params.id).exec((err) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: err.message
                });
            }
            res.sendStatus(204);
        });}
    }
};

const changePost = function (req, res) {
    // Check for error from middleware
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.message);
    } else {
        // execute the query from updatePost
        updatePost(req).exec((err, post) => {
            if (err) {
                res.status(500);
                return res.json({
                    error: err.message
                });
            }
            res.status(200);
            res.send(post);
        });
    }
};

const verifyOwner = function (req, res, next) {
    // If post owner isn't currently logged in user, send forbidden
    if (req.user.role === 'admin') {
        console.log('have admin user in middleware')
        next();
    } else {
        getPostById(req).exec((err, post) => {
            if (err) {
                req.error = {
                    message: 'Post not found',
                    status: 404
                }
                next();
            }
            if (post && req.user.username !== post.username) {
                req.error = {
                    message: 'You do not have permission to modify this post',
                    status: 403
                };
            }
            next();
        });
    }
}

const validUser = function (req, res, next) {
    // If user is blocked, send back an error
    if (req.user.blocked) {
        req.error = {
            message: 'User is blocked',
            status: 403
        };
    }
    next();
}

module.exports = {
    getPosts,
    getPost,
    makePost,
    removePost,
    changePost,
    verifyOwner,
    validUser
};
