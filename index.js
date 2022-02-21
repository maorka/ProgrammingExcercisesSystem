require('dotenv').config({ path: '.env' })


let express = require('express'),
    app = express(),
    PORT = process.env.PORT

//app.use(express.static('build'))//after npm run build
app.use(express.json())
app.use(require('cors')())//cores package->uncomment that for requsts from other project client-approve to send to different domain

//app.use(express.urlencoded({ extended: true })) work with document's

require('./Router')(app)

app.listen(PORT, () => console.log(`Server is connected at port: ${PORT}`))   
