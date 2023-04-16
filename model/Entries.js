const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
    category_id:{
        type:Schema.Types.ObjectId,
        ref:'Categories'
    },
    values:{
        type:Array,
        require:true
    }
})

module.exports = mongoose.model("Entries", EntrySchema);