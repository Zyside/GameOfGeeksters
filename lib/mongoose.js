var mongoose    = require('mongoose');
var log         = require('./log')(module);
var config      = require('./config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
var Player = new Schema({
    name: { type: String, required: true, default: "Denis" },
    level: { type: String, required: true, default: 0 },
    hp: { type: String, required: true, default : 100 },
    sp: { type: String, required: true, default : 100 }
});

// // validation
// Article.path('title').validate(function (v) {
//     return v.length > 5 && v.length < 70;
// });

var PlayerModel = mongoose.model('Player', Player);

module.exports.PlayerModel = PlayerModel;
