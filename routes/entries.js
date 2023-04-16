const express = require("express");
const Entries = require("../model/Entries");
const Categories = require("../model/Categories");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const entriesInfo = await Entries.find();
    return res.status(200).json({
      entriesInfo,
    });
  } catch (error) {
    next(err);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
});
//edit entries
router.put("/edit", async function (req, res, next) {
  try {
    const { category_id, values } = req.body;
    const editing_entries_id = req.query.entry_id;

    // Check existing entry
    const editing_entry = await Entries.findById(editing_entries_id);
    if (!editing_entry) {
      return res.status(400).json({
        Message: "Entry is not existed!",
      });
    }

    // Validate
    // Null values
    if (!category_id || !values) {
      return res.status(400).json({
        Message: "Missing information.",
      });
    }
    // Category is existed
    const category = await Categories.findById(category_id);
    if (!category) {
      return res.status(400).json({
        Message: "Category is not existed!",
      });
    }
    // Same number of fields
    const number_of_field = Object.keys(values).length;
    console.log(number_of_field);
    console.log(category);
    if (number_of_field != category.number_of_field) {
      return res.status(400).json({
        Message: "Number of fields mismatched!",
      });
    }

    // Edit Entry
    const newEntries = {
      category_id,
      values,
    };
    const updatedEntries = await Entries.findByIdAndUpdate(
      editing_entries_id,
      newEntries,
      { new: true }
    );

    return res.status(200).json({
      updatedEntries,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});

router.get("/category", async function (req, res, next) {
  try {
    const category_id = req.query.category_id;
    // check category validity
    const category = await Categories.findById(category_id);
    if (!category) {
      return res.status(400).json({
        Message: "Category is existed!",
      });
    }
    const entriesInCategory = await Entries.find({ category_id: category_id });
    return res.status(200).json({
      category_name: category.category_name,
      entriesInCategory,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});

//Edit Entries
router.post("/create", async function (req, res, next) {
  try {
    const { category_id, values } = req.body;

    // Validate
    // Null values
    if (!category_id || !values) {
      return res.status(400).json({
        Message: "Missing information.",
      });
    }
    // Category is existed
    const category = await Categories.findById(category_id);
    if (!category) {
      return res.status(400).json({
        Message: "Category is not existed!",
      });
    }
    // Same number of fields
    const number_of_field = Object.keys(values).length;
    console.log(number_of_field);
    console.log(category);
    if (number_of_field != category.number_of_field) {
      return res.status(400).json({
        Message: "Number of fields mismatched!",
      });
    }
    const newEntries = new Entries({
      category_id,
      values,
    });
    await newEntries.save();
    return res.status(200).json({
      newEntries,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});

router.delete("/delete", async function (req, res, next) {
  try {
    const deleting_entry_id = req.query.entry_id;
    const deletingEntry = await Entries.findByIdAndRemove(deleting_entry_id);
    return res.status(200).json({
      deletedEntry: deletingEntry,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});

module.exports = router;
