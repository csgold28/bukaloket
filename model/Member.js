const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 2,
        max : 255
    },
    email : {
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    nohp : {
        type : String,
        required : true,
        min : 3,
        max : 255
    },
    password : {
        type : String,
        required : true,
        max : 1024,
        min : 6
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    update_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('member', memberSchema);