'use strict';
const mongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://username:pwd@poc-cluster-aadv5.mongodb.net/test?retryWrites=true&w=majority';
let db;
 
// Use connect method to connect to the server
mongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
  console.log("Connected successfully to server"); 
  db = client.db('dev'); 
  //client.close();
});

let getProducts = (req, res) => {
    let type = req.swagger.params.type.value;
    // if (type != 30) {
    //     res.send(400, {'message':'Invalid input'});
    //     return;
    // }
    db.collection('Products').find({'_id': type}).toArray((err, data) => {
        if (err) {
            res.send(500, {'message':'I got you'});
        } else {
            console.log(data);
            data.forEach(element => {
                element.id = element._id;
                element._id = undefined;
            });
            
            
            res.send(data);
        }
    });
};


module.exports = {
    getProducts
};