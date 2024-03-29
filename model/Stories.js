const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    name:{
        type:String,
        require: true
    },
    cover:{
        type:String,
        requrie: true
    },
    ongoing:{
        type: Boolean,
        require: true
    },
    chapter:{
        type: Number,
        require: true,
    },
    readAt:{
        type:Number,
        require: true
    },
    lastVisit:{
        type:String,
        require: true
    },
    otherNames:{
        type:Array,
        require:false
    },
    lastEdited:{
        type:Date,
        require: true,
    },
    rating:{
        type:Number,
        require: true,
    }
})

module.exports = mongoose.model("Story", StorySchema);