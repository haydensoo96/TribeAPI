let express = require("express")
let app = express()
var bp = require("body-parser")



app.use(bp.json())
app.use(bp.urlencoded({extended:true}))

let indexRoute = require('./routes/index.js')
app.use('/',indexRoute)



module.exports = app;