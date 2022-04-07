let express = require('express');
let Router = express();
let IndexController = require("../controllers/indexController.js")


Router.get('/comments', IndexController.GetAllComments);
Router.get('/post', IndexController.GetAllPost);
Router.get('/post/(:id)', IndexController.GetOnePost);
Router.get('/topPost',IndexController.GetTopPost)
Router.get('/searchComments',IndexController.GetSearchComment)

module.exports = Router;