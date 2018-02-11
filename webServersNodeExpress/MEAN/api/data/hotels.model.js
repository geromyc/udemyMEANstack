var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
   name : {
       type : String,
       required : true,
   },
   rating : {
       type : Number,
       min : 0,
       max : 5,
       required : true
   },
   review : {
       type : String,
       required : true
   },
   createdOn : {
       type : Date,
       "default" : Date.now
   }
});

var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number
});

var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    // name is a path and string is a type
    stars : {
        type : Number,
        min : 0,
        max : 5,
        "default" : 0
        // can put default in quotes if errors occur
    },
    services : [String],
    description : String,
    photos : [String],
    currency : String,
    reviews : [reviewSchema],
    rooms : [roomSchema],
    location : {
        address: String,
        coordinates : {
            type : [Number],
            index : '2dsphere'
        }
        // Always store coordinates longitude (E/W), latitude (N/S)
    }
});

mongoose.model('Hotel', hotelSchema);