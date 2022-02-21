

let mongoose = require('mongoose')

//connection string
   //connectionString = `mongodb+srv://${userName}:${pass}@cluster0.aoybz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// console.log('connecting ..')
mongoose.connect(process.env.CONNECTION_STRING)
 .then(()=>console.log('Mongo connected'))

