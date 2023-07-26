const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoconnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://saicharanars:724242726@cluster0.sexo9ar.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected");
      _db=client.db();
      callback(client);
    })
    .catch((err) => console.log(err));

};
const getdb=()=>{
    if(_db){
        return _db
    }else{
        throw 'no database'
    }
}
exports.mongoconnect=mongoconnect;
exports.getdb=getdb;