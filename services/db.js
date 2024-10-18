const mongoose = require('mongoose');
mongoose.set('strictQuery',true)

mongoose.connect("mongodb+srv://admin:T75f96XWK28r31mJ@db-mongodb-theuniquesunnah-f351036e.mongo.ondigitalocean.com/theuniquesunnah?tls=true&authSource=admin&replicaSet=db-mongodb-theuniquesunnah",{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error',(err)=>{
    console.log('Failed to connect with db')
});

db.once('open',()=>{
    console.log('connected with db')
})