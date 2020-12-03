const express = require("express");
const router = express.Router();

const User = require("./../../models/user");
const { auth } = require("./../../middlewares/auth");

//Sign up endpoint
router.post("/register", function (req, res) {
  const newuser = new User(req.body); //Taking in user

  if (newuser.password != newuser.password2)
    return res.status(400).json({ message: "Passwords must match" });

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user)
      return res
        .status(400)
        .json({ auth: false, message: "Email already exists" });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        success: true,
        user: doc,
      });
    });
  });
});

//Login endpoint
router.post("/login", function (req, res) {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(`OH NO ${err}`);
    if (user)
      return res.status(400).json({
        error: true,
        message: "You're already logged in",
      });
    else {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user)
          return res.json({
            isAuth: false,
            message: "Auth failed, email not found",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "Password doesn't match",
            });

          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("auth", user.token).json({
              isAuth: true,
              id: user._id,
              email: user.email,
            });
          });
        });
      });
    }
  });
});

//Retrieves user if they're logged in
router.get('/profile',auth,function(req,res){
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname
        
    })
});

//Log out endpoint
router.get('/logout',auth,function(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });

}); 

module.exports = router;