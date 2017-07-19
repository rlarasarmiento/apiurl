const Sequelize = require('sequelize');
const URL = require('./models.js');

const sequelize = new Sequelize('url_db', 'root', null, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
});

const URL_DB = [];

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', err);
  });


module.exports.addNewUrl = (req, res) => {
  const short = Math.random().toString(36).substring(2, 7);
  URL(sequelize, Sequelize.DataTypes).count().then((c) => {
    URL(sequelize, Sequelize.DataTypes).findOrCreate({
      where: { longURL: req.body.url },
      defaults: { URL_id: `${c + 1}`, shortURL: short },
    }).spread((url, created) => {
      if (created) {
        res.status(201).send(url.dataValues);
      } else {
        res.status(304).send(url);
      }
    });
  });
};

module.exports.getUrls = (req, res) => {
  res.status(200);
  res.send(URL_DB);
};
