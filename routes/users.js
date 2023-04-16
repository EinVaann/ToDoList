const express = require("express");
const Account = require("../model/Account");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const userInfo = await Account.find();
    return res.status(200).json({
      userInfo,
    });
  } catch (error) {
    next(err);
    return res.status(500).json({  
      message: "Error: " + error 
    });
  }
});

module.exports = router
