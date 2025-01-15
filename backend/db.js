const mongoose = require('mongoose');

const connection = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('connected to database')
    })
    .catch(err => {
        console.log('Error connecting to database', err);
    })
}

module.exports={
    connection
}