const mongoose = require('mongoose');
mongoose.set('strictQuery',true)

mongoose.connect(process.env.MY_DB_URL,{
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