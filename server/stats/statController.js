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

  }
};
