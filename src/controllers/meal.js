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

async function getDailyCalorieIntake(req, res) {
  const startDate = new Date(req.body.date);    
  let startOfMonthDate = new Date(startDate.getFullYear(), startDate.getMonth(),2);
  startOfMonthDate.setUTCHours(0,0,0,0);
  let endOfMonthDate = new Date(startDate.getFullYear(), startDate.getMonth()+1,1);
  endOfMonthDate.setUTCHours(23,59,59,999);
  
  Meal
    .findAll(({where : {FoodDiaryId: req.body.FoodDiaryId, time : {[Op.between] : [startDate , endOfMonthDate ]}}}))
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(() => {
      res.status(500).send();
    });
}

async function readByFoodDiaryIdAndDate(req, res) {
  const startDate = new Date(req.body.date+" 00:00:00");  
  let endDate = new Date(req.body.date);
  
  endDate.setDate(startDate.getDate()+1)
  
  Meal
    .findAll(({where : {FoodDiaryId: req.body.FoodDiaryId, time : {[Op.between] : [startDate , endDate ]}}}))
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(() => {
      res.status(500).send();
    });
}

async function readByFoodDiaryIdAndMonth(req, res) {
  const startDate = new Date(req.body.date);    
  let startOfMonthDate = new Date(startDate.getFullYear(), startDate.getMonth(),2);
  startOfMonthDate.setUTCHours(0,0,0,0);
  let endOfMonthDate = new Date(startDate.getFullYear(), startDate.getMonth()+1,1);
  endOfMonthDate.setUTCHours(23,59,59,999);
  Meal
    .findAll(({where : {FoodDiaryId: req.body.FoodDiaryId, time : {[Op.between] : [startOfMonthDate , endOfMonthDate ]}}}))
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(() => {
      res.status(500).send();
    });
}

async function getAllMealsInYear(req, res) {
  const startDate = new Date(req.body.date);    
  let startOfMonthDate = new Date(startDate.getFullYear(),0,2);
  startOfMonthDate.setUTCHours(0,0,0,0);
  let endOfMonthDate = new Date(startDate.getFullYear(),12);
  endOfMonthDate.setUTCHours(23,59,59,999);
  Meal
    .findAll(({where : {FoodDiaryId: req.body.FoodDiaryId, time : {[Op.between] : [startOfMonthDate , endOfMonthDate ]}}}))
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

module.exports = { create, read, readOne, update, destroy,readByFoodDiaryId, readByFoodDiaryIdAndDate, readByFoodDiaryIdAndMonth, getAllMealsInYear, getDailyCalorieIntake };