const { post } = require("request");
var request = require("request");
var requestLocal = require('request-local');
var Comments = {};
var Posts = {};


requestLocal.run(function (err, ctx) {
    request.get({
        uri: 'https://jsonplaceholder.typicode.com/comments',
    }, requestLocal.bindAll(function (err, res, body) {
        console.log("Read All Comments")
        Comments = body;
    }));
});

requestLocal.run(function (err, ctx) {
    request.get({
        uri: 'https://jsonplaceholder.typicode.com/posts',
        timeout: 900
    }, requestLocal.bindAll(function (err, res, body) {
        console.log("Read All Posts")
        Posts = body;
    }));
});


exports.GetAllComments = async function (req, res, done) {
    var options = {
        'method': 'GET',
        'url': 'https://jsonplaceholder.typicode.com/comments',
        'headers': {}
    };
    try {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            res.send(JSON.parse(response.body))
        });
    }
    catch (error) {
        console.log('Error: GetAllComments Error')
        console.log(error)
        res.status(500)
    }
};

exports.GetAllPost = async function (req, res, done) {
    var options = {
        'method': 'GET',
        'url': 'https://jsonplaceholder.typicode.com/posts',
    };

    try {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            res.send(JSON.parse(response.body))
        });
    }
    catch {
        console.log("Error GetAllPost")
        console.log(error)
        res.status(500)
    }
}

exports.GetOnePost = async function (req, res, done) {
    let paramsId = req.params.id;
    var options = {
        'method': 'GET',
        'url': 'https://jsonplaceholder.typicode.com/posts/' + paramsId,
    };
    try {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            res.send(JSON.parse(response.body))
        });
    }
    catch {
        console.log("Error GetOnePost PostId:", paramsId)
        console.log(error)
        res.status(500)
    }
}

exports.GetTopPost = async function (req, res, done) {
    const CommentsData = JSON.parse(Comments)
    const PostsData = JSON.parse(Posts)
    var Final = [];

    const result = Object.entries(CommentsData.reduce((acc, { postId, }) => {
        acc[postId] = (acc[postId] || 0) + 1;
        return acc;
    }, {})).map(([k, v]) => ({ postId: parseInt(k, 10), count: v }));

    for (const post of PostsData) {
        var items = result.filter(data => {
            return data.postId === post.id
        }).map(data => {
            var item = {}
            item.post_id = post.id;
            item.post_title = post.title;
            item.post_body = post.body;
            item.total_number_of_comments = data.count;
            return item
        })
        Final.push(items)
        console.log(Final)
    }
    res.json(Final)
}

exports.GetSearchComment = async function (req, res, done) {
    const CommentsData = JSON.parse(Comments);
    const filters = req.query;
    var results = CommentsData.filter( data => {
        let valid = true;
        for( key in filters){
            valid = valid && data[key] == filters[key]
        }
        return valid;
    })
    res.json(results)
}



