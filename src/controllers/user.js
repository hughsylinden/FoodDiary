const { User } = require('../models');

async function create(req, res) {
  const data = req.body;
  User
    .create(data)
    .then((obj) => res.status(201).json(obj.dataValues))
    .catch(() => {
      res.status(500).send();
    });
}

async function readOne(req, res) {
  User
    .findByPk(req.params.id)
    .then((obj) => {
      if (!obj) {
        res
        .status(404)
        .json({ error: `The ${User.name.toLowerCase()} could not be found.` })
      } else {
        res.status(200).json(obj.dataValues);
      }
    })
    .catch((error) =>
      res
        .status(500)
        .json(error)
    );
}
async function read(req, res) {
  User.findAll().then((items) => {
    res.status(200).json(items);
  });
}

async function update(req, res) {
  User
    .update(req.body, { where: { id: req.params.id } })
    .then((updatedRows) => {
      if (updatedRows == 0) {
        throw Error;
      } else {
        res.status(200).json(`Number of updated rows: ${updatedRows}`);
      }
    })
    .catch(() =>
      res
        .status(404)
        .json({ error: `The ${User.name.toLowerCase()} could not be found.` })
    );
}

async function destroy(req, res) {
  User
    .destroy({ where: { id: req.params.id } })
    .then((deletedRows) => {
      if (!deletedRows) {
        throw Error;
      } else {
        res.status(204).json(`Number of deleted rows: ${deletedRows}`);
      }
    })
    .catch(() =>
      res
        .status(404)
        .json({ error: `The ${User.name.toLowerCase()} could not be found.` })
    );
}

module.exports = { create, read, readOne, update, destroy };