var express         = require('express'),
	path            = require('path'), // модуль для парсинга пути
	logger			= require('morgan'),
	bodyParser		= require('body-parser'),
	methodOverride  = require('method-override'),
	log             = require('./lib/log')(module),
	config          = require('./lib/config'),
	PlayerModel    = require('./lib/mongoose').PlayerModel;

var app = express();

app.use(logger('dev')); // выводим все запросы со статусами в консоль
app.use(bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(methodOverride()); // поддержка put и delete

app.use(express.static(path.join(__dirname, "public"))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

app.get('/api', function (req, res) {
    res.send('API is running');
});

function getPlayerInfo(name) {
    
}

app.post('/game/command', function(req, res) {
    console.log("Command from client: " + req.body.command);
    
    var command = req.body.command;

    switch (command) {
        case "info":
            PlayerModel.find({name : req.body.name}, function (err, article) {
            if(!article) {
                return res.send({ error: 'Unknow user' });
            }
            if (!err) {
                return res.send({ status: 'OK', article:article });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
        break;

        case "createPlayer" : {
            var player = new PlayerModel({
                name: req.body.name
            });

            player.save(function (err) {
                if (!err) {
                    log.info("Player created");
                    return res.send({ status: 'OK', player:player });
                }
            });
        }
        
        default:
            res.send("Unknow command");
    }

    // var action = req.body.
    // switch(req)
    // return ArticleModel.find(function (err, articles) {
    //     if (!err) {
    //         return res.send(articles);
    //     } else {
    //         res.statusCode = 500;
    //         log.error('Internal error(%d): %s',res.statusCode,err.message);
    //         return res.send({ error: 'Server error' });
    //     }
    // });
});

// app.post('/api/articles', function(req, res) {
//     var article = new ArticleModel({
//         title: req.body.title,
//         author: req.body.author,
//         description: req.body.description,
//         images: req.body.images
//     });

//     article.save(function (err) {
//         if (!err) {
//             log.info("article created");
//             return res.send({ status: 'OK', article:article });
//         } else {
//             console.log(err);
//             if(err.name == 'ValidationError') {
//                 res.statusCode = 400;
//                 res.send({ error: 'Validation error' });
//             } else {
//                 res.statusCode = 500;
//                 res.send({ error: 'Server error' });
//             }
//             log.error('Internal error(%d): %s',res.statusCode,err.message);
//         }
//     });
// });

// app.get('/api/articles/:id', function(req, res) {
//     return ArticleModel.findById(req.params.id, function (err, article) {
//         if(!article) {
//             res.statusCode = 404;
//             return res.send({ error: 'Not found' });
//         }
//         if (!err) {
//             return res.send({ status: 'OK', article:article });
//         } else {
//             res.statusCode = 500;
//             log.error('Internal error(%d): %s',res.statusCode,err.message);
//             return res.send({ error: 'Server error' });
//         }
//     });
// });

// app.put('/api/articles/:id', function (req, res){
//     return ArticleModel.findById(req.params.id, function (err, article) {
//         if(!article) {
//             res.statusCode = 404;
//             return res.send({ error: 'Not found' });
//         }

//         article.title = req.body.title;
//         article.description = req.body.description;
//         article.author = req.body.author;
//         article.images = req.body.images;
//         return article.save(function (err) {
//             if (!err) {
//                 log.info("article updated");
//                 return res.send({ status: 'OK', article:article });
//             } else {
//                 if(err.name == 'ValidationError') {
//                     res.statusCode = 400;
//                     res.send({ error: 'Validation error' });
//                 } else {
//                     res.statusCode = 500;
//                     res.send({ error: 'Server error' });
//                 }
//                 log.error('Internal error(%d): %s',res.statusCode,err.message);
//             }
//         });
//     });
// });

// app.delete('/api/articles/:id', function (req, res){
//     return ArticleModel.findById(req.params.id, function (err, article) {
//         if(!article) {
//             res.statusCode = 404;
//             return res.send({ error: 'Not found' });
//         }
//         return article.remove(function (err) {
//             if (!err) {
//                 log.info("article removed");
//                 return res.send({ status: 'OK' });
//             } else {
//                 res.statusCode = 500;
//                 log.error('Internal error(%d): %s',res.statusCode,err.message);
//                 return res.send({ error: 'Server error' });
//             }
//         });
//     });
// });

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: '404' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', function(req, res, next){
    next(new Error('Random error!'));
});

app.listen(config.get('port'), function(){
    log.info('Express server listening on port  http://localhost:' + config.get('port'));
});