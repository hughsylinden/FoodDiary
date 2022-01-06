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
    if(err.name==='SequelizeUniqueConstraintError'){    
      res.status(500).json({ name: 'Something failed!' })

    }else{
      console.log('asdas')
      res.status(500).send({ name: 'Something failed!' })

    }
  });
}

async function signIn(req, res) {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User Not found.' });
      }else if(user.password===req.body.password){
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
        })
      }
      else {
        res.status(404).send({message:"username or password incorrect"})
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  }

module.exports = { signIn, signUp };