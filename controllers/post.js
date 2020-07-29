const Post = require("../models/post");

function addPost(req, res) {
    const body = req.body;
    const post = new Post(body);

    // To save posts
    post.save((err, postStored) => {
        if (err) {
            res
                .status(500)
                .send({ code: 500, message: "Error del Servidor. Post.js" });
        } else {
            if (!postStored) {
                res
                    .status(400)
                    .send({ code: 400, message: "No se ha podido crear el post" })
            } else {
                res
                    .status(200)
                    .send({ code: 200, message: "Post creado correctamente" })
            }
        }
    });
}

function getPosts(req, res) {
    /*Query refers to params in the url for example "?page=1&limit=10"
    You must define a value for page and limit, so it doesnt turn "undefined" by default
    */
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: page,
        // If we don't use parseInt it will take it as a String
        limit: parseInt(limit),
        sort: { date: "desc" }
    };

    Post.paginate({}, options, (err, postsStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor" })
        } else {
            if (!postsStored) {
                res.status(404).send({ code: 404, message: "No se ha encontrado ninguuuuuun post" })
            } else {
                res.status(200).send({ code: 200, posts: postsStored })
            }
        }
    });
}

function updatePost(req, res) {
    const postData = req.body;
    const { id } = req.params;

    Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del Servidor." })
        } else {
            if (!postUpdate) {
                res
                    .status(404)
                    .send({ code: 404, message: "No se ha encontrado el curso" })
            } else {
                res
                    .status(200)
                    .send({ code: 200, message: "Post actualizado correctamente." })
            }
        }
    })
}

function deletePost(req, res) {
    // get Id from params
    const { id } = req.params;

    Post.findByIdAndRemove(id, (err, postDeleted) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor" })
        } else {
            if (!postDeleted) {
                res.status(404).send({ code: 404, message: "Post no encontrado" })
            } else {
                res.status(200).send({ code: 200, message: "El post ha sido eliminado correctamente." })
            }
        }
    })
}

// To obtain the info of one specific post0
function getPost(req, res) {
    const { url } = req.params;

    // this {url} is the same as saying {url: url}
    Post.findOne({ url }, (err, postStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor" })
        } else {
            if (!postStored) {
                res.status(404).send({ code: 404, message: "NO SE HA ENCONTRADO ningun post!" })
            } else {
                res.status(200).send({ code: 200, post: postStored });
            }
        }
    })
}


module.exports = {
    addPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
}