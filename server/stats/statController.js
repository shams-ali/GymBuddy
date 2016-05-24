var Q = require('q');
var jwt = require('jwt-simple');
var Stat = require('./statModel.js');

//promisify
var findStat = Q.nbind(Stat.findOne, Stat);
var createStat = Q.nbind(Stat.create, Stat);
var findAllStats = Q.nbind(Stat.find, Stat);

module.exports = {
  allStats: function (req, res, next) {
    findAllStats({})
      .then(function (stats) {
        res.json(stats);
      })
      .fail(function (error) {
        next(error);
      });
  },
  newStat: function (req, res, next) {
    console.log('this is token ins newStat: ', req.body.token);
    var token = req.body.token;
    var user = jwt.decode(token, 'secret').username;
    console.log('this is user in newStat: ', user);
    var height = req.body.height;
    var weight = req.body.weight;
    findStat({user: user})
    .then(function(match) {
      if (match) {
        console.log('match in findstat');
        res.send(match);
      } else {
        var newStat = {
          user: user,
          weight: weight,
          height: height
        };
        console.log('creating newStat');
        return createStat(newStat);
      }
    })
    .then(function(createdStat) {
      if (createdStat) {
        console.log('created newStat');
        res.json(createdStat);
      }
    })
    .fail(function(error) {
      next(error);
    });
  }
};
