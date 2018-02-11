var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

// Commented out code is from native driver
// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res) {
    
    // var db = dbconn.get();
    // var collection = db.collection('hotels');
    
    var offset = 0;
    var count = 5;
    
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    
    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function(err, hotels) {
            console.log("Found hotels", hotels.length);
            res
                .json(hotels);
        });
    
    // collection
    //     .find()
    //     .skip(offset)
    //     .limit(count)
    //     .toArray(function(err, docs) {
    //         console.log("Found hotels", docs);
    //         res
    //             .status(200)
    //             .json(docs);
    //     });
    
    
//     console.log("db", db);
    
//     console.log("GET the hotels");
//     console.log(req.query);
    
//     var returnData = hotelData.slice(offset,offset+count);
    
//     res
//         .status(200)
//         .json( returnData );
};

module.exports.hotelsGetOne = function(req, res) {
    // var db = dbconn.get();
    // var collection = db.collection('hotels');
    
    var hotelId = req.params.hotelId;
    // var thisHotel = hotelData[hotelId];
    console.log("GET hotelId", hotelId);
    
    Hotel
        .findById(hotelId)
        .exec(function(err, doc) {
            res
                .status(200)
                .json( doc );
        });
};

module.exports.hotelsAddOne = function(req, res) {
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;
    
    console.log("POST new hotel");
    
    if (req.body && req.body.name && req.body.stars) {
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        console.log(req.body);
        collection.insertOne(newHotel, function(err,response) {
            console.log(response);
            console.log(response.ops);
            res
            .status(201)
            .json(response.ops);
        });
    } else {
        console.log("Data missing from body");
        res
            .status(400)
            .json({ message : "Required data missing from body" });
    }
};