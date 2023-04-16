const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name:{
        type: String,
        require: true,
    },
    number_of_field:{
        type:Number,
        require: true,
    },
    field_types:{
        type:Array,
        require: true
    },
    widget_types:{
        type:Array,
        require: true
    }
})

module.exports = mongoose.model("Categories", CategorySchema);