var Q = require('q');
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
    var user = res.body.user;
    var height = req.body.height;
    var weight = req.body.weight;
    findStat({height: height})
    .then(function(match) {
      if (match) {
        res.send(match);
      } else {
        var newStat = {
          weight: weight,
          height: height
        };
        return createStat(newStat);
      }
    }).then(function(createdStat) {
      if (createdStat) {
        res.json(createdStat);
      }
    }).fail(function(error) {
      next(error);
    });
  }
};
