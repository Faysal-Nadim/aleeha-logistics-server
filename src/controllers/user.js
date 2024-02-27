const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//Auth Functions For User
exports.registerUser = (req, res) => {
  User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  }).exec(async (error, user) => {
    if (user) {
      return res
        .status(409)
        .json({ msg: "This Email or Phone Already Exists" });
    }
    if (error) {
      return res.status(400).json({ msg: "Bad Request!", error });
    } else {
      const { firstName, lastName, email, phone, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        phone,
        hash_password,
        shipping_mark: `A${req.shippingMark}`,
      });
      _user.save((error, user) => {
        if (user) {
          return res.status(201).json({ msg: "Signup Successful", user });
        } else if (error) {
          return res.status(400).json({ msg: "Something Went Wrong", error });
        }
      });
    }
  });
};

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error)
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    if (user) {
      if (
        user.authenticate(req.body.password) &&
        user.role === "user" &&
        user.type === "customer" &&
        user.verification.isVerified === true
      ) {
        const token = jwt.sign(
          { _id: user._id, role: user.role, type: user.type },
          process.env.JWT_SECRET,
          { expiresIn: "1y" }
        );
        const {
          firstName,
          lastName,
          fullName,
          email,
          phone,
          role,
          type,
          shipping_mark,
          wallet,
          others,
        } = user;
        return res.status(200).json({
          msg: "Login Success",
          token,
          user: {
            firstName,
            lastName,
            fullName,
            email,
            phone,
            role,
            type,
            shipping_mark,
            wallet,
            others,
          },
        });
      }
      if (
        user.authenticate(req.body.password) &&
        user.role === "user" &&
        user.type === "customer" &&
        user.verification.isVerified === false
      ) {
        return res.status(403).json({
          msg: "Please Verify Your Email To Continue!",
        });
      } else {
        return res.status(401).json({
          msg: "Invalid Credentials!",
        });
      }
    } else {
      return res.status(404).json({
        msg: "User Not Found",
      });
    }
  });
};

exports.sendVerificationCodeByEmail = (req, res) => {
  User.findOneAndUpdate(
    { email: req.query.email },
    {
      $set: {
        "verification.code": Math.floor(100000 + Math.random() * 900000),
      },
    },
    { new: true }
  ).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong" });
    }
    if (user) {
      const transporter = nodemailer.createTransport({
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
          user: "no-reply@winly.net",
          pass: `${process.env.EMAIL_PASS}`,
        },
      });

      const info = await transporter.sendMail({
        from: "Winly LLC.<no-reply@winly.net>",
        to: `${req.query.email}`,
        subject: "Verification Code From Winly",
        html: `Your verification code is ${user.verification.code}`,
      });
      if (info.messageId !== null && info.accepted.length > 0) {
        return res
          .status(200)
          .json({ msg: "A Verification Code Has Been Sent To Your Email." });
      } else {
        return res
          .status(400)
          .json({ msg: "An Error Occurred, Please Try Again Later." });
      }
    }
  });
};
