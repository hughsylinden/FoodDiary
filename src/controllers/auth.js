const { User } = require('../models');

async function signUp(req, res) {
  User
  .create({
    username: req.body.username,
    password: req.body.password,
  })
  .then((user) => {
    res.status(201).send({
      id: user.id,
      username: user.username,
    });      
  })
  .catch((err) => {
    console.log(err)
    if(err.name==='SequelizeUniqueConstraintError'){    
      res.status(500).json({ name: 'Something failed!' })

    }else{
      res.status(500).send({ name: 'Something failed!' })

    }
  });
}

async function signIn(req, res, next) {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        console.log("asd")
        res.status(400).json({message: 'Could not find user.'})
      }else if(user.password===req.body.password){
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
        })
      }
      else {
        res.status(404).send({error:"username or password incorrect"})
      }
    })
    .catch(error => next(error))
  }

module.exports = { signIn, signUp };