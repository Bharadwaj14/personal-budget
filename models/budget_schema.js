const mongoose = require("mongoose")

function validateColor(color) { 
    if (color.length == 7) {
        if (color.indexOf('#') == 0) {
            return true;
        }
        else{
            return false;
        } 
    }
    else{
        return false;
    }
};

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        validate: [validateColor, 'Not a valid color. Color value should be in Hexadecimal'],
        required: true,
        unique: true
    }

}, { collection: 'my_budget'})

module.exports = mongoose.model('my_budget', budgetSchema)