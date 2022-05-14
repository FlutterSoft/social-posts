const express = require('express')
const app = express() 
const MongoClient = require('mongodb').MongoClient 
const PORT = 5050
require('dotenv').config() 

let db
let dbConnectionStr = process.env.DB_STRING
dbName = 'socialposts'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database.`)
        db = client.db(dbName)
    })
    .catch(err =>{
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.get('/', async (request, response) => {
    const posts = await db.collection('socialposts').find().toArray()
    response.render('index.ejs', {postsList: posts})
})


app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running on port: '+PORT)
})