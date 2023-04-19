const express = require("express");
const Story = require("../model/Stories");
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const storiesInfo = await Story.find();
    return res.status(200).json({
      storiesInfo,
    });
  } catch (error) {
    next(err);
    return res.status(500).json({
      message: "Error: " + error,
    });
  }
});
router.post("/create", async function (req, res, next) {
  try {
    const {
      name,
      cover,
      ongoing,
      chapter,
      readAt,
      lastVisit,
      synopsis,
      otherNames,
    } = req.body;

    // Validate
    // Null values
    if (
      !name ||
      !cover ||
      !ongoing ||
      !chapter ||
      !readAt ||
      !lastVisit ||
      !synopsis
    ) {
      return res.status(400).json({
        Message: "Missing information.",
      });
    }
    const newStory = new Story({
      name,
      cover,
      ongoing,
      chapter,
      readAt,
      lastVisit,
      synopsis,
      otherNames,
    });
    await newStory.save();
    return res.status(200).json({
      newStory,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});

router.delete("/delete", async function (req, res, next) {
  try {
    const deleting_story_id = req.query.id;
    const deletingStory = await Story.findByIdAndRemove(deleting_story_id);
    return res.status(200).json({
      deletedstory: deletingStory,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});
router.put("/edit", async function (req, res, next) {
  try {
    const {
      name,
      cover,
      ongoing,
      chapter,
      readAt,
      lastVisit,
      synopsis,
      otherNames,
    } = req.body;
    const editing_stories_id = req.query.id;

    // Check existing story
    const editing_story = await Story.findById(editing_stories_id);
    if (!editing_story) {
      return res.status(400).json({
        Message: "Story is not existed!",
      });
    }

    // Validate
    // Null values
    if (
      !name ||
      !cover ||
      !ongoing ||
      !chapter ||
      !readAt ||
      !lastVisit ||
      !synopsis
    ) {
      return res.status(400).json({
        Message: "Missing information.",
      });
    }

    // Edit story
    const newStory = {
      name,
      cover,
      ongoing,
      chapter,
      readAt,
      lastVisit,
      synopsis,
      otherNames,
    };
    const updatedStories = await Story.findByIdAndUpdate(
      editing_stories_id,
      newStory,
      { new: true }
    );

    return res.status(200).json({
      updatedStories,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});

router.get("/get", async function (req, res, next) {
  try {
    const id = req.query.id;
    const story = await Story.findById(id);
    return res.status(200).json({
        story
    })
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});

router.get("/search", async function (req, res, next) {
  try {
    const search_promt = req.query.search;
    console.log(search_promt);
    const matchedStories = await Story.find({
      $or: [
        { name: { $regex: search_promt, $options: "i" } },
        { otherNames: { $regex: search_promt, $options: "i" } },
      ],
    });
    return res.status(200).json({
      numberOfMatches: matchedStories.length,
      matchedStories,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "" + error,
    });
  }
});
module.exports = router;
