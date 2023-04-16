const express = require("express");
const Categories = require("../model/Categories");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const categoriesInfo = await Categories.find();
    return res.status(200).json({
      categoriesInfo,
    });
  } catch (error) {
    next(err);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
});

router.post("/create", async function(req,res,next){
    const{
        category_name,
        number_of_field,
        field_types,
        widget_types
    } = req.body;
    // Validate
    if( !category_name || !number_of_field || !field_types || !widget_types){
        return res.status(400).json({
            message: 'Missing information'
        })
    }
    var fields_len = Object.keys(field_types).length;
    var widgets_len = Object.keys(widget_types).length
    if( number_of_field!= fields_len || number_of_field != widgets_len){
        return res.status(400).json({
            message: 'Number of fields mismatched.'
        })
    }

    const new_categories = new Categories({
        category_name,
        number_of_field,
        field_types,
        widget_types
    })
    await new_categories.save();

    return res.status(200).json({
        new_categories,
    })

})

module.exports = router;
