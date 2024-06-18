const express = require('express');
const router = express.Router();
const models = require("../models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = models.User;


router.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ where: { emailAddress: email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    
    const token = jwt.sign({ 
      id: user.userid, 
      email: user.emailAddress, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      accountType: user.accountType 
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    sessionStorage.setItem(userToken);
    res.status(200).json({ message: 'Login successful', token });
  } catch(error) {

  }
})

//happens at sign up
router.post('/register', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//used to get list of users for admin to see
router.get('/users', async (req, res) => {
  try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})

//user can check out his own information, or the information of a superuser/professor, but not other students
router.get('/user', async (req, res) => {
    try {
        const id = req.body;
        const user = User.findAll({
          attributes: ['firstName', 'lastName', 'emailAddress', 'accountType'],
          where: {
            userid: id
          }
        })
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
})

//admin can edit information about a user
router.patch('/user/edit', async (req, res) => {
  try {
    const { firstNameInfo, lastNameInfo, emailInfo, accountTypeInfo } = req.body;
    await User.update({ 
      firstName: firstNameInfo,
      lastName: lastNameInfo,
      emailAddress: emailInfo,
      accountType: accountTypeInfo,
    }, 
  { where: { userid: userid }})
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
})

// would it be necessary/possible to delete a user from the database?
// i guess in case of an error with the email address or something
router.delete('/user/delete', async (req, res) => {
  try {
    //i want the program to fetch the id of the user that will get deleted
    const idToDelete = req.body;
    await User.destroy({
      where: {
        userid: idToDelete,
      },
    });
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router;