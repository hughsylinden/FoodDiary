const { Meal } = require('../models');
const { Op } = require('sequelize');


async function readByFoodDiaryId(req, res) {
  const foodDiaryId = req.params.FoodDiaryId
  Meal
    .findAll({where:{FoodDiaryId: foodDiaryId} })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(() => {
      res.status(500).send();
    });
}

async function readByFoodDiaryIdAndDate(req, res) {
  /* const foodDiaryId = req.body.FoodDiaryId
  const date = req.body.date */
  const startDate = new Date(`2022-01-06 00:00:00`);
  const endDate = new Date("2022-01-07 00:00:00");
  Meal
    .findAll(({where : {time : {[Op.between] : [startDate , endDate ]}}}))
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(() => {
      res.status(500).send();
    });
}

async function create(req, res) {
  const data = req.body;

  Meal
    .create(data)
    .then((obj) => res.status(201).json(obj.dataValues))
    .catch(() => {
      res.status(500).send();
    });
}

async function readOne(req, res) {
  Meal
    .findByPk(req.params.id)
    .then((obj) => {
      if (!obj) {
        res
        .status(404)
        .json({ error: `The ${Meal.name.toLowerCase()} could not be found.` })
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
  Meal.findAll().then((items) => {
    res.status(200).json(items);
  });
}

async function update(req, res) {
  Meal
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
        .json({ error: `The ${Meal.name.toLowerCase()} could not be found.` })
    );
}

async function destroy(req, res) {
  Meal
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
        .json({ error: `The ${Meal.name.toLowerCase()} could not be found.` })
    );
}

module.exports = { create, read, readOne, update, destroy,readByFoodDiaryId, readByFoodDiaryIdAndDate };