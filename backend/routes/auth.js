const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

const JWT_SECRET= "boy"

//(/api/auth/createuser)

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ errors: "Email already exists." });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash("req.body.password", salt);

      user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secPass,
      });

      const data = {
        user:{
          id:user.id
        }
      }

      const authToken =jwt.sign(data, JWT_SECRET);
      console.log(authToken)

      res.json(user);
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured!");
    }
  }
);

module.exports = router;
