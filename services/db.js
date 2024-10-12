const mongoose = require('mongoose');
mongoose.set('strictQuery',true)

mongoose.connect("mongodb+srv://mwaseem:12345@cluster0.xosto.mongodb.net/Cloths?retryWrites=true&w=majority&appName=Cluster0",{
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